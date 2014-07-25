var _       = require('underscore'),
    fs      = require('fs'),
    parse   = require('csv-parse'),
    moment  = require('moment');

////////////////////////////////////////////////////////////
// Pipeline functions to structure-ify initial .csv rows
////////////////////////////////////////////////////////////

// Transform each row of the .csv file by refactoring it into an object.
// Add computed properties to make further manipulation simpler.
function addNewProps(csvRow) {
  var obj = {
    force: +csvRow[0],
    position: +csvRow[1],
    date: moment(new Date(csvRow[2])),
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

///////////////////////////////////////////////////////////////
// Pipeline functions to transform structured .csv data
// into format of the D3-ready .json file
////////////////////////////////////////////////////////////

/**
 * Given any valid JavaScript type 'struct' and an array of
 * functions 'fList', calls the first function in 'fList',
 * which should accept the structure and a function.  The 
 * function accepts any valid JavaScript type, and executes
 * the next function in 'fList' with that valid JavaScript type
 * in the same manner as before.  This process continues recursively
 * until 'fList' is exhausted.
 * @param  {any} struct Any valid JavaScript type to be manipulated
 * @param  {arr} fList  An array of functions that accepts a (struct, function)
 * @return {any}        Returns a (probably modified) 'struct'
 */
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

// 'structureTransforms' contains the list of functions
// that will be applied to transform the data structure
// into one usable by D3.js.  They are listed in order,
// and composed into an array which is passed to 'nestedFunctionalMap'.
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
        children: _.map(week, q)
      };
    });
  },

  aliasKeys: function(day, q) {
    return q(_.extend(day, {
      name: day.dayName,
      size: day.position
    }));
  }
};

// Asynchronously read file, and parse it, then enter
// the processing stage
fs.readFile('day.csv', function(err, file) {
  parse(file, {}, function(err, parsed) {

    // Create an Underscore chain from 'parsed' and apply
    // the chain of transformations, pulling it out of the
    // chain through .value()
    var organized = _.chain(parsed)
      .rest()
      .map(addNewProps)
      .groupBy('month')
      .map(groupByWeekInMonth)
      .value();

    // Transform the 'organized' data into the same schema as the
    // 'readme.json' example file.
    var structured = nestedFunctionalMap(
      organized,
      [ structureTransforms.setupTopLevelData,
        structureTransforms.mapMonths,
        structureTransforms.transformWeekObjects,
        structureTransforms.createWeekStructure,
        structureTransforms.aliasKeys ]
    );

    // Write the output into a .json file.
    fs.writeFile('d3_ready.json', JSON.stringify(structured));
  });
});
