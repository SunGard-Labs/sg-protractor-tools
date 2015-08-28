// In your test suite, use this code to include the test library.
// var sgpt = require('sg-protractor-tools');

// Using the local version of the code from this project.
var sgpt = require('../../../');

/**
 * Note: Do not run both test cases simultaneously, as even after page reload memory consumption might be influenced
 * from previous pages. This might falsify the results.
 * Best results with memory measurement will be revealed when running this test suite using ddescribe() and
 * only one test case by commenting the other one(s) using xit().
 */
describe('Demonstrate the use of memory measuring tool', function () {
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

    it('should increase the memory consumption when invoking a leaking function', function () {
        var iterations = 250;
        browser.sleep(1000);

        var that = this;

        browser.get('#/memoryTest', 30000).then(function () {
            sgpt.memory.runTestFunction(that, iterations, function (i) {
                    if (i % 10 === 0) {
                        // Every ten iterations update the label
                        msg(browser, 'Button click iteration ' + i, undefined, 0);
                    }
                    leakFunction();
                },
                // pass in override for default options
                {
                    preTestInitFunction: function () {
                        leakFunction();
                    }
                }
            );
        });
    }, itTimeout);

    xit('should not increase the memory consumption when invoking a non-leaking function', function () {
        var iterations = 250;
        //Set A Baseline for memory consumption
        browser.sleep(1000);

        var that = this;

        browser.get('#/memoryTest', 30000).then(function () {
            sgpt.memory.runTestFunction(that, iterations, function (i) {
                    if (i % 10 === 0) {
                        // Every ten iterations update the label
                        msg(browser, 'Button click iteration ' + i, undefined, 0);
                    }
                    nonLeakFunction();
                },
                // pass in override for default options
                {
                    preTestInitFunction: function () {
                        nonLeakFunction();
                    }
                }
            );
        });
    }, itTimeout);
});
