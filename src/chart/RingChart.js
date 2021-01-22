import * as d3 from 'd3';
import { D3Chart } from './D3Chart';
//import {object} from 'd3-collection'

export default class RingChart extends D3Chart {
  constructor(element, classes) {
    // set the dimensions and margins of the graph
    const margin = { top: 10, right: 20, bottom: 30, left: 50 },
      width = 800 - margin.left - margin.right,
      height = 400 - margin.top - margin.bottom;

    super(element, classes, margin, width, height);

    /*//Read the data
    d3.csv(
      '',
      function (data) {
        return {
          ...data
        };
      }
    ).then(data => {*/

    this.svg.attr("transform", "translate(" + width / 2 + "," + height / 2 + ")")


    // The radius of the pieplot is half the width or half the height (smallest one). I subtract a bit of margin.
    var radius = Math.min(width, height) / 2 - margin.left - margin.right;

    // Create dummy data
    const data = { 
      'debt financing total': 0.43,
      'series c total': 0.15,
      'funding rounds from all jobs': 0.13,
      'private equity total': 0.11,
      'org employee count': 0.106,
      'funding rounds from founded': 0.0877,
      'series a total':0.075,
    };

    // set the color scale
    var color = d3
      .scaleOrdinal()
      .domain(['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'])
      .range(d3.schemeDark2);

    // Compute the position of each group on the pie:
    var pie = d3
      .pie()
      .sort(null) // Do not sort group by size
      .value(function (d) {
        return d[1];
      });
    var data_ready = pie(Object.entries(data));



    // The arc generator
    var arc = d3
      .arc()
      .innerRadius(radius * 0.5) // This is the size of the donut hole
      .outerRadius(radius * 0.8);

    // Another arc that won't be drawn. Just for labels positioning
    var outerArc = d3
      .arc()
      .innerRadius(radius * 0.9)
      .outerRadius(radius * 0.9);
    console.log(radius);

    // Build the pie chart: Basically, each part of the pie is a path that we build using the arc function.
    this.svg
      .selectAll('allSlices')
      .data(data_ready)
      .enter()
      .append('path')
      .attr('d', arc)
      .attr('fill', function (d) {
        console.log(d);
        return color(d.data[0]);
      })
      .attr('stroke', 'white')
      .style('stroke-width', '2px')
      .style('opacity', 0.7);

    // Add the polylines between chart and labels:
    this.svg
      .selectAll('allPolylines')
      .data(data_ready)
      .enter()
      .append('polyline')
      .attr('stroke', 'black')
      .style('fill', 'none')
      .attr('stroke-width', 1)
      .attr('points', function (d) {
        var posA = arc.centroid(d); // line insertion in the slice
        var posB = outerArc.centroid(d); // line break: we use the other arc generator that has been built only for that
        var posC = outerArc.centroid(d); // Label position = almost the same as posB
        var midangle = d.startAngle + (d.endAngle - d.startAngle) / 2; // we need the angle to see if the X position will be at the extreme right or extreme left
        posC[0] = radius * 0.95 * (midangle < Math.PI ? 1 : -1); // multiply by 1 or -1 to put it on the right or on the left
        return [posA, posB, posC];
      });

    // Add the polylines between chart and labels:
    this.svg
      .selectAll('allLabels')
      .data(data_ready)
      .enter()
      .append('text')
      .text(function (d) {
        return d.data[0]+':'+d.data[1];
      })
      .attr('transform', function (d) {
        var pos = outerArc.centroid(d);
        var midangle = d.startAngle + (d.endAngle - d.startAngle) / 2;
        pos[0] = radius * 0.99 * (midangle < Math.PI ? 1 : -1);
        return 'translate(' + pos + ')';
      })
      .style('text-anchor', function (d) {
        var midangle = d.startAngle + (d.endAngle - d.startAngle) / 2;
        return midangle < Math.PI ? 'start' : 'end';
      });
  }

  update() { }
}
