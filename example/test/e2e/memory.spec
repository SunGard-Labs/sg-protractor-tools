var _ = require('underscore');

// In your test suite, use this code to include the test library.
// var sgpt = require('sg-protractor-tools');

// Using the local version of the code from this project.
var sgpt = require('../../../');

/**
 * Note: Do not run both test cases simultaneously, as even after page reload memory consumption might be influenced
 * from previous pages. This might falsify the results.
 * Best results will be revealed when running this test suite in ddescribe and only one test case (iit)
 */
describe('Demomstrate the memory measuring tool', function () {
    var webDriver = browser.driver;

    // Get the messager object to display current test execution status inside the browser
    var msg = sgpt.messager.msg;

    // Set to a high value to avoid timeout by Protractor for this it test.
    var itTimeout = 1000000;

    var basicTestOptions = {
        initialPostGcSleep: 5000,
        finalPostTestSleep: 1500,
        finalPostGcSleep: 5000,
        writeLogFile: true,
        writeCsvFile: true
    };

    it('should increase the memory consumption'/* when recreating leaking directive multiple times*/, function () {
        var iterations = 250;
        //Set A Baseline for memory consumption
        browser.sleep(1000);

        // Override default settings if you want to
        var testOptions = _.defaults(basicTestOptions, {});

        var that = this;
        var leakProduceButton = element(by.css('#leakProducer'));

        browser.get('#/memoryTest', 30000).then(function () {
            sgpt.memory.runTestFunction(that, iterations, function (i) {
                if (i % 10 === 0) {
                    // Every ten iterations update the label
                    msg(browser, 'Button click iteration ' + i, undefined, 0);
                }
                leakProduceButton.click();
            }, testOptions);
        });

    }, itTimeout);

    xit('should not increase the memory consumption'/* when recreating non-leaking directive multiple times*/, function () {
        var iterations = 250;
        //Set A Baseline for memory consumption
        browser.sleep(1000);

        // Override default settings if you want to
        var testOptions = _.defaults(basicTestOptions, {});

        var that = this;
        var nonLeakingProduceButton = element(by.css('#m_1'));

        browser.get('#/memoryTest', 30000).then(function () {
            sgpt.memory.runTestFunction(that, iterations, function (i) {
                if (i % 10 === 0) {
                    // Every ten iterations update the label
                    msg(browser, 'Button click iteration ' + i, undefined, 0);
                }
                nonLeakingProduceButton.click();
            }, testOptions);
        });

    }, itTimeout);
});