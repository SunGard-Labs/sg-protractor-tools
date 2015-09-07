'use strict';

module.exports.waitForNotDisplayed = function (element, timeout) {
    timeout = timeout || 1000;

    return browser.wait(function () {
        var d = protractor.promise.defer();

        element.isDisplayed().then(function (isDisplayed) {
            d.fulfill(!isDisplayed);
        });

        return d.promise;
    }, timeout);
};

module.exports.waitForDisplayed = function (element, timeout) {
    timeout = timeout || 1000;

    return browser.wait(element.isDisplayed, timeout);
};
