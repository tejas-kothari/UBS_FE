import * as d3 from 'd3';
import StatefulD3Chart from './new/StatefulD3Chart';

type DatumType = {
  key: string;
  value: number;
};

export default abstract class BarChart<StateType> extends StatefulD3Chart<
  StateType
> {

  static readonly MARGIN = { top: 10, right: 100, bottom: 30, left: 30 };
  static readonly WIDTH = 460 - BarChart.MARGIN.left - BarChart.MARGIN.right;
  static readonly HEIGHT = 400 - BarChart.MARGIN.top - BarChart.MARGIN.bottom;

  xAxis: d3.Selection<SVGGElement, any, null, undefined>;
  y: d3.ScaleLinear<number, number, never>;
  x: d3.ScaleBand<string>;
  yAxis: d3.Selection<SVGGElement, any, null, undefined>;

  constructor(
    element: HTMLElement,
    setState: React.Dispatch<React.SetStateAction<StateType>>,
    forceUpdate: React.DispatchWithoutAction
  ) {
    super(
      element,
      setState,
      forceUpdate,
      BarChart.MARGIN,
      BarChart.WIDTH,
      BarChart.HEIGHT
    );

    this.x = d3
      .scaleBand()
      .range([0, BarChart.WIDTH])
      .padding(0.2);

    this.xAxis = this.svg
      .append('g')
      .attr('transform', 'translate(0,' + BarChart.HEIGHT + ')');

    this.y = d3.scaleLinear().range([BarChart.HEIGHT, 0]);

    this.yAxis = this.svg.append('g');
  }

  addBars(data: DatumType[]) {
    // Configure the x-axis
    this.x.domain(data.map(d => d.key)); // can use this instead of 1000 to have the max of data: d3.max(data, function(d) { return +d.price })

    // Update the x-axis
    this.xAxis
      .call(d3.axisBottom(this.x))
      .selectAll('text')
      .attr('transform', 'translate(-10,0)rotate(-45)')
      .style('text-anchor', 'end');

    // Configure the y-axis
    this.y.domain([0, d3.max(data, d => d.value) as number]);

    // Update the y-axis
    this.yAxis.call(d3.axisLeft(this.y));

    // append the bar rectangles to the svg element
    // Bars
    this.svg
      .selectAll<any, DatumType>('bar')
      .data<DatumType>(data, (d: DatumType) => d.key)
      .enter()
      .append('rect')
      .attr('x', (d: DatumType) => this.x(d.key) as number)
      .attr('y', (d: DatumType) => this.y(d.value))
      .attr('width', this.x.bandwidth())
      .attr('height', d =>  BarChart.HEIGHT - this.y(d.value))
      .attr('fill', '#69b3a2');
  }

  abstract updateState(state: StateType): void;
}
