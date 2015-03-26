'use strict';

var phantom = require('phantom');
var htmlStub = '<html><head></head><body></body></html>';

/**
 * generateGraphImage, a function to generate an image with a graph of the memory usage during the test.
 * @param filename - optional name of file to write graph image to.
 * @param graphData - array of 2 objects containing the memory results.
 */
module.exports.generateGraphImage = function(filename, graphData) {
	console.log("Starting Phantomjs to generate graph");
	phantom.create(function(ph) {
        // Create html page server-side for phantom to render
		return ph.createPage(function(page) {
            // Set content of page
			page.content = htmlStub;
			page.set('viewportSize', { width: 800, height : 600 });
			// Include D3 in sandboxed page
			page.includeJs("http://localhost:9000/scripts/d3.js", function(url) {
                // Execute JavaScript in page context using evaluate. 
                // Pass graphData to the sandboxed page to use as the 'data' parameter in the third argument in evaluate.
				page.evaluate(function(data) {                
					var margin = {top: 20, right: 85, bottom: 30, left: 70},
						width = 800 - margin.left - margin.right,
						height = 600 - margin.top - margin.bottom;

					var parseDate = d3.time.format("%Y%m%d").parse;

					var x = d3.scale.linear()
						.range([0, width]);

					var y = d3.scale.linear()
						.range([height, 0]);

					var xAxis = d3.svg.axis()
						.scale(x)
						.tickFormat(d3.format("d"))
						.orient("bottom");

					var yAxis = d3.svg.axis()
						.scale(y)
						.orient("left");

					var yAxisGrid = function() {
					  return d3.svg.axis()
						  .scale(y)
						  .orient("left")
					}

					var line = d3.svg.line()
						.interpolate("basis")
						.x(function(d, i) { return x(i + 1); })
						.y(function(d) { return y(d); });

					var svg = d3.select("body").append("svg")
						.attr("width", width + margin.left + margin.right)
						.attr("height", height + margin.top + margin.bottom)
					  .append("g")
						.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

					x.domain([1, d3.max(data, function(c) {return d3.max(c.values, function(v, i) { return i + 1; }); })]);

					y.domain([
						d3.min(data, function(c) {return d3.min(c.values, function(v) { return v; }); }),
						d3.max(data, function(c) {return d3.max(c.values, function(v) { return v; }); })
					]);

					svg.append("g")
				    	.attr("class", "x axis")
				  		.attr("transform", "translate(0," + height + ")")
				  		.call(xAxis)
					  .append("text")
				  		.attr("y", -10)
				  		.attr("x", width)
						.attr("dy", ".71em")
						.style("text-anchor", "end")
						.text("Iterations");

					svg.append("g")
						.attr("class", "y axis")
						.call(yAxis)
					  .append("text")
						.attr("transform", "rotate(-90)")
						.attr("y", 6)
						.attr("dy", ".71em")
						.style("text-anchor", "end")
						.text("Heap Size");

					svg.append("g")            
						.attr("class", "grid")
						.call(yAxisGrid()
					  	.tickSize(-width, 0, 0)
					  	.tickFormat("")
					)

					var heap = svg.selectAll(".heap")
                        .data(data)
				      .enter().append("g")
				        .attr("class", "heap");

					heap.append("path")
                        .attr("class", function(d) { return "line " + d.name; })
                        .attr("d", function(d) { return line(d.values); });

					heap.append("text")
                        .datum(function(d) { return {name: d.name, value: d.values[d.values.length - 1]}; })
                        .attr("transform", function(d) { return "translate(" + width + "," + y(d.value) + ")"; })
                        .attr("x", 3)
                        .attr("dy", ".71em")
                        .attr("textLength", 80)
                        .attr("lengthAdjust", "spacing")
                        .text(function(d) { return d.name; });

                    // Graph and body styling
					d3.select("body")
                        .style("background-color", "white")
                        .style("font", "10px sans-serif");
					
					d3.selectAll(".axis path")
                        .style("fill", "none")
                        .style("stroke", "#000")
                        .style("shape-rendering", "crispEdges");
					
					d3.selectAll(".axis line")
                        .style("fill", "none")
                        .style("stroke", "#000")
                        .style("shape-rendering", "crispEdges");
					
					d3.selectAll(".grid .tick")
                        .style("stroke", "lightgrey")
                        .style("stroke-opacity", "0.7")
                        .style("shape-rendering", "crispEdges");
										
					d3.selectAll(".line")
                        .style("fill", "none")
                        .style("stroke", "steelblue")
                        .style("stroke-width", "1.5px");
					
					d3.select(".line.totalJSHeapSize")
                        .style("stroke", "orange");

				},function(){}, graphData);	

				page.render(filename);
				ph.exit();
				console.log("Graph generated");
			});	
		});
	});
};