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
        fullDay:   obj.date.format('dddd'),
        name:      obj.date.week(),
        parent:    obj.date.week(),
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

    // Given 'struct' and an array of functions 'fList', recursively
    // applies the first function in fList to struct, doing a
    // deep recursive map on 'struct' if 'struct' is an array
    // or object.  Makes modifications shallow-to-deep.  Returns
    // at deepest invocation of last function.
    function nestedMap(struct, fList) {
      if (fList.length === 0) {
        return struct;
      }

      var newStruct = (fList[0])(struct);

      if (Array.isArray(newStruct) || typeof newStruct === 'object') {
        return _.map(newStruct, function(item) {
          return nestedMap(item, _.rest(fList));
        });
      } else {
        return nestedMap(newStruct, _.rest(fList));
      }
    }

    // Example to be transformed
    // var q = [[1, 2, 3],
    //          [2, 3, 4],
    //          [3, 4, 5]];

        var q = [ 
                  { '6': 
                      { '29': [Object], '30': [Object], '31': [Object] } 
                  },
                  { '7': 
                      { '31': [Object], '32': [Object], '33': [Object] } 
                  } 
                ];

    // Goal of transformation
    var data = [
 { "name" : "ABC", "parent":"DEF", "relation": "ghi", "depth": 1 },
 { "name" : "DEF", "parent":"null", "relation": "null", "depth": 0 },
 { "name" : "new_name", "parent":"ABC", "relation": "rel", "depth": 2 },
 { "name" : "new_name2", "parent":"ABC", "relation": "foo", "depth": 0 },
 { "name" : "Foo", "parent":"DEF", "relation": "rel", "depth": 0 },
 { "name" : "Bar", "parent":"null", "relation": "rel", "depth": 0 }
];


    // Array of functions to perform the transformation from
    // array 'q' to array 'r'
    var funcs = [function(arr) { return _.object([0,1,2],arr); }];
                 // function(num) { return num * 100},
                 // function(num) { return _.range(0, num + 100, 100); }];

    // Log for debugging
    // console.log(nestedMap(q, funcs));

    // testresult = nestedMap(q, funcs);

    // Create an Underscore chain from 'parsed' and apply
    // the chain of transformations, pulling it out of the
    // chain through .value()
    var result = _.chain(parsed)
      .rest()
      .map(addNewProps)
      // .groupBy('month')
      // .map(groupByWeekInMonth)
      .value();

    console.log(result);
      // console.log(result[0])


    fs.writeFile("transformed.json", JSON.stringify(result), function(err) {
      console.log(err);
    })

    // Uncomment for debug.
    //console.log(result);
    //console.log(result[0]['6']);
  });
});