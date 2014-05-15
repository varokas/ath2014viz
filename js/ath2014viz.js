d3.csv("data/attendees.txt", function(error, data) {
  var extractedData = extractData(data);

  var countByLevelData = _.countBy(extractedData, function(data) {
    return data["level"];
  });

  createCharts({
    "levelData" : mapToLabelAndValue(countByLevelData)
  });
});

/// Extracting Data ///

function extractData(originalData) {
  return originalData.map( scrubLine );
}

function scrubLine(line) {
  return {
    "level" : line["บอกเราหน่อยสิ คุณน่ะ อไจล์แค่ไหน ?"]
  };
}

function mapToLabelAndValue(obj) {
  return _.map(obj, function(value, key){
    return { "label":key, "value":value };
  });
}

/// Creating Charts ///

function createCharts(options) {
  createLevelChart(options.levelData);
}

function createLevelChart(data) {
  nv.addGraph(function() {
    var chart = nv.models.pieChart()
        .x(function(d) { return d.label })
        .y(function(d) { return d.value })
        .labelType("value")
        .showLabels(true);

      d3.select("#chart svg")
          .datum(data)
          .transition().duration(1200)
          .call(chart);

    nv.utils.windowResize(chart.update);

    return chart;
  });
}
