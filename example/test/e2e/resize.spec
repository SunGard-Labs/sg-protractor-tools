// In your test suite, use this code to include the test library.
// var fispt = require('sg-protractor-tools');

// Using the local version of the code from this project.
var fispt = require('../../../');

describe('Testing protractor resize function', function () {

    var webDriver = browser.driver;

    // Get the messager object to display current test execution status inside the browser
    var msg = fispt.messager.msg;


    // Before each test, set the viewport size to 800x600px, so we always start at the same baseline
    beforeEach(function () {
        // go to the right page, and set the size of the browser
        fispt.resize.setViewportSize(800, 600);
        browser.get('#/home');
        fispt.messager.repositionMessager(fispt.messager.TOP_RIGHT);
    });

    afterEach(function () {
        fispt.messager.logErrors(browser, msg);
    });

    it('should display responsive menu when browser is resized to certain width ', function () {
        msg(browser, 'should display responsive menu when browser is resized to certain width ');

        // Verify responsive menu is not displayed
        msg(browser, 'Step 1) Verify responsive menu is not displayed..');
        expect(element(by.css('button.navbar-toggle')).isDisplayed()).toBeFalsy();

        // Resize the browser
        msg(browser, 'Step 2) Resize..');
        fispt.resize.setViewportSize(544, 650);
        fispt.messager.repositionMessager(fispt.messager.BOTTOM_RIGHT);

        // Verify responsive menu is displayed
        msg(browser, 'Step 3) Verify responsive menu is displayed..');
        expect(element(by.css('button.navbar-toggle')).isDisplayed()).toBeTruthy();

        // Verify resize link not displayed.
        msg(browser, 'Step 4) Verify resize link not displayed..');
        expect(element(by.css('a[id="resizeLink"]')).isDisplayed()).toBeFalsy();

        // Access resize view responsive menu.
        msg(browser, 'Step 5) Access resize view responsive menu..');
        element(by.css('button.navbar-toggle')).click();
        browser.waitForAngular();

        // Click resize menu item
        msg(browser, 'Step 6) Click resize menu item..');
        var resize = element(by.css('a[id="resizeLink"]'));
        resize.click();

        // Verify resize view is open
        browser.sleep(2000);
        msg(browser, 'Step 7) verify resize view is open..');
        var resizeViewText = element(by.css('p[id="resizeViewText"]'));
        expect(resizeViewText.getText()).toBe('This is the resize view.');
    }, 30000);
});
