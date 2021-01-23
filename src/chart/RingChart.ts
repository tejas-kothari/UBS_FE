import * as d3 from 'd3';
import StatefulD3Chart from './new/StatefulD3Chart';

type DatumType = {
  key: string;
  value: number;
};

export default abstract class RingChart<StateType> extends StatefulD3Chart<
  StateType
> {
  static readonly MARGIN = { top: 0, right: 0, bottom: 0, left: 10 };
  static readonly WIDTH = 800 - RingChart.MARGIN.left - RingChart.MARGIN.right;
  static readonly HEIGHT = 400 - RingChart.MARGIN.top - RingChart.MARGIN.bottom;

  arc: d3.Arc<SVGPathElement, d3.PieArcDatum<DatumType>>;
  outerArc: d3.Arc<SVGPathElement, d3.PieArcDatum<DatumType>>;
  radius: number;

  constructor(
    element: HTMLElement,
    setState: React.Dispatch<React.SetStateAction<StateType>>,
    forceUpdate: React.DispatchWithoutAction
  ) {
    super(
      element,
      setState,
      forceUpdate,
      RingChart.MARGIN,
      RingChart.WIDTH,
      RingChart.HEIGHT
    );

    this.svg.attr(
      'transform',
      'translate(' + RingChart.WIDTH / 2 + ',' + RingChart.HEIGHT / 2 + ')'
    );

    // The radius of the pieplot is half the width or half the height (smallest one). I subtract a bit of margin.
    this.radius =
      Math.min(RingChart.WIDTH, RingChart.HEIGHT) / 2 -
      RingChart.MARGIN.left -
      RingChart.MARGIN.right;

    // The arc generator
    this.arc = d3
      .arc<SVGPathElement, d3.PieArcDatum<DatumType>>()
      .innerRadius(this.radius * 0.5) // This is the size of the donut hole
      .outerRadius(this.radius * 0.8);

    // Another arc that won't be drawn. Just for labels positioning
    this.outerArc = d3
      .arc<SVGPathElement, d3.PieArcDatum<DatumType>>()
      .innerRadius(this.radius * 0.9)
      .outerRadius(this.radius * 0.9);
  }

  setRing(data: DatumType[]) {
    // set the color scale
    const color = d3
      .scaleOrdinal()
      .domain(['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'])
      .range(d3.schemeDark2);

    // Compute the position of each group on the pie:
    const pie = d3
      .pie<DatumType>()
      .sort(null) // Do not sort group by size
      .value(d => d.value);
    const data_ready = pie(data);

    // Build the pie chart: Basically, each part of the pie is a path that we build using the arc function.

    // JOIN
    const arcs = this.svg
      .selectAll<SVGPathElement, d3.PieArcDatum<DatumType>>('path')
      .data<d3.PieArcDatum<DatumType>>(data_ready, d => d.data.key);

    // EXIT
    arcs
      .exit()
      .transition()
      .duration(1000)
      .style('opacity', 0)
      .remove();

    // UPDATE
    arcs
      .transition()
      .duration(1000)
      .attr('d', this.arc)
      .attr('fill', d => color(d.data.key) as string);

    // ENTER
    arcs
      .enter()
      .append('path')
      .attr('d', this.arc)
      .attr('fill', d => color(d.data.key) as string)
      .attr('stroke', 'white')
      .style('stroke-width', '2px')
      .style('opacity', 0.7);

    // Add the polylines between chart and labels:
    const polylines = this.svg
      .selectAll<SVGPolylineElement, d3.PieArcDatum<DatumType>>('polyline')
      .data<d3.PieArcDatum<DatumType>>(data_ready, d => d.data.key);

    polylines.exit().remove();
    polylines
      .enter()
      .append('polyline')
      .attr('stroke', 'black')
      .style('fill', 'none')
      .attr('stroke-width', 1)
      .attr('points', d => {
        var posA = this.arc.centroid(d); // line insertion in the slice
        var posB = this.outerArc.centroid(d); // line break: we use the other arc generator that has been built only for that
        var posC = this.outerArc.centroid(d); // Label position = almost the same as posB
        var midangle = d.startAngle + (d.endAngle - d.startAngle) / 2; // we need the angle to see if the X position will be at the extreme right or extreme left
        posC[0] = this.radius * 0.95 * (midangle < Math.PI ? 1 : -1); // multiply by 1 or -1 to put it on the right or on the left
        return [posA, posB, posC].map(pair => pair.join(',')).join(',');
      });

    // Add the polylines between chart and labels:
    const texts = this.svg
      .selectAll<SVGTextElement, d3.PieArcDatum<DatumType>>('text')
      .data<d3.PieArcDatum<DatumType>>(data_ready, d => d.data.key);

    texts.exit().remove();
    texts
      .enter()
      .append('text')
      .text(d => d.data.key + ': ' + d.data.value)
      .attr('transform', d => {
        var pos = this.outerArc.centroid(d);
        var midangle = d.startAngle + (d.endAngle - d.startAngle) / 2;
        pos[0] = this.radius * 0.99 * (midangle < Math.PI ? 1 : -1);
        return 'translate(' + pos + ')';
      })
      .style('text-anchor', d => {
        var midangle = d.startAngle + (d.endAngle - d.startAngle) / 2;
        return midangle < Math.PI ? 'start' : 'end';
      });
  }

  abstract updateState(state: StateType): void;
}
