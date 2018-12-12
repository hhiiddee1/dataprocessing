// Hidde van Oijen
// 12451096

var year2015 = []
var countries = []
d3v5.json("data.json").then(function(datacsv) {
      var countries = Object.keys(datacsv)
      for (const [keys] of Object.entries(datacsv)) {
        country = datacsv[keys];
        countries.push(country);
        percentage = datacsv[keys]["year2015"];
        year2015.push(percentage);
      }
      console.log(countries);
      console.log(year2015);
      console.log(datacsv)

      var w = 800;
      var h = 400;

      var svgLineChart = d3v5.select("body")
                          .append("svg")
                          .attr("id", "svgLineChart")
                          .attr("width", w)
                          .attr("height", h);

      makeAxis(svgLineChart)

      makeMap(datacsv)

      makeText(svgLineChart)

      makeLineChart(svgLineChart, datacsv)
});

function makeAxis(svg) {
  // makes scale for Y axis
  var scaleY = d3v5.scaleLinear()
                  .domain([0, 100])
                      .range([200, 0]);

  var scaleX = d3v5.scaleLinear()
                  .domain([0,50])
                  .range([0, 400]);
  //Create Y axis
  svg.append("g")
    .attr("class", "y axis")
    .attr("transform", "translate(100,100 )")
    .call(d3v5.axisLeft(scaleY));

  svg.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(100, 300 )")
    .call(d3v5.axisBottom(scaleX));

}

function makeText(svg) {
  svg.append("text")
  .text("% Renewable energy of total energie per country over different years")
  .attr("x", 20)
  .attr("y", 80)
  .attr("id", "title")
  .attr("font-weight","bold")
  .attr("font-size", "19px");

  // makes text for Y axis
  svg.append("text")
    .text("Year")
    .attr("x", 110)
    .attr("y", 350)
    .attr("font-weight","bold");

  // makes text for X axis
  svg.append("text")
    .text("% renewable energie")
    .attr("transform", "rotate(-90)")
    .attr("x", -280)
    .attr("y", 50)
    .attr("font-weight","bold");
  }

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
     return '<div class="hoverinfo">' + geography.properties.name + ': % renewable energy: ' +  data.year2015 + ' '
   },
   highlightBorderWidth: 3
 },
data: datacsv,

done: function(datamap) {
       datamap.svg.selectAll('.datamaps-subunit').on('click', function(geography) {
           var state_id = geography.id;
           console.log(state_id)
       })
     }
});
}

function makeLineChart(svg, data){

  var line = d3.line()
      .x(function(d, i) { return xScale(i); })
      .y(function(d) { return yScale(d); })

  svg.append("path")
      .datum(data["AUT"])
      .attr("class", "line")
      .attr("d", line);
}
