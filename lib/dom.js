'use strict';

module.exports.waitForNotDisplayed = function (element) {
    return browser.wait(function () {
        var d = protractor.promise.defer();

        element.isDisplayed().then(function (isDisplayed) {
            d.fulfill(!isDisplayed);
        });

        return d.promise;
    });
};

module.exports.waitForDisplayed = function (element) {
    return browser.wait(element.isDisplayed);
};