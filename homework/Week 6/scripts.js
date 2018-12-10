// Hidde van Oijen
// 12451096

var year2015 = []
var countries = []
d3v5.json("data.json").then(function(datacsv) {
      var countries = Object.keys(datacsv)
      for (const [keys] of Object.entries(datacsv)) {
        country = datacsv[keys];
        countries.push(country);
        percentage = datacsv[keys]["2015"];
        year2015.push(percentage);
      }
      console.log(countries);
      console.log(year2015);
      console.log(datacsv)
      makeSvgs()

      makeMap(datacsv)
});


function makeSvgs() {
var w = 600;
var h = 400;

var svgWorldMap = d3.select("body")
            .append("svg")
            .attr("id", "svgWorldMap")
            .attr("width", w)
            .attr("height", h);

var svgWorldMap = d3.select("body")
                    .append("svg")
                    .attr("id", "svgLineChart")
                    .attr("width", w)
                    .attr("height", h);
}

// function makeAxis(svg) {
//
// }
function makeMap(datacsv) {
    var map = new Datamap({
        element: document.getElementById('container'),
        setProjection: function(element) {
          var projection = d3.geo.equirectangular()
            .center([0, 50])
            .rotate([0, 0])
            .scale(600)
            .translate([element.offsetWidth / 2, element.offsetHeight / 2]);
          var path = d3.geo.path()
            .projection(projection);

            return {path: path, projection: projection};
          },
          geographyConfig: {
  highlightBorderColor: '#bada55',
  popupTemplate: function(geography, data) {
    console.log(datacsv)
     return '<div class="hoverinfo">' + geography.properties.name + '% renewable energy: ' +  data.year2015 + ' '
   },
   highlightBorderWidth: 3
 },
data: datacsv
});
}
