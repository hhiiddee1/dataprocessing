window.onload = function() {


  var consConf = "https://stats.oecd.org/SDMX-JSON/data/HH_DASH/FRA+DEU+KOR+NLD+PRT+GBR.COCONF.A/all?startTime=2007&endTime=2015"
  var womenInScience = "https://stats.oecd.org/SDMX-JSON/data/MSTI_PUB/TH_WRXRS.FRA+DEU+KOR+NLD+PRT+GBR/all?startTime=2007&endTime=2015"
  console.log("hello,world")

  var year2007 = {"France": [], "Netherlands": [], "Portugal": [], "Germany": [], "United Kingdom": [], "Korea": []}
  var year2008 = {"France": [], "Netherlands": [], "Portugal": [], "Germany": [], "United Kingdom": [], "Korea": []}
  var year2009 = {"France": [], "Netherlands": [], "Portugal": [], "Germany": [], "United Kingdom": [], "Korea": []}
  var year2010 = {"France": [], "Netherlands": [], "Portugal": [], "Germany": [], "United Kingdom": [], "Korea": []}
  var year2011 = {"France": [], "Netherlands": [], "Portugal": [], "Germany": [], "United Kingdom": [], "Korea": []}
  var year2012 = {"France": [], "Netherlands": [], "Portugal": [], "Germany": [], "United Kingdom": [], "Korea": []}
  var year2013 = {"France": [], "Netherlands": [], "Portugal": [], "Germany": [], "United Kingdom": [], "Korea": []}
  var year2014 = {"France": [], "Netherlands": [], "Portugal": [], "Germany": [], "United Kingdom": [], "Korea": []}
  var year2015 = {"France": [], "Netherlands": [], "Portugal": [], "Germany": [], "United Kingdom": [], "Korea": []}

  var countries = ["France", "Netherlands", "Portugal", "Germany", "United Kingdom", "Korea"]
  var counter = -1;

  var dataComplete = {"2007": year2007,"2008": year2008,"2009": year2009,"2010": year2010,"2011": year2011,"2012": year2012,"2013": year2013,"2014": year2014,"2015": year2015}

  var requests = [d3.json(womenInScience), d3.json(consConf)];

  Promise.all(requests).then(function(d) {

    var dataset1 = transformResponse(d[1]);
    var dataset2 = transformResponse(d[0]);


    dataset1.forEach(function(d){
      dataComplete[d["time"]][d["Country"]].push(d["datapoint"])
    });

    dataset2.forEach(function(d){
      if (d["time"] === "2007") {
        counter += 1;
      }
      dataComplete[d["time"]][countries[counter]].push(d["datapoint"])
    })

    console.log(Object.keys(dataComplete["2008"]))

    svg.selectAll("textlegend")
      .data(Object.keys(dataComplete["2008"]))
      .enter()
      .append("text")
      .text(function(d) {
        return d;
      })
      .attr("x", function(d) {
        return 580;
      })
      .attr("y", function(d, i) {
        return i * 20 + 63;
      })

      svg.append("text")
        .text("Costumer confidence vs. Women researchers percentage of different countries in different years")
        .attr("x", 110)
        .attr("y", 10)
        .attr("font-weight","bold");

      // makes text for X axis
      svg.append("text")
        .text("Women researchers as a percentage of total researchers:")
        .attr("x", 110)
        .attr("y", 250)
        .attr("font-weight","bold");

      // makes text for Y axis
      svg.append("text")
        .text("Consumer confidence:")
        .attr("transform", "rotate(-90)")
        .attr("x", -170)
        .attr("y", 50)
        .attr("font-weight","bold");

        str = Object.values(dataComplete['2015']);
      d3.selectAll(".m")
				.on("click", function() {
					var date = this.getAttribute("value");
          var str = "";
          d3.selectAll("#dot").remove()
					if(date == "2007"){
            var str = Object.values(dataComplete['2007']);
					}else if(date == "2008"){
            var str = Object.values(dataComplete['2008']);
					}else if(date == "2009"){
            var str = Object.values(dataComplete['2009']);
					}else if(date == "2010"){
            var str = Object.values(dataComplete['2010']);
          }else if(date == "2011"){
            var str = Object.values(dataComplete['2011']);
          }else if(date == "2012"){
            str = Object.values(dataComplete['2012']);
          }else if(date == "2013"){
            str = Object.values(dataComplete['2013']);
          }else if(date == "2014"){
            str = Object.values(dataComplete['2014']);
					}else{
						str = Object.values(dataComplete['2015']);
					}
          scatterplot(str);
        })
    //makeCircles(svg, dataComplete["2007"])

    var scaleY = d3.scaleLinear()
                    .domain([95, 105])
                    .range([200, 0]);

    var scaleX = d3.scaleLinear()
                    .domain([0,50])
                    .range([0, 400]);


    function scatterplot(str){

    svg = d3.selectAll("#svg")

    svg.selectAll("circle")
       .data(str)
       .enter()
       .append("circle")
       .attr("id", "dot")
       .attr("cx", function(d) {
          return scaleX(d[1]) + margin;
       })
       .attr("cy", function(d) {
          return scaleY(d[0]) + 10
       })
       .attr("r", function(d) {
         return Math.sqrt((d[1]*12) - w/ 8)
       })
       .style("fill", function(d, i){
         if (i === 0){
           return "red";
         }
         if (i === 1){
           return "blue";
         }
         if (i === 2){
           return "green";
         }
         if (i === 3){
           return "yellow";
         }
         if (i === 4){
           return "brown";
         }
         if (i === 5){
           return "purple";
         }
       });
     }

    svg.selectAll("rect")
        .data(Object.keys(dataComplete["2007"]))
        .enter()
        .append("rect")
        .attr("width", 20 )
        .attr("height", 20 - padding)
        .attr("x", function(d) {
          return 550;
        })
        .attr("y", function(d, i) {
          return i * 20 + 50;
        })
        .style("fill", function(d, i){
          if (i === 0){
            return "red";
          }
          if (i === 1){
            return "blue";
          }
          if (i === 2){
            return "green";
          }
          if (i === 3){
            return "yellow";
          }
          if (i === 4){
            return "brown";
          }
          if (i === 5){
            return "purple";
          }
        });

  }).catch(function(e){
    throw(e);
  });

  console.log('Yes, you can!')

  var w = 800;
  var h = 310;
  var margin = 100;
  var padding = 5;
  //Create SVG element
  var svg = d3.select("body")
              .append("svg")
              .attr("id", "svg")
              .attr("width", w)
              .attr("height", h);

  makeAxis(svg);

  function makeAxis(svg) {
    // makes scale for Y axis
    var scaleY = d3.scaleLinear()
                    .domain([95, 105])
                        .range([200, 0]);

    var scaleX = d3.scaleLinear()
                    .domain([0,50])
                    .range([0, 400]);
    //Create Y axis
    svg.append("g")
      .attr("class", "y axis")
      .attr("transform", "translate(100, 10 )")
      .call(d3.axisLeft(scaleY));

      svg.append("g")
        .attr("class", "y axis")
        .attr("transform", "translate(" + margin + ", 210 )")
        .call(d3.axisBottom(scaleX));

    };

};


