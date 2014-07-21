var async = require('async'),
    csv = require('fast-csv'),
    colors = require('colors'),
    fs = require('fs'),
    _ = require('underscore');

var stream = fs.createReadStream('week.csv');

var processData = function(file) {
  async.mapLimit(file, 100, function(item, cb) {
    var forceSum = 0;
    _.each(item, function(el) {
      forceSum += +el[1];
    });

    cb(null, [forceSum/item.length]);
  }, function(err, results) {
    if (err) throw err;

    console.log('Success!  Results:'.green);
    var force_final = _.flatten(results);
    // This line turns the array into JSON object
    var force_final_json = JSON.stringify(force_final);
    // console.log(force_final);
    console.log(force_final_json);
    // This line writes the JSON object to new file
    fs.writeFile('data.json', force_final_json, function(err) {
      if (err) throw err;
      console.log('file saved'.green);
    });
  });

  // async.mapLimit(file, 100, function(item, cb) {
  //   var positionSum = 0;
  //   _.each(item, function(el) {
  //     positionSum += +el[2];
  //   });

  //   cb(null, [positionSum/item.length]);
  // }, function(err, results) {
  //   if (err) throw err;

  //   console.log('Success!  Results:'.green);
  //   var position_final = _.flatten(results);
  //   console.log(position_final);
  // });
};

var chunkSize = 100; // Size of each chunk
var file = []; // Final array of chunk arrays of size 'chunkSize'
var tmp = []; // Temporary array
var i = 0;
var j = 0;
var csvStream = csv()
  .on('record', function(data) {
    if (i > 1) {
      tmp.push(data);
      j++;

      if (j % chunkSize === 0) {
        file.push(tmp);
        tmp = [];
      }
    }
    i++;
  })
  .on('end', function() {
    processData(file);
  });

stream.pipe(csvStream);
