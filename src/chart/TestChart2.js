import * as d3 from 'd3';
// import * as d3Cloud from "d3-cloud";
import cloud from 'd3-cloud';
import data from '../tmp_data/crunchbase_tmp.json';
import { D3Chart } from './D3Chart';

export default class TestChart extends D3Chart {
  constructor(element) {
    // set the dimensions and margins of the graph
    const margin = { top: 10, right: 10, bottom: 10, left: 10 },
      width = 450 - margin.left - margin.right,
      height = 450 - margin.top - margin.bottom;

    super(element, margin, width, height);

    let words = Object.keys(data)
      .map(key => {
        return { text: key, size: data[key] };
      })
      .sort((a, b) => b.size - a.size);

    let maxSize = d3.max(words, d => d.size);
    let minSize = d3.min(words, d => d.size);
    let fill = d3.scaleOrdinal(d3.schemeCategory10);
    let fontScale = d3
      .scaleLinear()
      .domain([minSize, maxSize])
      .range([10, 70]);

    // This function takes the output of 'layout' above and draw the words
    // Wordcloud features that are THE SAME from one word to the other can be here
    const draw = words => {
      this.svg
        .append('g')
        .attr(
          'transform',
          'translate(' + layout.size()[0] / 2 + ',' + layout.size()[1] / 2 + ')'
        )
        .selectAll('text')
        .data(words)
        .enter()
        .append('text')
        .style('font-size', function(d) {
          return d.size;
        })
        .style('fill', (d, i) => fill(i))
        .attr('text-anchor', 'middle')
        .style('font-family', 'Impact')
        .attr('transform', function(d) {
          return 'translate(' + [d.x, d.y] + ')rotate(' + d.rotate + ')';
        })
        .text(function(d) {
          return d.text;
        });
    };

    // Constructs a new cloud layout instance. It run an algorithm to find the position of words that suits your requirements
    // Wordcloud features that are different from one word to the other must be here
    var layout = cloud()
      .size([width, height])
      .words(words)
      .padding(5) //space between words
      .rotate(function() {
        return ~~(Math.random() * 2) * 90;
      })
      .fontSize(function(d) {
        return fontScale(d.size);
      }) // font size of words
      .on('end', draw);
    layout.start();
  }

  update() {}
}
