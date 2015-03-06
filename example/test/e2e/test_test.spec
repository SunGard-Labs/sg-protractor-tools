describe('scrolling test', function () {
    var html5 = require('html5-protractor-tools');
    var webDriver = browser.driver;
    beforeEach(function () {
        browser.get('#/scroll');
    });

    it('should scroll', function () {
        var testButton = element(by.css('input[id="harryswand"]'));
        browser.isElementPresent(testButton);
        testButton.click();
        expect(testButton.isDisplayed()).toBeFalsy();
        html5.scroll.scrollTo(testButton);
        expect(testButton.isDisplayed()).toBeTruthy();

    });
});
