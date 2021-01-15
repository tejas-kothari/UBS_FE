import * as d3 from 'd3';
import { D3Chart } from './D3Chart';
//import { time } from "d3-collection"
import timelineData from '../tmp_data/TimelineDataSample.json'

var data = {
  Date: ['2003-01-02', '2006-01-02', '2009-01-02']
};

export default class TimelineChart extends D3Chart {
  constructor(element, classes) {
    const margin = { top: 10, right: 30, bottom: 30, left: 10 },
      width = 460 - margin.left - margin.right,
      height = 50 - margin.top - margin.bottom;

    super(element, classes, margin, width, height);
    // Create the scale
    var x = d3
      .scaleTime()
      .domain([new Date('1999-12-31'), new Date('2020-02-01')]) // This is what is written on the Axis: from 0 to 100
      .range([0, width]); // This is where the axis is placed: from 100px to 800px
    this.svg
      .append('g')
      .attr('transform', 'translate(0,' + height + ')')
      .call(d3.axisBottom(x));

    // Add dots
    this.svg
      .append('g')
      .selectAll('dot')
      .data(data.Date)
      .enter()
      .append('circle')
      .attr('cx', function(d, i) {
        return x(new Date(d));
      })
      .attr('cy', height)
      .attr('r', 7)
      .style('fill', '#69b3a2');
  }

  update() {
    // let vis = this;
  }
}
