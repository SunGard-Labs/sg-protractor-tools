// In your test suite, use this code to include the test library.
// var sgpt = require('sg-protractor-tools');

// Using the local version of the code from this project.
var sgpt = require('../../../');

describe('Testing the getting of consoleLogs function', function () {
    // Get the messager object to display current test execution status inside the browser
    var msg = sgpt.messager.msg;

    /* WHAT ARE WE TESTING:
     *
     * Console error logs can be a indicator that there are changes that are throwing errors.
     * Some of these errors might not break the functionality that is being tested, but may be indicators of
     * other issues that need to be addressed.
     *
     * Testing for console out errors allows for early detection of issues that might otherwise be unnoticed.
     *
     * Note that testing for console errors will fail all tests after the first console errors unless the application is
     * reloaded. Clearing the console programmatically does not work consistently.
     */

    beforeEach(function () {
        browser.get('#/consoleLogs');
        sgpt.messager.repositionMessager(sgpt.messager.TOP_RIGHT);
        sgpt.resize.reset();
    });

    /**
     * Any test in the following describe block will fail if it produces error logs in the console
     * But info and warning logs are acceptable and won't cause failure
     */
    describe('tests that do not produce error console output', function () {
        sgpt.consoleLogs.expectNoErrors(this);

        it('should not fail due to a logged info console message', function () {
            // This test passes, as it only produces an info in the console
            msg(browser, 'Will log an info message in the console');
            element(by.css('button[id="infoButton"]')).click();
        });

        it('should not fail due to a logged warning message', function () {
            // This test passes, as it only produces a warning in the console
            msg(browser, 'Will log a warning message in the console');
            element(by.css('button[id="warningButton"]')).click();
        });

        xit('should fail due to a logged error message', function () {
            // This test fails, as it produces an error in the console
            // and this describe() blocks expectsNoErrors
            msg(browser, 'Will log a warning message in the console');
            element(by.css('button[id="errorButton"]')).click();
        });
    });

    describe('tests that do not produce warning or error console output', function () {
        // But info outputs are acceptable and won't cause failure
        sgpt.consoleLogs.expectNoWarnings(this);

        it('should not fail due to a logged info console message', function () {
            // This test passes, as it only produces an info in the console
            msg(browser, 'Will log an info message in the console');
            element(by.css('button[id="infoButton"]')).click();
        });

        xit('should fail due to a logged warning message', function () {
            // This test fails, as it produces an warning in the console
            // and this describe() blocks expectsNoWarnings
            msg(browser, 'Will log a warning message in the console');
            element(by.css('button[id="warningButton"]')).click();
        });

        xit('should fail due to a logged error message', function () {
            // This test fails, as it produces an error in the console
            // and this describe() blocks expectsNoErrors
            msg(browser, 'Will log a warning message in the console');
            element(by.css('button[id="errorButton"]')).click();
        });
    });

    it('should create a console error', function () {
        msg(browser, 'Will log an error in the console');
        element(by.css('button[id="errorButton"]')).click();

        // Retrieve all log information
        sgpt.consoleLogs.consoleLogs().then(function (logs) {
            var containsError = false;

            // iterate over the array ...
            logs.forEach(function (log) {
                if (log.level.value >= 1000) {
                    containsError = true;
                }
            });
            // ... and expect at least one log with level 1000 or more
            // which means it is an error
            expect(containsError).toBeTruthy();
        });

    });
});
