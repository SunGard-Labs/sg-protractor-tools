ddescribe('Demomstrate the memory measuring tool', function () {

    // In your test suite, use this code to include the test library.
    // var sgpt = require('sg-protractor-tools');

    // Using the local version of the code from this project.
    var sgpt = require('../../../');

    var webDriver = browser.driver;

    beforeEach(function () {
        sgpt.resize.setViewportSize(1100,850);
        browser.get('#');
    });

    // Set to a high value to avoid timeout by Protractor for this it test.
    var itTimeout = 100000;

    var testOptions = {
        initialPostGcSleep: 5000,
        finalPostTestSleep: 1500,
        finalPostGcSleep: 5000,
        writeLogFile: true,
        writeCsvFile: true,
        generateGraph: true,
        preTestInitFunction: function() {
            clickAdd();
        },
        postTestCompleteFunction: undefined
    };

    var clickAdd = function() {
        element(by.css('#m_1')).click();
    }

    var clickRemove= function() {
        element(by.css('#m_2')).click();
    }

    it('should keep the memory consumption consistant', function () {
        var iterations = 250;
        //Set A Baseline for memory consumption
        browser.sleep(1000);
        //this.description = "Memory Test to isolate memory leak on opening tabs with switching";

        var that = this;
        browser.get("#/memoryTest", 30000).then(function() {
            sgpt.memory.runTestFunction(that, iterations, function () {
                clickRemove();
            }, testOptions);
        });

    }, itTimeout);


});