//function makeCircles (d, svg, data){



function transformResponse(data){

    // access data property of the response
    let dataHere = data.dataSets[0].series;

    // access variables in the response and save length for later
    let series = data.structure.dimensions.series;
    let seriesLength = series.length;

    // set up array of variables and array of lengths
    let varArray = [];
    let lenArray = [];

    series.forEach(function(serie){
        varArray.push(serie);
        lenArray.push(serie.values.length);
    });

    // get the time periods in the dataset
    let observation = data.structure.dimensions.observation[0];

    // add time periods to the variables, but since it's not included in the
    // 0:0:0 format it's not included in the array of lengths
    varArray.push(observation);

    // create array with all possible combinations of the 0:0:0 format
    let strings = Object.keys(dataHere);

    // set up output array, an array of objects, each containing a single datapoint
    // and the descriptors for that datapoint
    let dataArray = [];

    // for each string that we created
    strings.forEach(function(string){
        // for each observation and its index
        observation.values.forEach(function(obs, index){
            let data = dataHere[string].observations[index];
            if (data != undefined){

                // set up temporary object
                let tempObj = {};

                let tempString = string.split(":").slice(0, -1);
                tempString.forEach(function(s, indexi){
                    tempObj[varArray[indexi].name] = varArray[indexi].values[s].name;
                });

                // every datapoint has a time and ofcourse a datapoint
                tempObj["time"] = obs.name;
                tempObj["datapoint"] = data[0];
                dataArray.push(tempObj);
            }
        });
    });

      // return the finished product!
      return dataArray;
  }
