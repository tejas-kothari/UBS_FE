import * as d3 from 'd3';
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
    this.svg
      .append('g')
      .attr('transform', 'translate(0,' + TimelineChart.HEIGHT + ')')
      .call(d3.axisBottom(this.x));

    this.timeline = this.svg.append('g');
  }

  abstract updateState(state: StateType): void;

  protected addItems(data: TimelineItem[]): void {
    // Add rectangles for items
    const newItems = this.timeline
      .selectAll('circle')
      .data(data)
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
}
