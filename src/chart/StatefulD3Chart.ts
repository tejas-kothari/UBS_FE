import * as d3 from 'd3';

export default abstract class StatefulD3Chart<StateType> {
  protected svg: d3.Selection<SVGGElement, any, null, undefined>;

  constructor(
    element: HTMLElement,
    protected setState: React.Dispatch<React.SetStateAction<StateType>>,
    protected forceUpdate: React.DispatchWithoutAction,
    margin: ChartMargins,
    width: number,
    height: number
  ) {
    // append the svg object to the body of the page
    this.svg = d3
      .select(element)
      .append('svg')
      .attr(
        'viewBox',
        `0 0 ${width + margin.left + margin.right} ${height +
          margin.top +
          margin.bottom}`
      )
      .append('g')
      .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');
  }

  abstract updateState(state: StateType): void;

  protected addTooltip<DatumType>(
    items: d3.Selection<any, DatumType, any, any>,
    tooltipContent: (d: DatumType) => string
  ) {
    // Add a tooltip div. Here I define the general feature of the tooltip: stuff that do not depend on the data point.
    // Its opacity is set to 0: we don't see it by default.
    const tooltip = d3.select('.tooltip').style('opacity', 0);

    // A function that change this tooltip when the user hover a point.
    // Its opacity is set to 1: we can now see it. Plus it set the text and position of tooltip depending on the datapoint (d)
    const mouseover = function(e: any, d: any) {
      tooltip.style('opacity', 1);
    };

    const mousemove = function(e: MouseEvent, d: DatumType) {
      tooltip
        // .html('The exact value of<br>the Ground Living area is: ' + d.)
        .html(tooltipContent(d))
        .style('left', e.x + 'px') // It is important to put the +90: other wise the tooltip is exactly where the point is an it creates a weird effect
        .style('top', e.y + 'px');
    };

    // A function that change this tooltip when the leaves a point: just need to set opacity to 0 again
    const mouseleave = function(d: any) {
      tooltip.style('opacity', 0);
    };

    items
      .on('mouseover', mouseover)
      .on('mousemove', mousemove)
      .on('mouseleave', mouseleave);
  }

  // Function to compact large integers
  protected compactValue = (value: d3.NumberValue): string =>
    new Intl.NumberFormat('en-US', {
      notation: 'compact'
    }).format(value as number);
}

export interface ChartMargins {
  top: number;
  right: number;
  bottom: number;
  left: number;
}
