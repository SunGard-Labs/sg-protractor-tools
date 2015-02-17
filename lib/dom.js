'use strict';

module.exports.waitForNotDisplayed = function(element) {
    browser.wait(function () {
        var deferred = protractor.promise.defer();
        element.isDisplayed()
            .then(function (isDisplayed) {
                deferred.fulfill(!isDisplayed);
            });
        return deferred.promise;
    });
};

module.exports.waitForDisplayed = function(element) {
    browser.wait(element.isDisplayed);
};
