'use strict';

module.exports.msg = function(browser,message,error,msgDelay,pauseOnError) { 
	if (error) {
		element(by.css('input[id="errorMessage"]')).clear().sendKeys(message);
		// this should be configurable (maybe screenshot errors also...)
		if (pauseOnError) {
			browser.pause();
		}
	} else {
		element(by.css('input[id="messageKey"]')).clear().sendKeys(message);
		if (msgDelay !== undefined && msgDelay >= 0) {
			browser.sleep(msgDelay)
		} else {
			browser.sleep(2000);
		}
	}
	return message;
};

module.exports.logErrors = function(browser,msgFunction,stillOutputToLog) { 
	// we need this code to push console error messages into the msg function
	browser.manage().logs().get('browser').then(function(browserLog) {
		if (browserLog.length > 0 && browserLog[0].message !== undefined) {
			msgFunction(browserLog[0].message,false,true);
		}
		if (stillOutputToLog) {
			console.log('log: ' + require('util').inspect(browserLog));
		}
	}); 
};
