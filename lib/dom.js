'use strict';

module.exports.waitForNotDisplayed = function (element) {
    browser.wait(function () {
        var d = protractor.promise.defer();
        element.isDisplayed()
            .then(function (isDisplayed) {
                d.fulfill(!isDisplayed);
            });
        return d.promise;
    });
};

module.exports.waitForDisplayed = function (element) {
    var d = protractor.promise.defer();
    
    browser.wait(element.isDisplayed).then(function (isDisplayed) {
        d.fulfill();
    });
    
    return d.promise;
};
