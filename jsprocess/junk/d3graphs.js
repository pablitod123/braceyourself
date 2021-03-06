var margin = {top:20, right: 20, bottom: 30, left: 50},
	width = 1200 - margin.left - margin.right,
	height = 600 - margin.top - margin.bottom;

var format = d3.time.format("%a %b %d %Y %H:%M:%S GMT%Z (EDT)").parse;

// var yArr = [40,5,60];

// var regression = numbers.statistic.exponentialRegression(yArr);

var x = d3.time.scale()
	.range([0, width]);
var y = d3.scale.linear()
	.range([height, 0]);

var xAxis = d3.svg.axis()
	.scale(x)
	.orient("bottom").ticks(15)
	.tickFormat(d3.time.format("%b %d %H:%M"));
var yAxis = d3.svg.axis()
	.scale(y)
	.orient("left").ticks(15);

var svg = d3.select("#graph1").append("svg")
     .attr("width", width + margin.left + margin.right)
     .attr("height", height + margin.top + margin.bottom)
	.append("g")
		.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var line = d3.svg.line()
	.interpolate("basis")
	.x(function(d) { return x(d.date); })
	.y(function(d) { return y(d.Position); });

// var reg_line = d3.svg.line()
// 	.x(function(d){return x(d.date)})
// 	.y(function(d){return y(regression(d.date))});

d3.csv("data.csv", function(error,data) {
	data.forEach(function(d) {
		d.date = format(d.date);
		d.Force = +d.Force;
		d.Position = +d.Position;
			
});

	x.domain(d3.extent(data, function(d) { return d.date; }));
	y.domain(d3.extent(data, function(d) { return d.Position; }));

	 // Derive a linear regression
  var lin = ss.linear_regression().data(data.map(function(d) {
    return [+d.date, d.Position];
  })).line();

  // Create a line based on the beginning and endpoints of the range
  var lindata = x.domain().map(function(x) {
    return {
      date: new Date(x),
      Position: lin(+x)
    };
  });

	svg.append("g")
		.attr("class", "x axis")
		.attr("transform", "translate(0," + height + ")")
		.call(xAxis); 

	svg.append("text")      // text label for the x axis
        .attr("transform",
          "translate(" + (width/2) + " ," +
                         (height + margin.bottom) + ")")
        .style("text-anchor", "end")
        .text("Date");

	 svg.append("g")
      .attr("class", "y axis")
      .call(yAxis)

	svg.append("text")
	     .attr("transform", "rotate(-90)")
	     .attr("y", 0 - margin.left)
	     .attr("x", 0 - (height / 2))
	     .attr("dy", "1em")
	     .style("text-anchor", "end")
	     .text("Position");

	  svg.append("text")
        .attr("x", (width / 2))
        .attr("y", 0 - (margin.top / 2))
        .attr("dy", "1em")
        .attr("text-anchor", "middle")
        .style("font-size", "16px")
        .style("text-decoration", "underline")
        .text("Position vs Time Graph");
	    
        svg.append("path")
      .datum(data)
      .attr("class", "line")
      .attr("d", line);

      svg.append("path")
      .datum(lindata)
      .attr("class", "reg")
      .attr("d", line);

      // svg.append('path')
      //   .datum(data)
      //   .attr('class','regression line')
      //   .attr('d',reg_line);
});
	//second graph

var svg2 = d3.select("#graph2").append("svg")
     .attr("width", width + margin.left + margin.right)
     .attr("height", height + margin.top + margin.bottom)
	.append("g")
		.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var line2 = d3.svg.line()
	.interpolate("basis")
	.x(function(d) { return x(d.date); })
	.y(function(d) { return y(d.Force); });

d3.csv("data.csv", function(error,data) {
	data.forEach(function(d) {
		d.date = format(d.date);
		d.Force = +d.Force;
		d.Position = +d.Position;
			
});

	x.domain(d3.extent(data, function(d) { return d.date; }));
	y.domain(d3.extent(data, function(d) { return d.Force; }));

	var lin2 = ss.linear_regression().data(data.map(function(d) {
    return [+d.date, d.Force];
  })).line();

  // Create a line based on the beginning and endpoints of the range
  var lindata2 = x.domain().map(function(x) {
    return {
      date: new Date(x),
      Force: lin2(+x)
    };
  });

	svg2.append("g")
		.attr("class", "x axis")
		.attr("transform", "translate(0," + height + ")")
		.call(xAxis); 

	svg2.append("text")      // text label for the x axis
        .attr("transform",
          "translate(" + (width/2) + " ," +
                         (height + margin.bottom) + ")")
        .style("text-anchor", "end")
        .text("Date");

	 svg2.append("g")
      .attr("class", "y axis")
      .call(yAxis)

	svg2.append("text")
	     .attr("transform", "rotate(-90)")
	     .attr("y", 0 - margin.left)
	     .attr("x", 0 - (height / 2))
	     .attr("dy", "1em")
	     .style("text-anchor", "end")
	     .text("Force");

	  svg2.append("text")
        .attr("x", (width / 2))
        .attr("y", 0 - (margin.top / 2))
        .attr("dy", "1em")
        .attr("text-anchor", "middle")
        .style("font-size", "16px")
        .style("text-decoration", "underline")
        .text("Force vs Time Graph");

     svg2.append("path")
      .datum(data)
      .attr("class", "line")
      .attr("d", line2);

       svg2.append("path")
      .datum(lindata2)
      .attr("class", "reg")
      .attr("d", line2);
});

