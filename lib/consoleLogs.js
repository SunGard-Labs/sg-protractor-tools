'use strict';

/**
 * Returns the console logs as a Promise
 * to get the contents, call then(function(logs){..}) on the returned promise
 * the logs contains an array of objects that are in the logs.
 * @param done
 * @returns {*}
 */
module.exports.consoleLogs = function (done) {
    var promise = protractor.promise.defer();

    // This step is needed for some versions of Chrome to fetch the the latest logs
    browser.executeScript(function () {
    });

    browser.manage().logs().get('browser').then(function (browserLog) {

        promise.fulfill(browserLog);

        if (done) {
            done();
        }
    });

    return promise;
};

var offset = 0;
module.exports.newLogs = function (done) {
    //console.log('In new logs function');
    var promise = protractor.promise.defer();
    module.exports.consoleLogs().then(function (consoleLogs) {
        if (offset >= consoleLogs.length) {
            // Possible page reload appeared in the meantime
            offset = 0;
        }
        //console.log(' NewLogs received ' + consoleLogs.length + 'logs ');
        promise.fulfill(consoleLogs);
        offset = consoleLogs.length - 1;

        if (done) {
            done();
        }
    });
    return promise;
};

module.exports.noErrors = function () {
    var promise = protractor.promise.defer();
    //console.log('In after test case function');
    module.exports.newLogs().then(function (newConsoleLogs) {
        //console.log(' expectNoErrors received ' + newConsoleLogs.length + ' logs ');
        var errorLogged = newConsoleLogs.some(function (log) {
            return log.level.value > 900;
        });
        promise.fulfill(errorLogged);
    });
    return promise;
};

function expectNoErrors(logLevelValue, allowInfo) {
    // Register an afterEach at the test suite
    afterEach(function (done) {
        if (done) {
            // Callback function needed, because we finish async
            module.exports.newLogs().then(function (newConsoleLogs) {
                //console.log(' expectNoErrors received ' + newConsoleLogs.length + ' logs: ');
                //console.log(newConsoleLogs);
                var errorLogged = newConsoleLogs.some(function (log) {
                    if (allowInfo === false || !(log.message && log.message.indexOf('{') === 0 && JSON.parse(log.message).message.level === 'info')) {
                        //expect(log.level.value >= logLevelValue).toBe(false);
                        if (log.level.value >= logLevelValue) {
                            return true;
                        }
                    }
                });
                done(errorLogged ? 'Unacceptable logs in console detected' : undefined);
            });
        } else {
            console.warn('sg-protractor-tools expectNoErrors shortcut requires a done function to be passed in!');
        }
    });
}

/**
 * Expects all test cases in the given test suite to not produce error outputs in the console.
 * Test case will fail otherwise.
 * @param testSuite containing test cases to supervise
 */
module.exports.expectNoErrors = function (testSuite) {
    // Call with testSuite as "this" context
    expectNoErrors.apply(testSuite, [1000, true]);
};

/**
 * Expects all test cases in the given test suite to not produce warning or error outputs in the console.
 * Test case will fail otherwise.
 * @param testSuite containing test cases to supervise
 */
module.exports.expectNoWarnings = function (testSuite) {
    // Call with testSuite as "this" context
    expectNoErrors.apply(testSuite, [900, true]);
};

/**
 * Expects all test cases in the given test suite to not produce info, warning or error outputs in the console.
 * Test case will fail otherwise.
 * @param testSuite containing test cases to supervise
 */
module.exports.expectNoInfo = function (testSuite) {
    // Call with testSuite as "this" context
    expectNoErrors.apply(testSuite, [900, false]);
};
