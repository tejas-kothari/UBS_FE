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
        console.log(country.properties.name);

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
      g.selectAll('path').attr('fill', colorCountry);
    });

    /*var visited_countries = ["752", "578", "703", "642", "100",
      "008", "807", "070", "040", "604",
      "068", "840", "276", "826", "-99",
      "499", "191", "170", "152", "036",
      "554"];

    function colorCountry(country) {
      console.log(country)
      if (visited_countries.includes(country.id)) {
        // hack to discolor ehtiopia
        if (country.id == '-99' & country.geometry.coordinates[0][0][0] != 20.590405904059054) {
          return '#e7d8ad'
        } else {
          return '#c8b98d';
        };
      } else {
        return '#e7d8ad';
      }
    };
    g.selectAll('path')
      .attr('fill', colorCountry)*/

    /*var trip_data = d3.json("trip_data.csv", function(error, t_data){
      return t_data
    });
    
    g.selectAll("circle")
     .data(trip_data)
     .enter()
     .append("circle")
     .attr("cx", function(d) {
            return projection([d.lon, d.lat])[0];
      })
     .attr("cy", function(d) {
            return projection([d.lon, d.lat])[1];
      })
     .attr("r", width / 300)
     .on("mousemove", showTooltip)
     .on("mouseout", hideTooltip)
     
     
     };
    
    function hideTooltip(d) {
      // Show the tooltip (unhide it) and set the name of the data entry.
      tooltip
      .classed('hidden', true);
    }
    
    function showTooltip(d){
      var mouse = d3.mouse(svg.node()).map(function(d) {
                            return parseInt(d);
                        });
      tooltip
      .classed('hidden', false)
      .html(d.name)
      .attr('style', 
            'left:' + (mouse[0] + 15) + 'px; top:' + (mouse[1] - 35) + 'px')
    };
    
    svg.call(zoom);*/
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
