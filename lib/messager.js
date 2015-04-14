'use strict';

module.exports.msg = function (browser, message, error, msgDelay, pauseOnError) {
    if (error) {
        element(by.css('input[id="sgMessagerErrorMessageInput"]')).clear().sendKeys(message);
        // this should be configurable (maybe screenshot errors also...)
        if (pauseOnError) {
            browser.pause();
        }
    } else {
        element(by.css('input[id="sgMessagerMessageInput"]')).clear().sendKeys(message);
        if (msgDelay !== undefined && msgDelay >= 0) {
            browser.sleep(msgDelay);
        } else {
            browser.sleep(2000);
        }
    }
    return message;
};

module.exports.TOP_LEFT = 'top-left';
module.exports.TOP_RIGHT = 'top-right';
module.exports.BOTTOM_LEFT = 'bottom-left';
module.exports.BOTTOM_RIGHT = 'bottom-right';

module.exports.repositionMessager = function (position) {
    if (position && position !== '') {
        element(by.css('input[id="sgMessagerPosition"]')).clear().sendKeys(position);
    }
};

module.exports.logErrors = function (browser, msgFunction, pauseOnBreak, stillOutputToLog) {
    // we need this code to push console error messages into the msg function
    browser.manage().logs().get('browser').then(function (browserLog) {
        if (browserLog.length > 0 && browserLog[0].message !== undefined) {
            msgFunction(browser, browserLog[0].message, true, undefined, pauseOnBreak);
        }
        if (stillOutputToLog) {
            console.log('log: ' + require('util').inspect(browserLog));
        }
    });
};
