/*global _:true */
/*jshint maxcomplexity: 14*/
/*jshint maxparams: 7 */

'use strict';
var fs = require('fs');
var path = require('path');
var mkdirp = require('mkdirp');
var _ = require('underscore');
var color = require('cli-color');
var generateGraph = require('./graph.js');

function logResults(buffer, s) {
    buffer.push(color.strip(s));
    console.log(s);
}

/**
 * Append some text to the log file.
 * @param filename name of the file to append text to
 * @param text content to be appended
 */
function appendToFile(filename, text) {
    // Write file content blocking the nodeJs execution loop
    fs.appendFileSync(filename, text + '\n');
}

/**
 * Write results separated with comma into csv file
 * @param filename name of the file to append the results to
 * @param results memory measurement result object
 */
function writeResults(filename, results) {
    var data = results.jsHeapSizeLimit + ',' + results.usedJSHeapSize + ',' + results.totalJSHeapSize;
    appendToFile(filename, data);
}

/**
 * Initialize memory measurement of a given test case.
 * Returns an object with convenience methods to trigger memory measurement and garbage collection.
 * Results of these operations will automatically be logged into the files specified by options.
 *
 * @param test Testcase instance to be measured
 * @param options plain object containing settings whether log, csv or png graph file should be created
 *              Default options object: {writeLogFile: true, writeCsvFile: true, generateGraph: true}
 * @param time Start time string for use in filenames
 * @param graphData array of objects containing the line name and the corresponding array of values: eg. [{name: 'totalJSHeapSize', values: []},{name: 'usedJSHeapSize', values: []}]
 */
module.exports.startMemoryMeasurement = function (test, options, time, graphData) {
    return (function () {
        options = options || {};

        _.defaults(options, {
            dir: '',
            writeLogFile: true,
            writeCsvFile: true,
            generateGraph: true,
            graphWidth: 800,
            graphHeight: 600
        });

        var memoryResult, initialResult;

        // Try to create the directory first
        mkdirp.sync(options.dir);

        var baseFileName = path.join(options.dir, 'M_' + test.description.replace(/\W/gi, '-') + '_' + time);
        var filename =  baseFileName + '.txt';
        var csvFilename = baseFileName + '.csv';
        var graphFilename = baseFileName + '.png';

        if (options.writeLogFile) {
            console.log('Started memory test, logging to file ' + filename);
            appendToFile(filename, 'Memory Measurement Start (' + new Date().toISOString() + ')');
        }

        if (options.writeCsvFile) {
            console.log('Started memory test, logging to CSV file ' + csvFilename);
            appendToFile(csvFilename, 'jsHeapSizeLimit,usedJSHeapSize,totalJSHeapSize');
        }

        if (graphFilename && options.generateGraph) {
            console.log('Started memory test. At the end of the test a graph will be generated in file ' + graphFilename);
        }

        test.after(function () {
            if (options.writeLogFile) {
                appendToFile(filename, 'Memory Measurement End (' + new Date().toISOString() + ')');
            }

            if (graphFilename && options.generateGraph) {
                browser.controlFlow().wait(
                    generateGraph.phantomRender(graphFilename, graphData, options.graphWidth, options.graphHeight)
                ).then(function () {
                        console.log('Graph generated: ' + graphFilename);
                    }, function (error) {
                        console.log('Graph ' + error);
                    });
            }
        });

        return {
            measureMemory: function (isLast, iteration) {
                return module.exports.measureMemory(isLast ? initialResult : memoryResult, isLast, filename, csvFilename, options, graphData, iteration).then(function (result) {
                    if (_.isUndefined(initialResult)) {
                        initialResult = result;
                    }

                    memoryResult = result;

                    return result;
                });
            },

            callGarbageCollection: function () {
                return module.exports.callGarbageCollection(filename, options);
            }
        };
    }());
};

/**
 * Execute a given task multiple times and measure memory usage after each iteration.
 *
 *
 * @param test Testcase instance to be measured
 * @param iterations Number how often testFn should be executed
 * @param testFn Task to be performed multiple times, e.g. clicking a button.
 *              The first parameter this function receives is the current iteration count.
 * @param options Plain object specifying behavior
 *                Default options object:
 *                {
 *                  dir: '', // Directory to output reports. Defaults to current directory.
 *                  initialPostGcSleep: 2500, // Milliseconds to sleep after GC before iterations start
 *                  finalPostTestSleep: 1500, // Milliseconds to sleep before final GC after all iterations happened
 *                  finalPostGcSleep: 4500, // Milliseconds to sleep between last GC and final memory measurement
 *                  writeLogFile: true, // Boolean whether a txt-log file should be created
 *                  writeCsvFile: true, // Boolean whether a csv file with raw memory usage values should be created
 *                  generateGraph: true, // Boolean whether to generate memory results graph in a PNG file
 *                  graphWidth: 800, // integer value for graph width
 *                  graphHeight: 600, // integer value for graph height
 *                  preTestInitFunction: undefined, // Called between initial GC and the start of the test
 *                  postTestCompleteFunction: undefined // Called between the final GC and memory measurement
 *                }
 */
