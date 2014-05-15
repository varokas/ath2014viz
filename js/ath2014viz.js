d3.csv("data/attendees.txt", function(error, data) {
  var extractedData = extractData(data);

  createCharts({
    "levelData" : countAndMapToLabel(extractedData,"level"),
    "beenToAgileConfData": countAndMapToLabel(extractedData,"beenToAgileConf")
  });
});

/// Helper ///
function countAndMapToLabel(extractedData, field) {
  var countBy = _.countBy(extractedData, function(data) {
    return data[field];
  });

  return mapToLabelAndValue(countBy);
}

/// Extracting Data ///

function extractData(originalData) {
  return originalData.map( scrubLine );
}

function scrubLine(line) {
  return {
    "level" : line["บอกเราหน่อยสิ คุณน่ะ อไจล์แค่ไหน ?"],
    "beenToAgileConf": extractBeenToAgileConf(line["ถามหน่อยน๊า  เคยไปงานสัมมนา เกี่ยวกับ agile มาก่อน อ๊ะป่าว ? "])
  };
}

function extractBeenToAgileConf(data) {
  if(data == "เคยไปมาแล้ว") return "เคย"; else return "ไม่เคย";
}

function mapToLabelAndValue(obj) {
  return _.map(obj, function(value, key){
    return { "label":key, "value":value };
  });
}

/// Creating Charts ///

function createCharts(options) {
  createPieChart(options.levelData, "agileLevelsChart");
  createPieChart(options.beenToAgileConfData, "beenToAgileConfChart");
}

function createPieChart(data, divId) {
  nv.addGraph(function() {
    var chart = nv.models.pieChart()
        .x(function(d) { return d.label })
        .y(function(d) { return d.value })
        .labelType("value")
        .showLabels(true);

      d3.select("#"+ divId +" svg")
          .datum(data)
          .transition().duration(1200)
          .call(chart);

    nv.utils.windowResize(chart.update);

    return chart;
  });
}
