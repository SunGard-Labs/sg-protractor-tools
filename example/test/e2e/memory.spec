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
ddescribe('Demomstrate the memory measuring tool', function () {
    var webDriver = browser.driver;

    // Get the messager object to display current test execution status inside the browser
    var msg = sgpt.messager.msg;

    // Set to a high value to avoid timeout by Protractor for this it test.
    var itTimeout = 1000000;

    function leakFunction() {
        var leakProduceButton = element(by.css('#leakProducer'));
        leakProduceButton.click();
    }

    function nonLeakFunction() {
        var nonLeakingProduceButton = element(by.css('#m_1'));
        nonLeakingProduceButton.click();
    }


    xit('should increase the memory consumption'/* when recreating leaking directive multiple times*/, function () {
        var iterations = 50;
        //Set A Baseline for memory consumption
        browser.sleep(1000);

        var that = this;
        var leakProduceButton = element(by.css('#leakProducer'));

        browser.get('#/memoryTest', 30000).then(function () {
            sgpt.memory.runTestFunction(that, iterations, function (i) {
                if (i % 10 === 0) {
                    // Every ten iterations update the label
                    msg(browser, 'Button click iteration ' + i, undefined, 0);
                }
                    leakFunction();
                },  // pass in override for default options
                {
                    preTestInitFunction: function () {
                        leakFunction();
                    }});
        });

    }, itTimeout);

    it('should not increase the memory consumption'/* when recreating non-leaking directive multiple times*/, function () {
        var iterations = 250;
        //Set A Baseline for memory consumption
        browser.sleep(1000);

        var that = this;
        var nonLeakingProduceButton = element(by.css('#m_1'));

        browser.get('#/memoryTest', 30000).then(function () {
            sgpt.memory.runTestFunction(that, iterations, function (i) {
                if (i % 10 === 0) {
                    // Every ten iterations update the label
                    msg(browser, 'Button click iteration ' + i, undefined, 0);
                }
                    nonLeakFunction();
                },  // pass in override for default options
                {
                    preTestInitFunction: function () {
                        nonLeakFunction();
                    }});
        });

    }, itTimeout);
});
