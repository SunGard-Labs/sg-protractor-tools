/*global _:true */
/*jshint maxcomplexity:13*/

'use strict';
var fs = require('fs');
var _ = require('underscore');

function logResults(buffer, s) {
    buffer.push(s);
    console.log(s);
}

function appendToFile(filename, text){
    // Write file content blocking the nodeJs execution loop
    fs.appendFileSync(filename, text + '\n');
}

/**
 * Basic option to write results to file.
 * @param filename
 * @param results
 */
function writeResults(filename, results) {
    var data = results.jsHeapSizeLimit + ','  + results.usedJSHeapSize + ',' + results.totalJSHeapSize;
    appendToFile(filename, data);
}


module.exports.startMemoryMeasurement = function(test, options){
    return (function () {
        options = options || {};

        _.defaults(options, {
            writeLogFile: true,
            writeCsvFile: true
        });

        var memoryResult;

        var time = new Date().toISOString().replace(/\W/gi, '-');
        var filename = 'M_' + test.description.replace(/\W/gi, '-') + '_' + time + '.txt';
        var csvFilename = 'M_' + test.description.replace(/\W/gi, '-') + '_' + time + '.csv';

        if (options.writeLogFile) {
            console.log('Started memory test, logging to file ' + filename);
            appendToFile(filename, 'Memory Measurement Start (' + new Date().toISOString() + ')');
        }

        if (options.writeCsvFile) {
            console.log('Started memory test, logging to CSV file ' + csvFilename);
            appendToFile(csvFilename, 'jsHeapSizeLimit,usedJSHeapSize,totalJSHeapSize');
        }

        test.after(function(){
            if (options.writeLogFile) {
                appendToFile(filename, 'Memory Measurement End (' + new Date().toISOString() + ')');
            }
        });

        return {
            measureMemory: function(isLast){
                return module.exports.measureMemory(memoryResult, isLast, filename, csvFilename, options).then(function (result) {
                    memoryResult = result;

                    return result;
                });
            },
            callGarbageCollection: function(){
                return module.exports.callGarbageCollection(filename, options);
            },
        };
    }());
};

module.exports.runTestFunction = function(test, iterations, testFn, options) {
    options = options || {};

    _.defaults(options, {
        initialPostGcSleep: 2500,
        finalPostTestSleep: 1500,
        finalPostGcSleep: 4500,
        writeLogFile: true,
        writeCsvFile: true
    });

    var memoryMeasure = module.exports.startMemoryMeasurement(test, options);

    var runAndMeasure = function () {
        testFn.call();
        memoryMeasure.measureMemory();
    };

    memoryMeasure.callGarbageCollection().then(function () {
        console.log('Initial GC done, sleeping for ' + options.initialPostGcSleep + ' ms');
        browser.sleep(options.initialPostGcSleep);
        memoryMeasure.measureMemory();
    });

    // run the iterations and measure memory increments.
    for (var i = 0; iterations > i; i++) {
        browser.driver.call(runAndMeasure);
    }

    // allow browser to settle down, call garbage collection and measure final memory.
    browser.sleep(options.finalPostTestSleep);
    memoryMeasure.callGarbageCollection().then(function () {
        console.log('Final GC done, sleeping for ' + options.finalPostGcSleep + ' ms');
        browser.sleep(options.finalPostGcSleep);
        memoryMeasure.measureMemory(true);
    });
};

/**
 * measureMemory, a function to allow measuring of currently used memory. Works only in Chrome with special parameters.
 * @param previousResult - optional to allow comparison with previous memory reading.
 * @param isLast - optional flag to add log output indicating that this is the last reading.
 * @param filename - optional name of file to write log output to.
 * @param csvFilename - optional name of file to write CSV output to.
 * @param options - optional object containing the following properties (default true): writeLogFile, writeCsvFile
 * @returns {promise} the promise is resolved by .then
 *  for example: <code> var promise = html5.memory.measureMemory(); <br>
 promise.then(function (result) { <br>
                            myResult = result; <br></code>
 */
module.exports.measureMemory = function (previousResult, isLast, filename, csvFilename, options) {
    options = options || {};

    _.defaults(options, {
        writeLogFile: true,
        writeCsvFile: true
    });

    var d = protractor.promise.defer();
    browser.driver.executeScript(function () {
        return window.performance.memory;
    }).then(function (result) {
        var buffer = [];
        if (!previousResult) {
            if (options.writeLogFile) {
                logResults(buffer, '-----Initial memory sizes ---- ');
                logResults(buffer, 'Heap limit size: ' + result.jsHeapSizeLimit);
                logResults(buffer, 'Used heap size : ' + result.usedJSHeapSize);
                logResults(buffer, 'Total heap size: ' + result.totalJSHeapSize);
                logResults(buffer, '------------------------------------ ');
            }
        } else {
            if (isLast) {
                if (options.writeLogFile) {
                    logResults(buffer, '* Final memory comparison to initial sizes *');
                }
            } else {
                if (options.writeLogFile) {
                    logResults(buffer, '-----Compared memory sizes ---- ');
                }
            }
            //compare to passed result
            var fl, fh , ft;

            fl = result.jsHeapSizeLimit - previousResult.jsHeapSizeLimit;
            fh = result.usedJSHeapSize - previousResult.usedJSHeapSize;
            ft = result.totalJSHeapSize - previousResult.totalJSHeapSize;

            if (options.writeLogFile) {
                if (fl !== 0) {
                    logResults(buffer, 'Heap limit change: ' + fl);
                }
                if (fh !== 0) {
                    logResults(buffer, 'Used heap change ' + fh);
                }
                if (ft !== 0) {
                    logResults(buffer, 'Total heap change: ' + ft);
                }
                if ((fl === 0) && (fh === 0) && (ft === 0)) {
                    logResults(buffer, '!!! No change in heap size !!!');
                }
            }
        }

        if (filename && options.writeLogFile) {
            appendToFile(filename, buffer.join('\n'));
        }

        if (csvFilename && options.writeCsvFile) {
            writeResults(csvFilename, result);
        }
        d.fulfill(result);
    });
    return d.promise;
};

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
