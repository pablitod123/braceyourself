var _       = require('underscore'),
    fs      = require('fs'),
    parse   = require('csv-parse'),
    moment  = require('moment');

fs.readFile('day.csv', function(err, file) {
  parse(file, {}, function(err, parsed) {

    function addNewProps(item) {
      var obj = {
        force: +item[0],
        position: +item[1],
        date: moment(new Date(item[2])),
      };

      return _.extend(obj, {
        dayOfWeek: obj.date.day(),
        dayName:   obj.date.format('dddd'),
        week:      obj.date.week(),
        month:     obj.date.month(),
        monthName: obj.date.format('MMMM')
      });
    }

    function groupByWeekInMonth(daysArr, monthNum) {
      var obj = {};
      obj[monthNum] = _.groupBy(daysArr, 'week');
      return obj;
    };

    function addSchematics(arr) {
      return arr;
    }

    var result = _.chain(parsed)
      .rest()
      .map(addNewProps)
      .groupBy('month')
      .map(groupByWeekInMonth)
      .map(addSchematics)
      .value();

    console.log(result);
    console.log(result[0]['6']);
  });
});
