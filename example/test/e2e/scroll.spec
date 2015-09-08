// In your test suite, use this code to include the test library.
// var sgpt = require('sg-protractor-tools');

// Using the local version of the code from this project.
var sgpt = require('../../../');

describe('Testing protractor scrolling function', function () {

    var webDriver = browser.driver;

    // Get the messager object to display current test execution status inside the browser
    var msg = sgpt.messager.msg;

    beforeEach(function () {
        // Go to the right page
        browser.get('#/scroll');
        sgpt.messager.repositionMessager(sgpt.messager.TOP_RIGHT);
    });

    afterEach(function () {
        sgpt.messager.logErrors(browser, msg);
    });

    var moveAndClickMouse = function (element, posX, posY) {
        webDriver.actions().
            mouseMove(element, {x: posX, y: posY}).
            mouseDown().
            mouseUp().
            perform();
    };

    /* WHAT ARE WE TESTING:
     *
     * To test the scroll feature we setup a scenario where a button's position starts off the page.
     * (When clicked successfully, the button changes the content of the opaque layer from hello world, to goodbye world)
     * we scroll the button into the page area, but behind an opaque div. This proves that obscured items are still unclickable.
     *
     */
    it('should scroll the button into view and click on it successfully', function () {
        msg(browser, 'should scroll the button into view and click on it successfully');
        msg(browser, 'Step 1) Scrolling the button into view..');

        var goodbyeButton = element(by.css('input[id="btn_1"]'));

        // We first verify that the content in the obstructor div has not changed
        expect(element(by.css('div.button-obstructor')).getText()).toBe('Hello World');

        // Scroll to make button visible
        sgpt.scroll.scrollTo(goodbyeButton).then(function() {
            msg(browser, 'Step 2) Now attempting to click the button..');

            // Click on the now visible button
            moveAndClickMouse(goodbyeButton, 5, 5);
            msg(browser, 'Step 3) Button clicked, the message should now read "Goodbye World"');

            // The click should now have worked so we expect the obstructor test to have changed
            expect(element(by.css('div.button-obstructor')).getText()).toBe('Goodbye World');
        });
    }, 20000);

});
