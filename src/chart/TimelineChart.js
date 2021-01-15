import * as d3 from 'd3';
import { D3Chart } from './D3Chart';
//import { time } from "d3-collection"
//import timelineData from '../tmp_data/TimelineDataSample.json'

var data = {
  Milestone1: ['2003-01-02', '2006-01-02', '2009-01-02'],
  Milestone2: ['2004-01-02', '2007-01-02', '2010-01-02'],
  Milestone3: ['2005-01-02', '2008-01-02', '2011-01-02']
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

    // Add circles for milestone1
    this.svg
      .append('g')
      .selectAll('circle')
      .data(data.Milestone1)
      .enter()
      .append('rect')
        .attr('x', function(d, i) {
          return x(new Date(d));
        })
        .attr('y', height-7)
        .attr('width', 4)
        .attr('height', 14)
        .style('fill', '#FA1607');
    
    // Add squares for milestone2
    this.svg
      .append('g')
      .selectAll('square')
      .data(data.Milestone2)
      .enter()
      .append('rect')
        .attr('x', function(d, i) {
          return x(new Date(d));
        })
        .attr('y', height-7)
        .attr('width', 4)
        .attr('height', 14)
        .style('fill', '#0807FA');

    // Add squares for milestone3
    this.svg
      .append('g')
      .selectAll('square')
      .data(data.Milestone3)
      .enter()
      .append('rect')
        .attr('x', function(d, i) {
          return x(new Date(d));
        })
        .attr('y', height-7)
        .attr('width', 4)
        .attr('height', 14)
        .style('fill', '#11F905');
  }

  update() {
    // let vis = this;
  }
}
