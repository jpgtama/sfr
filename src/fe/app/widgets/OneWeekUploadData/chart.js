define([
  'dojo/_base/lang',
  "dojo/_base/Color",
  // Require the basic 2d chart resource
 "dojox/charting/Chart",
 // Require the theme of our choosing
 //"dojox/charting/themes/Claro",
 "app/chart/MyTheme",

  "dojox/charting/plot2d/Pie",
  "dojox/charting/plot2d/Markers",
  "dojox/charting/plot2d/Lines",
   "dojox/charting/axis2d/Default",
    "dojox/charting/plot2d/Grid",
   // Wait until the DOM is ready
   // "dojo/domReady!"
], function(lang, Color, Chart, theme, Pie, Markers, Lines, Default, Grid){

  var chart = null;

  var weekLabels = {
    1: '周日',
    2: '周一',
    3: '周二',
    4: '周三',
    5: '周四',
    6: '周五',
    7: '周六',
  };

  var data = [{"data_id":"3","data_day":"2018-04-28","data_count":"33","alarm_count":"33","data_updatetime":"2018-04-28 06:30:20"},{"data_id":"2","data_day":"2018-04-27","data_count":"22","alarm_count":"22","data_updatetime":"2018-04-27 08:07:18"},{"data_id":"22","data_day":"2018-04-26","data_count":"33","alarm_count":"44","data_updatetime":"2018-04-26 07:15:29"},{"data_id":"1","data_day":"2018-04-25","data_count":"11","alarm_count":"22","data_updatetime":"2018-04-25 02:06:11"},{"data_id":"44","data_day":"2018-04-24","data_count":"44","alarm_count":"44","data_updatetime":"2018-04-24 12:34:08"},{"data_id":"33","data_day":"2018-04-23","data_count":"44","alarm_count":"44","data_updatetime":"2018-04-23 21:22:15"},{"data_id":"3","data_day":"2018-04-22","data_count":"33","alarm_count":"33","data_updatetime":"2018-04-22 13:27:20"}];

  function sortFunc(a, b) {
    var da = new Date(a.data_day), db = new Date(b.data_day);
    // add day of week
    a['dayofweek'] = da.getDay()+1;
    b['dayofweek'] = db.getDay()+1;


    if(da<db){
      return -1;
    }else if(da > db){
      return 1;
    }else{
      return 0;
    }
  }

  function sortByDataDay(d) {
    d.sort(sortFunc);
  }

  function convert(data){
    var labels = [];
    var chartData = [];
    var maxValue = 0;
    for(i=0;i<data.length;i++){
        var d = data[i];
        var x = i+1;
        var y = parseFloat(d['data_count']);
        maxValue = Math.max(maxValue, y);

        chartData.push({
          x: x, y: y
        });

        labels.push({
          value: x,
          text: weekLabels[d['dayofweek']]
        });
    }

    return [chartData, labels, maxValue];
  }

  function createChart(nodeId) {
     chart = new Chart(nodeId);

        // Set the theme
        chart.setTheme(theme);

        chart.addPlot("background-grid", { type: 'Grid',
             hMajorLines:true,
             hMinorLines:true,
             vMajorLines:false,
             vMinorLines:false,
             majorHLine: { color:"#5f6771", width:1 },
             minorHLine: { color:"#5f6771", width:1 },
             majorVLine: { color:"red", width:1 } });

        // Add the only/default plot
        chart.addPlot("default", {
            type: "Lines",
            markers: true,
            fill: new Color('#02214a')
        });


  }

  var makeChart = function(nodeId, data){
    // reverse
    // data.reverse();
    sortByDataDay(data);

    var cd = convert(data);

    // Create the chart within it&#x27;s "holding" node
    if(!chart){
      createChart(nodeId);
    }else{
      chart.removeAxis('x');
      chart.removeAxis('y');
      chart.removeSeries('SalesThisDecade')
    }

    // Add axes
    chart.addAxis("x", {labels: cd[1]});
    chart.addAxis("y", {vertical: true, fixUpper: "major", includeZero: true, minorTicks: false});

    // Add the series of data
    chart.addSeries("SalesThisDecade", cd[0]);

    // Render the chart!
    chart.render();

  };




return {
  makeChart: makeChart
};

});
