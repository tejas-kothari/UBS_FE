import * as d3 from 'd3';
import { FeatureCollection, GeoJsonProperties } from 'geojson';
import * as topojson from 'topojson';
import { Objects, Topology } from 'topojson-specification';
import { SubsectorViewState } from '.';
import StatefulD3Chart from '../../chart/new/StatefulD3Chart';

export default class WorldMapChart extends StatefulD3Chart<SubsectorViewState> {
  g: d3.Selection<SVGGElement, any, null, undefined>;
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

    this.g = this.svg.append('g');
    var path = d3.geoPath().projection(projection);

    // load and display the World
    d3.json(
      'https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json'
    ).then(rawTopology => {
      const topology = rawTopology as Topology<Objects<GeoJsonProperties>>;
      this.g.selectAll('path')
        .data((topojson.feature(topology, topology.objects.countries) as FeatureCollection).features)
        .enter()
        .append('path')
        .attr('d', path)
        .style('stroke', function (country: any) {
          if (country.properties.name === 'Antarctica') {
            return 'none';
          }
          return '#000000';
        })
        .style("stroke-width", 0.1); //boundaries








      this.addTooltip<any>(this.g.selectAll('path'), d => d.properties.name);
    });
  }

  updateState(state: SubsectorViewState) {


    var colorScale = d3.scaleThreshold<number, string>()
      .domain([0, 100000, 1000000, 10000000, 30000000, 100000000, 500000000])
      .range(d3.schemeBlues[7]);

    this.g.selectAll('path')
      .attr("fill", (d:any) => {
        const selectedCountry = state.countriesFunding.find(
          funding => funding.country === d.properties.name
        );

        return colorScale(selectedCountry?.mean_funding as number);
      })
      .on('click', (event, d: any) => {
        this.setState(state => {
          return {
            ...state,
            country: d.properties.name
          };
        });
      });
  }
}
