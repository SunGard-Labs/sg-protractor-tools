'use strict';

/**
 * Vertically scroll top-left corner of the given element (y-direction) into viewport.
 * @param scrollToElement element to be scrolled into visible area
 */
module.exports.scrollTo = function (scrollToElement) {
    var wd = browser.driver;
    return scrollToElement.getLocation().then(function (loc) {
        return wd.executeScript('window.scrollTo(0,arguments[0]);', loc.y);
    });
};
