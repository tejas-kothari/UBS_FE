import * as d3 from 'd3';
//import { event, select, geoPath, geoMercator, min, max, scaleLinear } from 'd3';
//import geojson from 'geojson';
import * as topojson from 'topojson';
import { D3Chart } from '../../chart/D3Chart';
//import * as countries from '.'
//import { nodeModuleNameResolver } from 'typescript';
//import StatefulD3Chart from '../../chart/new/StatefulD3Chart';

//import { WorldMapState } from './WorldMapState'


export default class WorldMapChart extends D3Chart {
  constructor(element, classes) {
    const margin = { top: 10, right: 30, bottom: 30, left: 60 },
      width = 900 - margin.left - margin.right,
      height = 500 - margin.top - margin.bottom;

    super(element, classes, margin, width, height);

    var projection = d3.geoMercator()
      .translate([width / 2.2, height / 2.2])
      .center([0, 0])
      .translate([256, 300])
      .scale(512 / (2 * Math.PI));

    var plane_path = d3.geoPath()
      .projection(projection);

      

    var g = this.svg.append("g");
    var path = d3.geoPath()
      .projection(projection);

    // load and display the World
    
    d3.json("https://unpkg.com/world-atlas@1/world/110m.json").then(topology=> {
      
    g.selectAll("path")
        .data(topojson.feature(topology, topology.objects.countries)
          .features)
        .enter()
        .append("path")
        .attr("d", path)
        
    });

    /*this.svg.selectAll('.country')
      .data(CombinedGeoData.features)
      .join('path')
      .attr('class', 'country')
      .attr("fiil", feature => colorScale(feature.properties.gdp_md_est))
      .attr('d', feature =>pathGenerator(feature))
      .on('mouseover', feature =>{mouseOver(feature)})
      .on('mouseout', feature =>{mouseOut(feature)})
      .on('click', feature =>
      {setClickedCountry(clickedCountry===feature ? null :feature)})
  }, [clickedCountry, mouseOver, mouseOut])

    const projection = geoMercator()
      .fitSize([width, height], clickedCountry || CombinedGeoData)
      .precision(100)
    const pathGenerator = geoPath().projection(projection)*/

    
  }
  update() {}
}


