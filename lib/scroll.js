'use strict';

/**
 * Vertically scroll top-left corner of the given element (y-direction) into viewport.
 * @param scrollToElement element to be scrolled into visible area
 */
module.exports.scrollTo = function (scrollToElement) {
    var d = protractor.promise.defer();
    var wd = browser.driver;

    scrollToElement.getLocation().then(function (loc) {
        wd.executeScript('window.scrollTo(0,arguments[0]);', loc.y).then(function() {
            d.fulfill();
        });
    });
    
    return d.promise;
};
