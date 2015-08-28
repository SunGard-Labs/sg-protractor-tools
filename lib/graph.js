/*jshint node: true */
'use strict';

var path = require('path');
var phantomjs = require('phantomjs');

if (process.platform === 'win32' || process.platform === 'win64') {
    process.env.PATH += ';' + path.dirname(phantomjs.path);
} else {
    process.env.PATH += ':' + path.dirname(phantomjs.path);
}

var phantom = require('phantom');
var d3graph = require('./d3graph.js').d3graph;
var htmlStub = '<html><head></head><body></body></html>';

/**
 * phantomRender, a function to generate an image of a graph with phantomjs.
 * @param filename - optional name of file to write graph image to.
 * @param graphData - array of 2 objects containing the memory results.
 * @param graphWidth - integer value for graph width.
 * @param graphHeight - integer value for graph height.
 */
module.exports.phantomRender = function (filename, graphData, graphWidth, graphHeight) {

    var d = protractor.promise.defer();

    phantom.create(function (ph) {
        // Create html page server-side for phantom to render
        return ph.createPage(function (page) {
            // Set content of page
            page.content = htmlStub;
            page.set('viewportSize', { width: graphWidth, height: graphHeight });

            //Inject D3 in sandboxed page
            page.injectJs(path.join(__dirname, '../node_modules/d3/d3.js'), function (fileFound) {
                if (fileFound) {
                    //Execute JavaScript function 'd3graph' to generate graph in page context using evaluate.
                    //Pass graphData, graphWidth and graphHeight to the sandboxed page to use as the 'data' parameter in the third argument in evaluate.
                    page.evaluate(d3graph, function () {
                    }, graphData, graphWidth, graphHeight);

                    page.render(filename);
                    ph.exit();
                    d.fulfill(true);
                } else {
                    d.reject(new Error('D3 not found, graph could not be created'));
                }
            });
        });
    }, {
        dnodeOpts: {
            weak: false
        }
    });

    return d.promise;
};
