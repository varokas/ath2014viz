_.flatMap = _.compose(_.flatten, _.map)

d3.csv("data/attendees.txt", function(error, data) {
  var extractedData = extractData(data);

  var pastAgileConfCount = countData(_.flatten(
    extractedData
      .map(function(e) { return e["pastAgileConf"]; })
      .filter(function(e) { return e != "-"; })
  ));
  var rolesCount = countData(_.flatten(
    extractedData
      .map(function(e) { return e["roles"]; })
  ));
  // console.log(_.flatten(
  //   extractedData
  //     .map(function(e) { return e["shares"]; })
  //     .filter(function(e) { return e != ""; })
  // ));

  createCharts({
    "levelData" : countAndMapToLabel(extractedData,"level"),
    "beenToAgileConfData": countAndMapToLabel(extractedData,"beenToAgileConf"),
    "pastAgileConf": mapToLabelAndValue(pastAgileConfCount),
    "roles": mapToLabelAndValue(rolesCount)
  });
});

/// Helper ///
function countAndMapToLabel(extractedData, field) {
  var countBy = _.countBy(extractedData, function(data) {
    return data[field];
  });

  return mapToLabelAndValue(countBy);
}

function mapToLabelAndValue(obj) {
  return _.map(obj, function(value, key){
    return { "label":key, "value":value };
  });
}

function countData(data) {
  return _.countBy(data, function(d) { return d; });
}

/// Extracting Data ///

function extractData(originalData) {
  return originalData.map( scrubLine );
}

function scrubLine(line) {
  return {
    "level" : line["บอกเราหน่อยสิ คุณน่ะ อไจล์แค่ไหน ?"],
    "beenToAgileConf": extractBeenToAgileConf(line["BeenToAgileConf"]),
    "pastAgileConf": extractArray(line["PastAgileConf"]),
    "roles": extractArray(line["Roles"]),
    "shares": extractArray(line["WantToShareTag"]),
    "listens": extractArray(line["WantToListenTag"])
  };
}

function extractBeenToAgileConf(data) {
  if(data == "เคยไปมาแล้ว") return "เคย"; else return "ไม่เคย";
}

function extractArray(data) {
  return data.split(",").map( function(token) { return token.trim(); } );
}

/// Creating Charts ///

function createCharts(options) {
  createPieChart(options.levelData, "agileLevelsChart");
  createPieChart(options.beenToAgileConfData, "beenToAgileConfChart");
  createPieChart(options.pastAgileConf, "pastAgileConfChart");
  createPieChart(options.roles, "rolesChart");
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
