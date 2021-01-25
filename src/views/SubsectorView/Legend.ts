import * as d3 from 'd3';
import { D3Chart } from '../../chart/D3Chart';

export default class Legend extends D3Chart {
  constructor(element: HTMLElement, classes: Record<string, string>) {
    // set the dimensions and margins of the graph
    const margin = { top: 30, right: 10, bottom: 10, left: 0 },
      width = 500 - margin.left - margin.right,
      height = 60 - margin.top - margin.bottom;

    const color = d3
      .scaleThreshold<number, string>()
      .domain([0, 500000, 1000000, 5000000, 10000000, 15000000, 20000000])
      .range(d3.schemeBlues[7]);
    super(element, classes, margin, width, height);
    const length = color.range().length;

    const x = d3
      .scaleLinear()
      .domain([1, length - 1])
      .rangeRound([width / length, (width * (length - 1)) / length]);

    const g = this.svg.append('g');
    g.selectAll('rect')
      .data(color.range())
      .join('rect')
      .attr('height', 8)
      .attr('x', (d, i) => x(i))
      .attr('width', (d, i) => x(i + 1) - x(i))
      .attr('fill', d => d);

    g.append('text')
      .attr('y', -6)
      .attr('fill', 'currentColor')
      .attr('text-anchor', 'start')
      .attr('font-weight', 'bold')
      .text('Mean funding');

    g.call(
      d3
        .axisBottom(x)
        .tickSize(13)
        .tickFormat(i => color.domain()[i as number - 1].toString())
        .tickValues(d3.range(1, length))
    )
      .select('.domain')
      .remove();
  }

  update() {}
}
