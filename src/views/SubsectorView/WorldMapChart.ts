import * as d3 from 'd3';
import { FeatureCollection, GeoJsonProperties } from 'geojson';
import * as topojson from 'topojson';
import { Objects, Topology } from 'topojson-specification';
import { SubsectorViewState } from '.';
import StatefulD3Chart from '../../chart/new/StatefulD3Chart';

export default class WorldMapChart extends StatefulD3Chart<SubsectorViewState> {
  constructor(
    element: HTMLElement,
    setState: React.Dispatch<React.SetStateAction<SubsectorViewState>>,
    forceUpdate: React.DispatchWithoutAction
  ) {
    const margin = { top: 0, right: 0, bottom: 0, left: 0 },
      width = 600 - margin.left - margin.right,
      height = 350 - margin.top - margin.bottom;

    super(element, setState, forceUpdate, margin, width, height);

    var projection = d3
      .geoMercator()
      .translate([width / 2, height / 2 + 60])
      .scale(width / (2.5 * Math.PI));

    var g = this.svg.append('g');
    var path = d3.geoPath().projection(projection);

    // load and display the World
    d3.json(
      'https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json'
    ).then(rawTopology => {
      const topology = rawTopology as Topology<Objects<GeoJsonProperties>>;
      g.selectAll('path')
        .data((topojson.feature(topology, topology.objects.countries) as FeatureCollection).features)
        .enter()
        .append('path')
        .attr('d', path)
        .style('stroke', function(country: any) {
          if (country.properties.name === 'Antarctica') {
            return 'none';
          }
          return '#000000';
        }); //boundaries

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

      function colorCountry(country: any) {
        // console.log(country.properties.name);

        if (country.properties.name === 'Antarctica') {
          return 'none';
        }
        if (visited_countries.includes(country.id)) {
          // hack to discolor ehtiopia
          if (
            country.id === '-99' &&
            country.geometry.coordinates[0][0][0] !== 20.590405904059054
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
        .on('click', (event, d: any) => {
          setState(state => {
            return {
              ...state,
              country: d.properties.name
            };
          });
        });

      this.addTooltip<any>(g.selectAll('path'), d => d.properties.name);
    });
  }

  updateState(state: SubsectorViewState) {}
}
