import * as d3 from 'd3';
import { D3Chart } from './D3Chart';

export default class PivotChart extends D3Chart {
  static margin = { top: 10, right: 30, bottom: 30, left: 60 };
  static width = 460 - PivotChart.margin.left - PivotChart.margin.right;
  static height = 450 - PivotChart.margin.top - PivotChart.margin.bottom;

  constructor(element: HTMLElement, classes: Record<string, string>) {
    // set the dimensions and margins of the graph
    super(
      element,
      classes,
      PivotChart.margin,
      PivotChart.width,
      PivotChart.height
    );

    //Read the data
    d3.csv(
      'https://raw.githubusercontent.com/holtzy/data_to_viz/master/Example_dataset/2_TwoNum.csv'
    ).then(data => {
      console.log(data);

      // Add X axis
      const x = d3
        .scaleLinear()
        .domain([0, 3000])
        .range([0, PivotChart.width]);
      this.svg
        .append('g')
        .attr('transform', 'translate(0,' + PivotChart.height + ')')
        .call(d3.axisBottom(x));

      // Add Y axis
      const y = d3
        .scaleLinear()
        .domain([0, 400000])
        .range([PivotChart.height, 0]);
      this.svg.append('g').call(d3.axisLeft(y));

      // Add a tooltip div. Here I define the general feature of the tooltip: stuff that do not depend on the data point.
      // Its opacity is set to 0: we don't see it by default.
      const tooltip = d3
        .select(element)
        .append('div')
        .style('opacity', 0)
        .attr('class', classes.tooltip)

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
      this.svg
        .append('g')
        .selectAll('dot')
        .data(
          data.filter(function(d, i) {
            return i < 50;
          })
        ) // the .filter part is just to keep a few dots on the chart, not all of them
        .enter()
        .append('circle')
        .attr('cx', function(d) {
          return x(parseInt(d['GrLivArea'] || ''));
        })
        .attr('cy', function(d) {
          return y(parseInt(d['SalePrice'] || ''));
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

  update() {}
}