module.exports.runTestFunction = function (test, iterations, testFn, options) {
    options = options || {};
    _.defaults(options, {
        dir: '',
        initialPostGcSleep: 2500,
        finalPostTestSleep: 1500,
        finalPostGcSleep: 4500,
        writeLogFile: true,
        writeCsvFile: true,
        generateGraph: true,
        graphWidth: 800,
        graphHeight: 600,
        preTestInitFunction: undefined,
        postTestCompleteFunction: undefined
    });

    var time = new Date().toISOString().replace(/\W/gi, '-');

    var graphData;

    if (options.generateGraph) {
        graphData = [
            {name: 'totalJSHeapSize', values: []},
            {name: 'usedJSHeapSize', values: []}
        ];
    }

    var memoryMeasure = module.exports.startMemoryMeasurement(test, options, time, graphData);

    var runAndMeasure = function (iterationNo) {
        return function () {
            testFn.call(this, iterationNo);
            memoryMeasure.measureMemory(false, iterationNo);
        };
    };

    memoryMeasure.callGarbageCollection().then(function () {
        console.log('Initial GC done, sleeping for ' + options.initialPostGcSleep + ' ms');
        if (!_.isUndefined(options.preTestInitFunction)) {
            browser.driver.call(options.preTestInitFunction);
        }
        browser.sleep(options.initialPostGcSleep);
        memoryMeasure.measureMemory(false, 0);
    });

    // run the iterations and measure memory increments.
    for (var i = 0; iterations > i; i++) {
        browser.driver.call(runAndMeasure(i));
    }

    // allow browser to settle down, call garbage collection and measure final memory.
    browser.sleep(options.finalPostTestSleep);
    memoryMeasure.callGarbageCollection().then(function () {
        console.log('Final GC done, sleeping for ' + options.finalPostGcSleep + ' ms');
        if (!_.isUndefined(options.postTestCompleteFunction)) {
            browser.driver.call(options.postTestCompleteFunction);
        }
        browser.sleep(options.finalPostGcSleep);
        memoryMeasure.measureMemory(true, iterations);
    });
};

/**
 * measureMemory, a function to allow measuring of currently used memory. Works only in Chrome with special parameters.
 * @param comparisonMeasurement - optional to allow comparison with previous memory reading.
 * @param isLast - optional flag to add log output indicating that this is the last reading.
 * @param filename - optional name of file to write log output to.
 * @param csvFilename - optional name of file to write CSV output to.
 * @param options - optional object containing the following properties (default true): writeLogFile, writeCsvFile, generateGraph
 * @param graphData - array of 2 objects containing the memory results.
 * @param iteration - the index of the current iteration, only used for logging purposes
 * @returns {promise} the promise is resolved by .then
 *  for example: <code> var promise = html5.memory.measureMemory(); <br>
 promise.then(function (result) { <br>
                            myResult = result; <br></code>
 */
module.exports.measureMemory = function (comparisonMeasurement, isLast, filename, csvFilename, options, graphData, iteration) {
    options = options || {};

    _.defaults(options, {
        writeLogFile: true,
        writeCsvFile: true,
        generateGraph: true
    });

    var d = protractor.promise.defer();

    browser.driver.executeScript(function () {
        return window.performance.memory;
    }).then(function (result) {
        var buffer = [];

        if (!comparisonMeasurement) {
            if (options.writeLogFile) {
                logResults(buffer, color.bold('-----Initial memory sizes ---- '));
                logResults(buffer, 'Heap limit size: ' + result.jsHeapSizeLimit);
                logResults(buffer, 'Used heap size : ' + result.usedJSHeapSize);
                logResults(buffer, 'Total heap size: ' + result.totalJSHeapSize);
                logResults(buffer, '------------------------------------ ');
            }
        } else {
            if (isLast) {
                if (options.writeLogFile) {
                    logResults(buffer, color.bold('* Final memory comparison to initial sizes *'));
                }
            } else {
                if (options.writeLogFile) {
                    logResults(buffer, color.bold('-----Iteration: ' + iteration + '. Comparing memory sizes ---- '));
                }
            }
            //compare to passed result
            var fl, fh , ft;

            fl = result.jsHeapSizeLimit - comparisonMeasurement.jsHeapSizeLimit;
            fh = result.usedJSHeapSize - comparisonMeasurement.usedJSHeapSize;
            ft = result.totalJSHeapSize - comparisonMeasurement.totalJSHeapSize;

            if (options.writeLogFile) {
                logResults(buffer, 'Heap limit change: ' + (fl > 0 ? color.red('+' + fl) : color.green(fl)) + ' (now at ' + result.jsHeapSizeLimit + ')');
                logResults(buffer, 'Used heap change:  ' + (fh > 0 ? color.red('+' + fh) : color.green(fh)) + ' (now at ' + result.usedJSHeapSize + ')');
                logResults(buffer, 'Total heap change: ' + (ft > 0 ? color.red('+' + ft) : color.green(ft)) + ' (now at ' + result.totalJSHeapSize + ')');

                if ((fl === 0) && (fh === 0) && (ft === 0)) {
                    logResults(buffer, '!!! No change in memory usage !!!');
                }
            }
        }

        if (filename && options.writeLogFile) {
            appendToFile(filename, buffer.join('\n'));
        }

        if (csvFilename && options.writeCsvFile) {
            writeResults(csvFilename, result);
        }

        if (options.generateGraph) {
            // Push results to data object
            graphData[0].values.push(result.totalJSHeapSize);
            graphData[1].values.push(result.usedJSHeapSize);
        }

        d.fulfill(result);
    });
    return d.promise;
};

/**
 * Trigger a garbage collection in Chrome browser.
 *
 * @param filename optional filename to log messages to
 * @param options Plain object containing a property `writeLogFile` whether messages should be logged into file (true) or not (false)
 * @returns {promise} Promise to be resolved after GC triggered
 */
module.exports.callGarbageCollection = function (filename, options) {
    options = options || {};

    _.defaults(options, {
        writeLogFile: true
    });

    var d = protractor.promise.defer();

    browser.driver.executeScript(function () {
        return window.gc();
    }).then(function (result) {
        var buffer = [];

        logResults(buffer, 'Garbage collection invoked');

        if (filename && options.writeLogFile) {
            appendToFile(filename, buffer.join('\n'));
        }

        d.fulfill(result);
    });

    return d.promise;
};
