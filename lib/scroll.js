'use strict';

module.exports.scrollTo = function(scrollToElement) {
    var wd = browser.driver;

    scrollToElement.getLocation().then(function (loc) {
        wd.executeScript('window.scrollTo(0,arguments[0]);', loc.y);
    });
};
