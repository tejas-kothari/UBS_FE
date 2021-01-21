import * as d3 from 'd3';
import { D3BrushEvent } from 'd3';
import StatefulD3Chart from '../../../chart/new/StatefulD3Chart';
import CompanyFunding from '../../../interfaces/company_funding';
import { ComapnyFundingTimelineState } from '../CompanyFundingTimeline';

export default class FundingChart extends StatefulD3Chart<
  ComapnyFundingTimelineState
> {
  static readonly MARGIN = { top: 30, right: 30, bottom: 30, left: 100 };
  static readonly WIDTH =
    450 - FundingChart.MARGIN.left - FundingChart.MARGIN.right;
  static readonly HEIGHT =
    450 - FundingChart.MARGIN.top - FundingChart.MARGIN.bottom;

  x: d3.ScaleTime<number, number, never>;
  xAxis: d3.Selection<SVGGElement, any, null, undefined>;
  y: d3.ScaleLinear<number, number, never>;
  yAxis: d3.Selection<SVGGElement, any, null, undefined>;
  timeline: d3.Selection<SVGGElement, any, null, undefined>;

  idleTimeout: NodeJS.Timeout | null = null;
  brush: d3.BrushBehavior<CompanyFunding>;
  brushElement: d3.Selection<SVGGElement, any, null, undefined>;
  line: d3.Selection<SVGPathElement, any, null, undefined>;

  constructor(
    element: HTMLElement,
    setState: React.Dispatch<React.SetStateAction<ComapnyFundingTimelineState>>,
    forceUpdate: React.DispatchWithoutAction
  ) {
    super(
      element,
      setState,
      forceUpdate,
      FundingChart.MARGIN,
      FundingChart.WIDTH,
      FundingChart.HEIGHT
    );

    // Create the time scale
    this.x = d3
      .scaleTime()
      .domain([new Date('1999-12-31'), new Date('2022-02-01')]) // This is what is written on the Axis: from 0 to 100
      .range([0, FundingChart.WIDTH]); // This is where the axis is placed: from 100px to 800px

    // Create the y-axis
    this.y = d3
      .scaleLinear()
      .domain([0, 0])
      .range([FundingChart.HEIGHT, 0]);

    // Add the time axis
    this.xAxis = this.svg
      .append('g')
      .attr('transform', 'translate(0,' + FundingChart.HEIGHT + ')');

    // Add the y-axis
    this.yAxis = this.svg.append('g');

    // Add a clipPath: everything out of this area won't be drawn.
    this.svg
      .append('defs')
      .append('svg:clipPath')
      .attr('id', 'clipFunding')
      .append('svg:rect')
      .attr('width', FundingChart.WIDTH)
      .attr('height', FundingChart.HEIGHT)
      .attr('x', 0)
      .attr('y', 0);

    // Create timeline
    this.timeline = this.svg.append('g').attr('clip-path', 'url(#clipFunding)');

    // Init brushing
    this.brush = d3
      .brushX<CompanyFunding>()
      .extent([
        [0, 0],
        [FundingChart.WIDTH, FundingChart.HEIGHT]
      ]) // initialise the brush area: start at 0,0 and finishes at width,height: it means I select the whole graph area
      .on('end', event => this.brushed(event)); // Each time the brush selection changes, trigger the 'updateChart' function

    // Add brushing
    this.brushElement = this.timeline.append('g').call(this.brush);

    // Add line
    this.line = this.timeline.append('path');
  }

  updateState(state: ComapnyFundingTimelineState): void {
    const funding = ([
      {
        announced_on: state.company.founded_on,
        investment_type: 'founded',
        raised_amount_usd: 0
      },
      ...state.companyFunding
    ] as CompanyFunding[]).sort(
      (a, b) =>
        new Date(a.announced_on).getTime() - new Date(b.announced_on).getTime()
    );

    this.y.domain([
      0,
      d3.max(funding.map(funding => funding.raised_amount_usd)) as number
    ]);

    // Update x-axis
    this.xAxis
      .transition()
      .duration(1000)
      .call(d3.axisBottom(this.x).ticks(10));

    this.yAxis
      .transition()
      .duration(1000)
      .call(
        d3
          .axisLeft(this.y)
          .ticks(10)
          .tickFormat(this.compactValue)
      );

    this.line
      .datum(funding)
      .transition()
      .duration(1000)
      .attr('fill', 'none')
      .attr('stroke', '#69b3a2')
      .attr('stroke-width', 1.5)
      .attr(
        'd',
        d3
          .line<CompanyFunding>()
          .x(d => this.x(new Date(d.announced_on)))
          .y(d => this.y(d.raised_amount_usd))
      );

    // JOIN
    const items = this.timeline
      .selectAll<SVGRectElement, CompanyFunding>('.item')
      .data<CompanyFunding>(funding, (item, i) => i);

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
      .attr('cx', d => this.x(new Date(d.announced_on)))
      .attr('cy', d => this.y(d.raised_amount_usd));

    // ENTER
    const newItems = items
      .enter()
      .append('circle')
      .attr('class', 'item')
      .attr('cx', d => this.x(new Date(d.announced_on)))
      .attr('cy', d => this.y(d.raised_amount_usd))
      .attr('r', 4)
      .style('fill', '#FF00000');

    this.addTooltip<CompanyFunding>(
      newItems,
      item => item.investment_type + '<br>' + item.announced_on
    );
  }

  brushed(event: D3BrushEvent<CompanyFunding>) {
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
