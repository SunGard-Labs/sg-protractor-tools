'use strict';

function elementNotDisplayed(element) {
    var d = protractor.promise.defer();

    element.isDisplayed().then(function (isDisplayed) {
        d.fulfill(!isDisplayed);
    });

    return d.promise;
}

module.exports.waitForNotDisplayed = function (element) {
    return browser.wait(elementNotDisplayed(element));
};

module.exports.waitForDisplayed = function (element) {
    return browser.wait(element.isDisplayed);
};
