import * as d3 from 'd3';
import { FeatureCollection, GeoJsonProperties } from 'geojson';
import * as topojson from 'topojson';
import { Objects, Topology } from 'topojson-specification';
import { SubsectorViewState } from '.';
import StatefulD3Chart from '../../chart/new/StatefulD3Chart';
import RawRegionLocation from './RegionLocation.json';

const regionLocation = RawRegionLocation as {
  [name: string]: {
    long: number;
    lat: number;
    name: string;
  };
};
export default class WorldMapChart extends StatefulD3Chart<SubsectorViewState> {
  g: d3.Selection<SVGGElement, any, null, undefined>;
  projection: d3.GeoProjection;
  marker: d3.Selection<SVGGElement, any, null, undefined>;
  constructor(
    element: HTMLElement,
    setState: React.Dispatch<React.SetStateAction<SubsectorViewState>>,
    forceUpdate: React.DispatchWithoutAction
  ) {
    const margin = { top: 0, right: 0, bottom: 0, left: 0 },
      width = 600 - margin.left - margin.right,
      height = 350 - margin.top - margin.bottom;

    super(element, setState, forceUpdate, margin, width, height);

    this.projection = d3
      .geoMercator()
      .translate([width / 2, height / 2 + 60])
      .scale(width / (2.5 * Math.PI));

    this.g = this.svg.append('g');
    this.marker = this.svg.append('g');

    const path = d3.geoPath().projection(this.projection);

    // load and display the World
    d3.json(
      'https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json'
    ).then(rawTopology => {
      const topology = rawTopology as Topology<Objects<GeoJsonProperties>>;
      this.g
        .selectAll('path')
        .data(
          (topojson.feature(
            topology,
            topology.objects.countries
          ) as FeatureCollection).features
        )
        .enter()
        .append('path')
        .attr('d', path)
        .style('stroke', (country: any) => {
          if (country.properties.name === 'Antarctica') {
            return 'none';
          }
          return '#000000';
        });

      this.addTooltip<any>(
        this.g.selectAll('path'),
        d => regionLocation[d.id]?.name
      );
    });
  }

  updateState(state: SubsectorViewState) {
    const colorScale = d3
      .scaleThreshold<number, string>()
      .domain([0, 500000, 1000000, 5000000, 10000000, 15000000, 20000000])
      .range(d3.schemeBlues[7]);

    this.g
      .selectAll('path')
      .attr('fill', (d: any) => {
        const selectedCountry = state.countriesFunding.find(
          funding => funding.country === regionLocation[d.id]?.name
        );

        if (selectedCountry === undefined) {
          return '#FFFFFF';
        } else {
          return colorScale(selectedCountry?.mean_funding as number);
        }
      })
      .style('stroke-width', function(country: any) {
        if (state.country === regionLocation[country.id]?.name) {
          d3.select(this).raise();
          return 0.7;
        }

        return 0.1;
      }) //boundaries
      .on('click', (event, d: any) => {
        let countryName = regionLocation[d.id]?.name;
        this.setState(state => {
          return {
            ...state,
            country: countryName
          };
        });
      });

    const countryList = [
      '344', // Hong Kong
      '036', // Australia
      '840', // United States
      '702', // Singapore
      '764', // Thailand
      // European countries
      '276',
      '372',
      '428',
      '826',
      '756'
    ];

    const markers = this.marker
      .selectAll<SVGCircleElement, any>('circle')
      .data<any>(countryList, d => d)
      .style('stroke-width', function(countryId) {
        if (state.country === regionLocation[countryId]?.name) {
          d3.select(this).raise();
          return 1;
        }

        return 0.5;
      })
      .enter()
      .append('circle')
      .attr('r', 4)
      .attr('fill', '#E60100')
      .style('stroke', '#000000')
      .attr('transform', d => {
        return (
          'translate(' +
          this.projection([regionLocation[d].long, regionLocation[d].lat]) +
          ')'
        );
      })
      .on('click', (event, d: any) => {
        let countryName = regionLocation[d]?.name;
        this.setState(state => {
          return {
            ...state,
            country: countryName
          };
        });
      });

    this.addTooltip(markers, d => regionLocation[d]?.name);
  }
}
