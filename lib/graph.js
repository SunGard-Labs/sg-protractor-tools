'use strict';

var path = require('path');
var phantomjs = require('phantomjs');
process.env.PATH += ':' + path.dirname(phantomjs.path);

var phantom = require('phantom');
var d3graph = require('./d3graph.js').d3graph;
var htmlStub = '<html><head></head><body></body></html>';

/**
 * generateGraphImage, a function to generate an image with a graph of the memory usage during the test.
 * @param filename - optional name of file to write graph image to.
 * @param graphData - array of 2 objects containing the memory results.
 * @param graphWidth - integar value for graph width.
 * @param graphHeight - integar value for graph height.
 */
module.exports.generateGraphImage = function(filename, graphData, graphWidth, graphHeight) {
	console.log("Starting Phantomjs to generate graph");
    var d = protractor.promise.defer();
	protractor.promise.controlFlow().execute(function() {
        phantom.create(function(ph) {
            // Create html page server-side for phantom to render
            return ph.createPage(function(page) {
                // Set content of page
                page.content = htmlStub;
                page.set('viewportSize', { width: graphWidth, height : graphHeight });
                
                //Inject D3 in sandboxed page
                page.injectJs(path.join(__dirname, '../node_modules/d3/d3.js'), function(fileFound) {
                    if(fileFound) {
                        //Execute JavaScript function 'd3graph' to generate graph in page context using evaluate. 
                        //Pass graphData, graphWidth and graphHeight to the sandboxed page to use as the 'data' parameter in the third argument in evaluate.
                        page.evaluate(d3graph, function(){ d.fulfill(true) }, graphData, graphWidth, graphHeight);	

                        page.render(filename);
                        ph.exit();
                        console.log("Graph generated");
                    } else {
                        console.log("D3 not found, graph could not be created");
                    }
                });	
            });
        });   
    });
    
    return d.promise;
};