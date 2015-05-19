// In your test suite, use this code to include the test library.
// var sgpt = require('sg-protractor-tools');

// Using the local version of the code from this project.
var sgpt = require('../../../');

describe('Testing the getting of consoleLogs function', function () {

    var isPositiveTest = true;

    // Get the messager object to display current test execution status inside the browser
    var msg = sgpt.messager.msg;

    beforeEach(function () {
        browser.get('#/consoleLogs');
        sgpt.messager.repositionMessager(sgpt.messager.TOP_RIGHT);
    });

    afterEach(function (done) {
        var consoleLogPromise = sgpt.consoleLogs.consoleLogs(done);

        consoleLogPromise.then(function (logs) {
            var containsError = false;

            logs.forEach(function (log) {
                if (log.level.value > 900) {
                    containsError = true;
                }
            });

            if (isPositiveTest) {
                expect(containsError).toBeFalsy();
            }
            else {
                expect(containsError).toBeTruthy();
            }

            // does not always seem to work consistently.
            // only sure way seems to reload application completely.
            browser.executeScript('console.clear();');
        });
    });


    /* WHAT ARE WE TESTING:
     *
     * Console error logs can be a indicator that there are changes that are throwing errors.
     * Some of these errors might not break the functionality that is being tested, but may be indicators of
     * other issues that need to be addressed.
     *
     * Testing for console out errors allows for early detection of issues that might otherwise be unnoticed.
     *
     * Note that testing for console errors will fail all tests after the first console errors unless the application is
     * reloaded.
     */

    it('should not respond to a logged console messge', function () {
        isPositiveTest = true;
        msg(browser, 'Will log a message  in the console');
        element(by.css('button[id="messageButton"]')).click();
    }, 20000);

    it('should catch a logged console error', function () {
        isPositiveTest = false;
        msg(browser, 'Will log an error in the console');
        element(by.css('button[id="errorButton"]')).click();
    }, 20000);


});
