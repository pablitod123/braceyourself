var _       = require('underscore'),
    fs      = require('fs'),
    parse   = require('csv-parse'),
    moment  = require('moment');

fs.readFile('day.csv', function(err, file) {
  parse(file, {}, function(err, parsed) {

    function addNewProps(item) {
      var obj = {};
      obj.force     = +item[0];
      obj.position  = +item[1];
      obj.date      = moment(new Date(item[2]));
      obj.dayOfWeek = obj.date.day();
      obj.month     = obj.date.month();
      obj.week      = obj.date.week();
      return obj;
    }

    function groupByWeekInMonth(daysArr, monthNum) {
      var obj = {};
      obj[monthNum] = _.groupBy(daysArr, week);
      return obj;
    };

    var monthList = {};
    // monthList: {'7': [31, 32, 33, 34], '8': }
    function populateMonthList(data) {
      _.each(data, transformMonthObj);

      function transformMonthObj(arr, monthNum) {
        monthList[monthNum] = extractWeek(arr);
      }

      function extractWeek(weekArray) {
        return _.chain(weekArray)
                 .pluck('week')
                 .uniq()
                 .value();
      }
    }

    var result = _.chain(parsed)
      .rest()
      .map(addNewProps)
      .groupBy('month')
      .tap(populateMonthList)
      .value();

    console.log(result);
    console.log(monthList);
  });
});


_.map({1: 'lol!', 2: 'cats!', 3: 'oh hey guys!', 4: 'summer calls'}, function(value, key) {
  return value + ' heyy'
});





var x = Date.parse('Mon Jul 18 2014 08:45:00 GMT-0400 (EDT)');
var y = new Date(+x);

y.getMonth()
