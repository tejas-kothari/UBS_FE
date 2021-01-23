import * as d3 from 'd3';
import StatefulD3Chart from './new/StatefulD3Chart';

type DatumType = {
  key: string;
  value: number;
  color: string;
};

export default abstract class BarChart<StateType> extends StatefulD3Chart<
  StateType
> {
  static readonly MARGIN = { top: 30, right: 30, bottom: 70, left: 60 };
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

  setBars(data: DatumType[]) {
    // Configure the x-axis
    this.x.domain(data.map(d => d.key)); // can use this instead of 1000 to have the max of data: d3.max(data, function(d) { return +d.price })

    // Update the x-axis
    this.xAxis
      .transition()
      .duration(1000)
      .call(d3.axisBottom(this.x))
      .selectAll('text')
      .attr('transform', 'translate(-10,0)rotate(-45)')
      .style('text-anchor', 'end');

    // Configure the y-axis
    this.y.domain([0, d3.max(data, d => d.value) as number]);

    // Update the y-axis
    this.yAxis
      .transition()
      .duration(1000)
      .call(d3.axisLeft(this.y).tickFormat(this.compactValue));

    // JOIN
    const bars = this.svg
      .selectAll<any, DatumType>('rect')
      .data<DatumType>(data, d => d.key);

    // EXIT
    bars
      .exit()
      .transition()
      .duration(1000)
      .style('opacity', 0)
      .remove();

    // UPDATE
    bars
      .transition()
      .duration(1000)
      .attr('x', d => this.x(d.key) as number)
      .attr('y', d => this.y(d.value))
      .attr('width', this.x.bandwidth())
      .attr('height', d => BarChart.HEIGHT - this.y(d.value))
      .style('opacity', 0.7);

    // ENTER
    const newBars = bars
      .enter()
      .append('rect')
      .attr('x', d => this.x(d.key) as number)
      .attr('y', d => BarChart.HEIGHT)
      .attr('width', this.x.bandwidth())
      .attr('fill', d => d.color)
      .style('opacity', 0.7);

    newBars
      .transition()
      .duration(1000)
      .attr('height', d => BarChart.HEIGHT - this.y(d.value))
      .attr('y', d => this.y(d.value));

    this.addTooltip<DatumType>(newBars, d => d.value.toString());
  }

  abstract updateState(state: StateType): void;
}
