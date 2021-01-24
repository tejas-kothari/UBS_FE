//import * as d3 from 'd3';
import { D3Chart } from '../../chart/D3Chart';

export default class Legend extends D3Chart {
  constructor(element, classes) {
    // set the dimensions and margins of the graph
    const margin = { top: 10, right: 10, bottom: 10, left: 0 },
      width = 400 - margin.left - margin.right,
      height = 400 - margin.top - margin.bottom;

    super(element, classes, margin, width, height);
    //color
    this.svg.append("circle").attr("cx", 200).attr("cy", 130).attr("r", 6).style("fill", "#FFFFFF").style('stroke', '#000000')
    this.svg.append("circle").attr("cx", 200).attr("cy", 160).attr("r", 6).style("fill", "#eff3ff").style('stroke', '#000000')
    this.svg.append("circle").attr("cx", 200).attr("cy", 190).attr("r", 6).style("fill", "#C6DBEF").style('stroke', '#000000')
    this.svg.append("circle").attr("cx", 200).attr("cy", 220).attr("r", 6).style("fill", "#9ECAE1").style('stroke', '#000000')
    this.svg.append("circle").attr("cx", 200).attr("cy", 250).attr("r", 6).style("fill", "#6BAED6").style('stroke', '#000000')
    this.svg.append("circle").attr("cx", 200).attr("cy", 280).attr("r", 6).style("fill", "#3182bd").style('stroke', '#000000')
    this.svg.append("circle").attr("cx", 200).attr("cy", 310).attr("r", 6).style("fill", "#08519C").style('stroke', '#000000')
    //label
    this.svg.append("text").attr("x", 220).attr("y", 130).text("0-499999").style("font-size", "15px").attr("alignment-baseline", "middle")
    this.svg.append("text").attr("x", 220).attr("y", 160).text("500000-999999").style("font-size", "15px").attr("alignment-baseline", "middle")
    this.svg.append("text").attr("x", 220).attr("y", 190).text("1000000-4999999").style("font-size", "15px").attr("alignment-baseline", "middle")
    this.svg.append("text").attr("x", 220).attr("y", 220).text("5000000-9999999").style("font-size", "15px").attr("alignment-baseline", "middle")
    this.svg.append("text").attr("x", 220).attr("y", 250).text("10000000-14999999").style("font-size", "15px").attr("alignment-baseline", "middle")
    this.svg.append("text").attr("x", 220).attr("y", 280).text("15000000-19999999").style("font-size", "15px").attr("alignment-baseline", "middle")
    this.svg.append("text").attr("x", 220).attr("y", 310).text("≥20000000").style("font-size", "15px").attr("alignment-baseline", "middle")
  


  }

  update() { }
}

