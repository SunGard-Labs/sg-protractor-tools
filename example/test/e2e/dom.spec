// In your test suite, use this code to include the test library.
// var fispt = require('sg-protractor-tools');

// Using the local version of the code from this project.
var fispt = require('../../../');

describe('Testing dom module function', function () {

    var webDriver = browser.driver;

    // Get the messager object to display current test execution status inside the browser
    var msg = fispt.messager.msg;

    beforeEach(function () {
        // Go to the right page
        browser.get('#/dom');
        fispt.resize.reset();
        fispt.messager.repositionMessager(fispt.messager.TOP_RIGHT);
    });

    afterEach(function () {
        fispt.messager.logErrors(browser, msg);
    });

    it('should play two rounds hide and seek', function () {

        var yeoman = element(by.css('#yeoman'));
        var startButton = element(by.css('#startButton'));
        var seekButton = element(by.css('#seekButton'));

        expect(yeoman.isDisplayed()).toBeTruthy();

        msg(browser, 'Step 1) Starting a game, waiting till hidden...');
        startButton.click();
        fispt.dom.waitForNotDisplayed(yeoman).then(function () {
            expect(yeoman.isDisplayed()).toBeFalsy();

            msg(browser, 'Step 2) Seeking yeoman...');
            seekButton.click();
            fispt.dom.waitForDisplayed(yeoman).then(function () {
                expect(yeoman.isDisplayed()).toBeTruthy();
                msg(browser, 'Step 3) Hide and seek complete');
            });
        });

    }, 20000);
});
