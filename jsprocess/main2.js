var async = require('async'),
    csv = require('fast-csv'),
    colors = require('colors'),
    fs = require('fs'),
    _ = require('underscore');

var stream = fs.createReadStream('week2.csv');
var force_final,
    position_final,
    date_final;
var d3_data = []
var date = new Date(2014, 7, 14, 7, 24);


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
    d3_data.push(force_final);
  });

  async.mapLimit(file, 100, function(item, cb) {
    var positionSum = 0;
    _.each(item, function(el) {
      positionSum += +el[2];
    });

    cb(null, [positionSum/item.length]);
  }, function(err, results) {
    if (err) throw err;

    console.log('Success!  Results:'.green);
    var position_final = _.flatten(results);
    d3_data.push(position_final);
  });

  async.mapLimit(file, 100, function(item, cb) {
      var x = 0;
      x = new Date(+item[0][0] + date.getTime());

    cb(null, [x]);
  }, function(err, results) {
    if (err) throw err;
    console.log('Success!  Results:'.green);
    var date_final = _.flatten(results);
    d3_data.push(date_final);
   
  });

  var d3_data_final = _.zip(d3_data[0],d3_data[1],d3_data[2]);
  var d3_data_final_json = JSON.stringify(d3_data_final);
    fs.writeFile('data.json', d3_data_final_json, function(err) {
      if (err) throw err;
      console.log('file saved'.green);
  });
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
