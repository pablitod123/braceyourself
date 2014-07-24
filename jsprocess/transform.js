var _       = require('underscore'),
    fs      = require('fs'),
    parse   = require('csv-parse'),
    moment  = require('moment');

// Asynchronously read file, and parse it, then enter
// the processing stage
fs.readFile('day.csv', function(err, file) {
  parse(file, {}, function(err, parsed) {

    // Transform each row of the .csv file by refactoring it into an object.
    // Add computed properties to make further manipulation simpler.
    function addNewProps(item) {
      var obj = {
        force: +item[0],
        position: +item[1],
        date: moment(new Date(item[2])),
      };

      // Extend basic object with date-specific properties
      return _.extend(obj, {
        dayOfWeek: obj.date.day(),
        dayName:   obj.date.format('dddd'),
        week:      obj.date.week(),
        month:     obj.date.month(),
        monthName: obj.date.format('MMMM')
      });
    }

    // Group days into weeks by returning an object that
    // represents one month
    function groupByWeekInMonth(daysArr, monthNum) {
      var obj = {};
      obj[monthNum] = _.groupBy(daysArr, 'week');
      return obj;
    }

    function nestedFunctionalMap(struct, fList) {
      function g(struct) {
        if (_.isEmpty(this.fList))
          return struct;

        var nextFunc = _.first(this.fList);
        var nextThis = {fList: _.rest(this.fList)};

        return nextFunc(struct, g.bind(nextThis));
      }

      return g.apply({fList: fList}, [struct]);
    }

    var structureTransforms = {    
      setupTopLevelData: function(original, q) {
        return {
          name: 'data',
          children: q(original)
        };
      },

      mapMonths: function(original, q) {
        return _.map(original, function(month) {
          var monthNum = _.keys(month)[0];
          return {
            name: 'Month #' + monthNum,
            children: q(month[monthNum])
          };
        });
      },

      transformWeekObjects: function(monthObj, q) {
        var keys = _.keys(monthObj);
        var weeks = [];
        _.each(keys, function(key) {
          weeks.push(monthObj[key]);
        });

        return q(weeks);
      },

      createWeekStructure: function(weeksArray, q) {
        return _.map(weeksArray, function(week) {
          return {
            name: 'Week ' + week[0].week,
            children: q(week)
          };
        });
      },

      aliasDayName: function(week, q) {
        week.name = week.dayName;
        return q(week);
      },

      aliasPosition: function(week, q) {
        week.size = week.position;
        return q(week);
      }
    };

    var pipeline = [ structureTransforms.setupTopLevelData,
                     structureTransforms.mapMonths,
                     structureTransforms.transformWeekObjects,
                     structureTransforms.createWeekStructure,
                     structureTransforms.aliasDayName,
                     structureTransforms.aliasPosition ];

    // Create an Underscore chain from 'parsed' and apply
    // the chain of transformations, pulling it out of the
    // chain through .value()
    var organized = _.chain(parsed)
      .rest()
      .map(addNewProps)
      .groupBy('month')
      .map(groupByWeekInMonth)
      .value();

    var structured = nestedFunctionalMap(organized, pipeline);

    console.log(structured.toString());
  });
});
