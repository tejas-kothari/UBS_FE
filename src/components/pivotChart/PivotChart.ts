import * as d3 from 'd3';
import { DSVRowString } from 'd3';
import { D3Chart } from '../../chart/D3Chart';

type DatumType = DSVRowString<string>;
export default class PivotChart extends D3Chart {
  static readonly MARGIN = { top: 10, right: 30, bottom: 30, left: 60 };
  static readonly WIDTH = 460 - PivotChart.MARGIN.left - PivotChart.MARGIN.right;
  static readonly HEIGHT = 450 - PivotChart.MARGIN.top - PivotChart.MARGIN.bottom;

  idleTimeout: NodeJS.Timeout | null = null;
  x!: d3.ScaleLinear<number, number, never>;
  y!: d3.ScaleLinear<number, number, never>;
  brush!: d3.BrushBehavior<DatumType>;
  scatter!: d3.Selection<SVGGElement, any, null, undefined>;
  xAxis!: d3.Selection<SVGGElement, DatumType, null, undefined>;
  yAxis!: d3.Selection<SVGGElement, DatumType, null, undefined>;

  constructor(element: HTMLElement, classes: Record<string, string>) {
    // set the dimensions and margins of the graph
    super(
      element,
      classes,
      PivotChart.MARGIN,
      PivotChart.WIDTH,
      PivotChart.HEIGHT
    );

    //Read the data
    d3.csv(
      'https://raw.githubusercontent.com/holtzy/data_to_viz/master/Example_dataset/2_TwoNum.csv'
    ).then(data => {
      // Add X axis
      this.x = d3
        .scaleLinear()
        .domain([0, 3000])
        .range([0, PivotChart.WIDTH]);
      this.xAxis = this.svg
        .append('g')
        .attr('transform', 'translate(0,' + PivotChart.HEIGHT + ')')
        .call(d3.axisBottom(this.x).ticks(5));

      // Add Y axis
      this.y = d3
        .scaleLinear()
        .domain([0, 400000])
        .range([PivotChart.HEIGHT, 0]);
      this.yAxis = this.svg.append('g').call(d3.axisLeft(this.y));

      // Add a clipPath: everything out of this area won't be drawn.
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      this.svg
        .append('defs')
        .append('svg:clipPath')
        .attr('id', 'clip')
        .append('svg:rect')
        .attr('width', PivotChart.WIDTH)
        .attr('height', PivotChart.HEIGHT)
        .attr('x', 0)
        .attr('y', 0);

      // Add brushing
      this.brush = d3
        .brushX<DatumType>() // Add the brush feature using the d3.brush function
        .extent([
          [0, 0],
          [PivotChart.WIDTH, PivotChart.HEIGHT]
        ]) // initialise the brush area: start at 0,0 and finishes at width,height: it means I select the whole graph area
        .on('end', event => this.brushed(event)); // Each time the brush selection changes, trigger the 'updateChart' function

      // Create the scatter variable: where both the circles and the brush take place
      this.scatter = this.svg.append('g').attr('clip-path', 'url(#clip)');

      this.scatter
        .append('g')
        .attr('class', 'brush')
        .call(this.brush);
      // Add a tooltip div. Here I define the general feature of the tooltip: stuff that do not depend on the data point.
      // Its opacity is set to 0: we don't see it by default.
      const tooltip = d3
        .select(element)
        .append('div')
        .style('opacity', 0)
        .attr('class', classes.tooltip);

      // A function that change this tooltip when the user hover a point.
      // Its opacity is set to 1: we can now see it. Plus it set the text and position of tooltip depending on the datapoint (d)
      const mouseover = function(e: any, d: any) {
        tooltip.style('opacity', 1);
      };

      const mousemove = function(
        e: MouseEvent,
        d: { [x: string]: string | undefined }
      ) {
        tooltip
          .html(
            'The exact value of<br>the Ground Living area is: ' + d.GrLivArea
          )
          .style('left', e.x + 'px') // It is important to put the +90: other wise the tooltip is exactly where the point is an it creates a weird effect
          .style('top', e.y + 'px');
      };

      // A function that change this tooltip when the leaves a point: just need to set opacity to 0 again
      const mouseleave = function(d: any) {
        tooltip.style('opacity', 0);
      };

      // Add dots
      this.scatter
        .selectAll('dot')
        .data<DatumType>(
          data.filter(function(d, i) {
            return i < 50;
          })
        ) // the .filter part is just to keep a few dots on the chart, not all of them
        .enter()
        .append('circle')
        .attr('cx', d => {
          return this.x(parseInt(d['GrLivArea'] || ''));
        })
        .attr('cy', d => {
          return this.y(parseInt(d['SalePrice'] || ''));
        })
        .attr('r', 7)
        .style('fill', '#69b3a2')
        .style('opacity', 0.3)
        .style('stroke', 'white')
        .on('mouseover', mouseover)
        .on('mousemove', mousemove)
        .on('mouseleave', mouseleave);
    });
  }

  updateState(state: any): void {
    console.log(state);
    // throw new Error('Method not implemented.');
  }

  update(): void {
    throw new Error('Method not implemented.');
  }

  brushed(event: { selection: any }) {
    const extent = event.selection;

    // If no selection, back to initial coordinate. Otherwise, update X axis domain
    if (!extent) {
      if (!this.idleTimeout)
        return (this.idleTimeout = setTimeout(
          () => (this.idleTimeout = null),
          350
        )); // This allows to wait a little bit
      this.x.domain([0, 3000]);
    } else {
      this.x.domain([this.x.invert(extent[0]), this.x.invert(extent[1])]);
      this.scatter.select<SVGGElement>('.brush').call(this.brush.move, null); // This remove the grey brush area as soon as the selection has been done
    }

    // Update axis and circle position
    this.xAxis
      .transition()
      .duration(1000)
      .call(d3.axisBottom(this.x).ticks(5));
    this.scatter
      .selectAll<SVGCircleElement, DatumType>('circle')
      .transition()
      .duration(1000)
      .attr('cx', (d: DatumType) => {
        return this.x(parseInt(d['GrLivArea'] || ''));
      })
      .attr('cy', (d: DatumType) => {
        return this.y(parseInt(d['SalePrice'] || ''));
      });
  }
}
