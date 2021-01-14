import * as d3 from 'd3';
export abstract class D3Chart {
  svg: d3.Selection<SVGGElement, any, null, undefined>;

  constructor(
    element: HTMLElement,
    protected classes: Record<string, string>,
    margin: ChartMargins,
    width: number,
    height: number
  ) {
    // append the svg object to the body of the page
    this.svg = d3
      .select(element)
      .append('svg')
      // .attr('width', width + margin.left + margin.right)
      // .attr('height', height + margin.top + margin.bottom)
      .attr(
        'viewBox',
        `0 0 ${width + margin.left + margin.right} ${height +
          margin.top +
          margin.bottom}`
      )
      .append('g')
      .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');
  }

  abstract update(): void;
}

export interface ChartMargins {
  top: number;
  right: number;
  bottom: number;
  left: number;
}
