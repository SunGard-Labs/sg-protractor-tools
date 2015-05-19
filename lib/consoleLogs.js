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

    browser.manage().logs().get('browser').then(function (browserLogs) {
        promise.fulfill(browserLogs);

        console.log('log: ' + require('util').inspect(browserLogs));

        if (done) {
            done();
        }
    });

    return promise;
};
