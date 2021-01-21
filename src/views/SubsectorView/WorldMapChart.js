import * as d3 from 'd3';
import * as topojson from 'topojson';
import StatefulD3Chart from '../../chart/new/StatefulD3Chart';

export default class WorldMapChart extends StatefulD3Chart {
  constructor(element, setState, forceUpdate) {
    const margin = { top: 10, right: 30, bottom: 30, left: 60 },
      width = 900 - margin.left - margin.right,
      height = 500 - margin.top - margin.bottom;

    super(element, setState, forceUpdate, margin, width, height);

    var projection = d3
      .geoMercator()
      .translate([width / 2.2, height / 2.2])
      .center([0, 0])
      .translate([256, 300])
      .scale(512 / (2 * Math.PI));

    // eslint-disable-next-line no-unused-vars
    var plane_path = d3.geoPath().projection(projection);

    var g = this.svg.append('g');
    var path = d3.geoPath().projection(projection);

    // load and display the World
    d3.json(
      'https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json'
    ).then(topology => {
      g.selectAll('path')
        .data(topojson.feature(topology, topology.objects.countries).features)
        .enter()
        .append('path')
        .attr('d', path);

      var visited_countries = [
        '752',
        '578',
        '703',
        '642',
        '100',
        '008',
        '807',
        '070',
        '040',
        '604',
        '068',
        '840',
        '276',
        '826',
        '-99',
        '499',
        '191',
        '170',
        '152',
        '036',
        '554'
      ];

      function colorCountry(country) {
        // console.log(country.properties.name);

        if (country.properties.name === 'Antarctica') {
          return 'none';
        }
        if (visited_countries.includes(country.id)) {
          // hack to discolor ehtiopia
          if (
            (country.id === '-99') &
            (country.geometry.coordinates[0][0][0] !== 20.590405904059054)
          ) {
            return '#e7d8ad';
          } else {
            return '#c8b98d';
          }
        } else {
          return '#e7d8ad';
        }
      }
      g.selectAll('path')
        .attr('fill', colorCountry)
        .on('click', (event, d) => {
          setState(state => {
            return {
              ...state,
              country: d.properties.name
            };
          });
        });

      this.addTooltip(g.selectAll('path'), (d) => d.properties.name);
    });
  }

  updateState(state) {}
}
