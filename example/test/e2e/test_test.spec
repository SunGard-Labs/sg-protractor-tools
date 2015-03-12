describe('scrolling test', function () {
    // In your test suite, use this code to include the test library.
    // var sgpt = require('sg-protractor-tools');

    // Using the local version of the code from this project.
    var sgpt = require('../../../');

    var webDriver = browser.driver;

    beforeEach(function () {
        browser.get('#/scroll');
    });

    it('should scroll', function () {
        var testButton = element(by.css('input[id="harryswand"]'));

        browser.isElementPresent(testButton);

        testButton.click();

        expect(testButton.isDisplayed()).toBeFalsy();

        sgpt.scroll.scrollTo(testButton);

        expect(testButton.isDisplayed()).toBeTruthy();
    });
});
