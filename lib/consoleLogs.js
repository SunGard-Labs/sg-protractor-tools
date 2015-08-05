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

	browser.executeScript(function() {}); // This step is needed for some chrome versions to fetch the the latest logs
    browser.manage().logs().get('browser').then(function (browserLog) {

        console.log('log: ' + require('util').inspect(browserLog));
      
		promise.fulfill(browserLog);
		
        if (done) {
            done();
        }
    });

    return promise;
};
