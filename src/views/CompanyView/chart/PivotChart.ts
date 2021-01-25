import * as d3 from 'd3';
import { D3BrushEvent } from 'd3';
import StatefulD3Chart from '../../../chart/new/StatefulD3Chart';
import CompanyFeatures from '../../../interfaces/company_features';
import { CompanyBenchmarkState } from '../CompanyBenchmark';

type DatumType = CompanyFeatures;
export default class PivotChart extends StatefulD3Chart<CompanyBenchmarkState> {
  static readonly MARGIN = { top: 10, right: 30, bottom: 30, left: 100 };
  static readonly WIDTH =
    450 - PivotChart.MARGIN.left - PivotChart.MARGIN.right;
  static readonly HEIGHT =
    450 - PivotChart.MARGIN.top - PivotChart.MARGIN.bottom;

  idleTimeout: NodeJS.Timeout | null = null;
  x!: d3.ScaleLinear<number, number, never>;
  y!: d3.ScaleLinear<number, number, never>;
  brush!: d3.BrushBehavior<DatumType>;
  scatter!: d3.Selection<SVGGElement, any, null, undefined>;
  xAxis!: d3.Selection<SVGGElement, DatumType, null, undefined>;
  yAxis!: d3.Selection<SVGGElement, DatumType, null, undefined>;

  constructor(
    element: HTMLElement,
    setState: React.Dispatch<React.SetStateAction<CompanyBenchmarkState>>,
    forceUpdate: React.DispatchWithoutAction
  ) {
    // set the dimensions and margins of the graph
    super(
      element,
      setState,
      forceUpdate,
      PivotChart.MARGIN,
      PivotChart.WIDTH,
      PivotChart.HEIGHT
    );

    // Add a clipPath: everything out of this area won't be drawn.
    this.svg
      .append('defs')
      .append('svg:clipPath')
      .attr('id', 'clip')
      .append('svg:rect')
      .attr('width', PivotChart.WIDTH)
      .attr('height', PivotChart.HEIGHT)
      .attr('x', 0)
      .attr('y', 0);

    // Add x-axis
    this.xAxis = this.svg
      .append('g')
      .attr('transform', 'translate(0,' + PivotChart.HEIGHT + ')');

    // Add y-axis
    this.yAxis = this.svg.append('g');

    // Init brushing
    this.brush = d3
      .brush<DatumType>()
      .extent([
        [0, 0],
        [PivotChart.WIDTH, PivotChart.HEIGHT]
      ]) // initialise the brush area: start at 0,0 and finishes at width,height: it means I select the whole graph area
      .on('end', event => this.brushed(event)); // Each time the brush selection changes, trigger the 'updateChart' function

    // Create the scatter variable: where both the circles and the brush take place
    this.scatter = this.svg.append('g').attr('clip-path', 'url(#clip)');

    // Add brushing
    this.scatter
      .append('g')
      .attr('class', 'brush')
      .call(this.brush);
  }

  updateState(state: CompanyBenchmarkState): void {
    let data = state.data;

    if (state.reset) {
      // TODO: Add back when category is added back
      // data = state.companyFeatures.filter(
      //   company =>
      //     state.category === '' ||
      //     company.category_groups_list.indexOf(state.category) !== -1
      // );
      data = state.companyFeatures;

      const maxX = d3.max(data, d => d[state.xAxis] as number);
      const maxY = d3.max(data, d => d[state.yAxis] as number);

      // Set X axis
      this.x = d3
        .scaleLinear()
        .domain([0, maxX! * 1.5])
        .range([0, PivotChart.WIDTH]);

      // Set Y axis
      this.y = d3
        .scaleLinear()
        .domain([0, maxY! * 1.5])
        .range([PivotChart.HEIGHT, 0]);

      this.setState({
        ...state,
        reset: false,
        data
      });

      return;
    }

    // If the data is still loading, stop rendering as it is not yet ready
    if (state.data.length === 0 || state.loadData) {
      return;
    }

    // Update X Axis
    this.xAxis
      .transition()
      .duration(1000)
      .call(d3.axisBottom(this.x).tickFormat(this.compactValue));

    // Update Y Axis
    this.yAxis
      .transition()
      .duration(1000)
      .call(d3.axisLeft(this.y).tickFormat(this.compactValue));

    // JOIN
    const dots = this.scatter
      .selectAll<SVGCircleElement, DatumType>('circle')
      .data<DatumType>(data, (company, i) => company.name);

    // EXIT
    dots
      .exit()
      .transition()
      .duration(1000)
      .style('opacity', 0)
      .remove();

    // UPDATE
    dots
      .transition()
      .duration(1000)
      .attr('cx', (d: DatumType) => this.x(d[state.xAxis] as number))
      .attr('cy', (d: DatumType) => this.y(d[state.yAxis] as number));

    // ENTER
    const newDots = dots
      .enter()
      .append('circle')
      .attr('cx', (d: DatumType) => this.x(d[state.xAxis] as number))
      .attr('cy', (d: DatumType) => this.y(d[state.yAxis] as number))
      .attr('r', 7)
      .style('fill', d =>
        d.name === state.company.name ? '#E60100' : '#69b3a2'
      )
      .style('opacity', 0)
      .style('stroke', 'white');

    newDots
      .transition()
      .duration(1000)
      .style('opacity', 0.3);

    this.addTooltip<DatumType>(newDots, company => company.name);
  }

  brushed(event: D3BrushEvent<DatumType>) {
    const extent = event.selection as [[number, number], [number, number]];

    // If no selection, back to initial coordinate. Otherwise, update X axis domain
    if (!extent) {
      if (!this.idleTimeout)
        return (this.idleTimeout = setTimeout(
          () => (this.idleTimeout = null),
          350
        )); // This allows to wait a little bit

      this.setState(state => {
        return {
          ...state,
          reset: true
        };
      });
    } else {
      this.x.domain([this.x.invert(extent[0][0]), this.x.invert(extent[1][0])]);
      this.y.domain([this.y.invert(extent[1][1]), this.y.invert(extent[0][1])]);
      this.scatter.select<SVGGElement>('.brush').call(this.brush.move, null); // This remove the grey brush area as soon as the selection has been done
      this.forceUpdate();
    }
  }
}
