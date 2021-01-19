import * as d3 from 'd3';
import { D3BrushEvent } from 'd3';
import StatefulD3Chart from './new/StatefulD3Chart';

type TimelineItem = {
  name: string;
  date: Date;

  color: string;
};

export default abstract class TimelineChart<StateType> extends StatefulD3Chart<
  StateType
> {
  static readonly MARGIN = { top: 10, right: 30, bottom: 30, left: 10 };
  static readonly WIDTH =
    460 - TimelineChart.MARGIN.left - TimelineChart.MARGIN.right;
  static readonly HEIGHT =
    50 - TimelineChart.MARGIN.top - TimelineChart.MARGIN.bottom;

  x: d3.ScaleTime<number, number, never>;
  timeline: d3.Selection<SVGGElement, any, null, undefined>;

  idleTimeout: NodeJS.Timeout | null = null;
  brush: d3.BrushBehavior<TimelineItem>;
  xAxis: d3.Selection<SVGGElement, any, null, undefined>;
  brushElement: d3.Selection<SVGGElement, any, null, undefined>;

  constructor(
    element: HTMLElement,
    setState: React.Dispatch<React.SetStateAction<StateType>>,
    forceUpdate: React.DispatchWithoutAction
  ) {
    super(
      element,
      setState,
      forceUpdate,
      TimelineChart.MARGIN,
      TimelineChart.WIDTH,
      TimelineChart.HEIGHT
    );

    // Create the scale
    this.x = d3
      .scaleTime()
      .domain([new Date('1999-12-31'), new Date('2022-02-01')]) // This is what is written on the Axis: from 0 to 100
      .range([0, TimelineChart.WIDTH]); // This is where the axis is placed: from 100px to 800px

    // Add the time axis
    this.xAxis = this.svg
      .append('g')
      .attr('transform', 'translate(0,' + TimelineChart.HEIGHT + ')');

    // Add a clipPath: everything out of this area won't be drawn.
    this.svg
      .append('defs')
      .append('svg:clipPath')
      .attr('id', 'clipTimeline')
      .append('svg:rect')
      .attr('width', TimelineChart.WIDTH)
      .attr('height', TimelineChart.HEIGHT)
      .attr('x', 0)
      .attr('y', 0);

    // Create timeline
    this.timeline = this.svg
      .append('g')
      .attr('clip-path', 'url(#clipTimeline)');

    // Init brushing
    this.brush = d3
      .brushX<TimelineItem>()
      .extent([
        [0, 0],
        [TimelineChart.WIDTH, TimelineChart.HEIGHT]
      ]) // initialise the brush area: start at 0,0 and finishes at width,height: it means I select the whole graph area
      .on('end', event => this.brushed(event)); // Each time the brush selection changes, trigger the 'updateChart' function

    // Add brushing
    this.brushElement = this.svg.append('g').call(this.brush);
  }

  abstract updateState(state: StateType): void;

  protected addItems(data: TimelineItem[]): void {
    // Update x-axis
    this.xAxis.call(d3.axisBottom(this.x));

    // JOIN
    const items = this.timeline
      .selectAll<SVGRectElement, TimelineItem>('rect')
      .data<TimelineItem>(data, (item, i) => item.name);

    // EXIT
    items
      .exit()
      .transition()
      .duration(1000)
      .style('opacity', 0)
      .remove();

    // UPDATE
    items
      .transition()
      .duration(1000)
      .attr('x', d => this.x(d.date))
      .attr('y', TimelineChart.HEIGHT - 7);

    // ENTER
    const newItems = items
      .enter()
      .append('rect')
      .attr('x', d => this.x(d.date))
      .attr('y', TimelineChart.HEIGHT - 7)
      .attr('width', 4)
      .attr('height', 14)
      .style('fill', d => d.color);

    this.addTooltip<TimelineItem>(
      newItems,
      item => item.name + '<br>' + item.date.toDateString()
    );
  }

  brushed(event: D3BrushEvent<TimelineItem>) {
    const extent = event.selection as [number, number];

    // If no selection, back to initial coordinate. Otherwise, update X axis domain
    if (!extent) {
      if (!this.idleTimeout)
        return (this.idleTimeout = setTimeout(
          () => (this.idleTimeout = null),
          350
        )); // This allows to wait a little bit

      this.x.domain([new Date('1999-12-31'), new Date('2022-02-01')]);
    } else {
      this.x.domain([this.x.invert(extent[0]), this.x.invert(extent[1])]);
      this.brushElement.call(this.brush.move, null); // This remove the grey brush area as soon as the selection has been done
    }

    this.forceUpdate();
  }
}
