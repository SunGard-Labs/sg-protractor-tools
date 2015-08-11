'use strict';

function elementNotDisplayed(element) {
    var d = protractor.promise.defer();
    
    element.isDisplayed()
        .then(function (isDisplayed) {
            d.fulfill(!isDisplayed);
        });
    
    return d.promise;    
}

module.exports.waitForNotDisplayed = function (element) {
    var d = protractor.promise.defer();
    
    browser.wait(module.exports.elementNotDisplayed(element))
        .then(function() {
            d.fulfill();
        });
    
    return d.promise;
};

module.exports.waitForDisplayed = function (element) {
    var d = protractor.promise.defer();
    
    browser.wait(element.isDisplayed)
        .then(function (isDisplayed) {
            d.fulfill();
        });
    
    return d.promise;
};
