window.onload = function() {


  var consConf = "http://stats.oecd.org/SDMX-JSON/data/HH_DASH/FRA+DEU+KOR+NLD+PRT+GBR.COCONF.A/all?startTime=2007&endTime=2015"
  var womenInScience = "http://stats.oecd.org/SDMX-JSON/data/MSTI_PUB/TH_WRXRS.FRA+DEU+KOR+NLD+PRT+GBR/all?startTime=2007&endTime=2015"
  console.log("hello,world")
  // var requests = d3.json(consConf);
  // var requests2 = d3.json(womenInScience);
  //
  // var datapoints1 = []
  // Promise.resolve(requests).then(function(data) {
  //     //console.log(transformResponse(data));
  //     for (const [keys] of Object.entries(data)) {
  //       datapoint1 = data[keys]["datapoint"]
  //       datapoints1.push(datapoint1);
  //     };
  // }).catch(function(e){
  //     throw(e);
  // });
  // var datapoints2 = []
  // Promise.resolve(requests2).then(function(data) {
  //     console.log(transformResponse(data));
  //     for (const [keys] of Object.entries(data)) {
  //       console.log(keys)
  //       datapoint2 = data[keys]["datapoint"]
  //       datapoints2.push(datapoint2);
  //     };
  // }).catch(function(e){
  //     throw(e);
  // });
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

    // counter = 0
    // for (i = 0; i < 6; i++) {
    //   for (j = 0; i < 9; j++) {
    //   dataComplete[j][i] = dataset[counter]["datapoint"]
    //   counter++;
    //   }
    // }

    dataset1.forEach(function(d){
      dataComplete[d["time"]][d["Country"]].push(d["datapoint"])
    });

    dataset2.forEach(function(d){
      if (d["time"] === "2007") {
        counter += 1;
      }
      dataComplete[d["time"]][countries[counter]].push(d["datapoint"])
    })
    console.log(dataComplete)
  }).catch(function(e){
    throw(e);
  });

  console.log('Yes, you can!')

  var w = 800;
  var h = 610;
  //Create SVG element
  var svg = d3.select("body")
              .append("svg")
              .attr("width", w)
              .attr("height", h);

  //makeCircles(svg)

};


function makeCircles (d, svg){
  svg.selectAll("circle")
     .data(dataset)
     .enter()
     .append("circle")
     .attr("cx", function(d) {
          return d[0];
     })
     .attr("cy", function(d) {
          return d[1];
     })
     .attr("r", 5);

}

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
