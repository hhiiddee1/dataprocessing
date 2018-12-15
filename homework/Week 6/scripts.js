// Hidde van Oijen
// 12451096


// loads data in
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

      // makes variables and svg
      var w = 800;
      var h = 400;
      var marginSides = 100

      var svgLineChart = d3v5.select("body")
                          .append("svg")
                          .attr("id", "svgLineChart")
                          .attr("width", w)
                          .attr("height", h);

      makeAxis(svgLineChart)

      makeMap(svgLineChart, datacsv)

      makeText(svgLineChart)

});

function makeAxis(svg) {

  // makes scale for Y axis
  var scaleY = d3v5.scaleLinear()
                  .domain([0, 100])
                      .range([200, 0]);

  // makes scale for X axis
  var scaleX = d3v5.scaleLinear()
                  .domain([0,11])
                  .range([0, 400]);
  // create Y axis
  svg.append("g")
    .attr("class", "y axis")
    .attr("transform", "translate(100,100 )")
    .call(d3v5.axisLeft(scaleY));

  // makes list of all the years
  years = []
  year = 2003
  for (i = 0; i < 12; i++) {
    year += 1
    years.push(year.toString());
  };

  // makes text for X axis
  svg.selectAll("textXAxis")
    .data(years)
    .enter()
    .append("text")
    .text(function(d) {
      return d;
    })
    .attr("transform","rotate(90)")
    .attr("x", function(d) {
      return 310;
    })
    .attr("y", function(d,i) {
      return  -scaleX(i) - 95;
    });

    // makes  X axis
    svg.selectAll("rectXaxis")
    .data(years)
    .enter()
    .append("rect")
    .attr("width", 400 )
    .attr("height", 1)
    .attr("x", function(d) {
      return 100;
    })
    .attr("y", function(d) {
      return 300;
    });

    // makes X axis
    svg.selectAll("rectXaxis")
    .data(years)
    .enter()
    .append("rect")
    .attr("width", 1 )
    .attr("height", 5)
    .attr("x", function(d, i) {
      return scaleX(i) + 100;
    })
    .attr("y", function(d) {
      return 300;
    });

}

function makeText(svg) {

  // makes graph title
  svg.append("text")
  .text("% Renewable energy of total energie per country over different years")
  .attr("x", 20)
  .attr("y", 80)
  .attr("id", "title")
  .attr("font-weight","bold")
  .attr("font-size", "19px");

  // makes text for X axis
  svg.append("text")
    .text("Year")
    .attr("x", 110)
    .attr("y", 370)
    .attr("font-weight","bold");

  // makes text for Y axis
  svg.append("text")
    .text("% renewable energie")
    .attr("transform", "rotate(-90)")
    .attr("x", -280)
    .attr("y", 50)
    .attr("font-weight","bold");


}

function makeMap(svg, datacsv) {

    // makes data map
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

  // makes colors for countries
  fills: {
    'superlight': '#7bc86c',
    'light': '#61bd4f',
    'dark': '#519839',
    'superdark': '#3f6f21',
    defaultFill: 'lightgrey'
  },

  // loads data
  data: datacsv,

  // makes click function
  done: function(datamap) {
       datamap.svg.selectAll('.datamaps-subunit').on('click', function(geography) {
           var country_id = geography.id;
           var country_name = geography.properties.name;
           d3.selectAll("#line").remove()
           d3.selectAll("#dot").remove()
           d3.selectAll("#title").remove()
           makeLineChart(svg, datacsv, country_id, country_name)
       })
     }
});
};

function makeLineChart(svg, data, id, name){

  // select data and puts it in a list
  data2 = data[id]
  percentages = []
  for (const [keys] of Object.entries(data2)) {
    if (Number.isInteger(data2[keys])){
      percentage = data2[keys];
      percentages.push(percentage);
    };
  };

  // makes Y scale
  var scaleY = d3v5.scaleLinear()
                  .domain([0, 100])
                      .range([300, 100]);

  // makes X scale
  var scaleX = d3v5.scaleLinear()
                  .domain([0,11])
                  .range([0, 400]);

  // defines line x and y variables
  var line = d3v5.line()
      .x(function(d, i) { return scaleX(i); })
      .y(function(d, i) { return scaleY(d); });

  // makes line
  svg.append("path")
      // .data(percentages)
      .attr("class", "line")
      .attr("d", line(percentages))
      .attr("fill", "white")
      .attr("id", "line")
      .style("stroke", "#00FFFF")
      .style("stroke-width", 3)
      .attr("transform", "translate(100,0 )");

  // makes tooltip for hovering over
  var tooltip = d3v5.select("body").append("div")
    .style("position","absolute")
    .style("background","white")
    .style("padding","5 10px")
    .style("border","2px #00FFFF solid")
    .style("border-radius","5px")
    .style("opacity","0");


  // makes circels for line
  svg.selectAll("circle")
     .data(percentages)
     .enter()
     .append("circle")
     .attr("id", "dot")
     .style("fill", "#00FFFF")
     .attr("cx", function(d,i) {
        return scaleX(i);
     })
     .attr("cy", function(d) {
        return scaleY(d);
     })
     .attr("r", function(d) {
       return 5
     })
     .attr("transform", "translate(100,0 )")
     // makes text appear when hovering over
      .on("mouseover", function(d,i){
        tooltip.transition()
          .style("opacity", 1)

        tooltip.html(d,i)
          .style("left", (scaleX(i)+ marginSides)+"px")
          .style("top",(750 + scaleY(d))+"px")

          d3.select(this).style("opacity", 1)
      })
      // makes text go away when hovering over
      .on("mouseout", function(d){
        tooltip.transition()
            .style("opacity", 0)
        d3.select(this).style("opacity", 1)
      });

  // makes new line chart title
  svg.append("text")
    .text("% Renewable energy of total energie in " + name + " over different years")
    .attr("x", 20)
    .attr("y", 80)
    .attr("id", "title")
    .attr("font-weight","bold")
    .attr("font-size", "19px");
};
