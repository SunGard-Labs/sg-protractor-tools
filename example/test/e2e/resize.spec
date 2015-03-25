describe('Testing protractor resize function', function () {

    // In your test suite, use this code to include the test library.
    // var sgpt = require('sg-protractor-tools');

    // Using the local version of the code from this project.
    var sgpt = require('../../../');

    var webDriver = browser.driver;

    // get the messager function
    var msg = sgpt.messager.msg;

    beforeEach(function () {
		// go to the right page, and set the size of the browser
		sgpt.resize.setViewportSize(800,600);
        browser.get('#/home');
		sgpt.messager.repositionMessager(sgpt.messager.TOP_RIGHT);
    });

    afterEach(function() {
        sgpt.messager.logErrors(browser,msg);
    });

    it('should display responsive menu when browser is resized to certain width ', function () {
		msg(browser,'should display responsive menu when browser is resized to certain width ');
		
        //verify responsive menu is not displayed
        msg(browser,'Step 1) Verify responsive menu is not displayed..');
        expect(element(by.css('button.navbar-toggle')).isDisplayed()).toBeFalsy();
        //resize
        msg(browser,'Step 2) Resize..');
        sgpt.resize.setViewportSize(544,650);
		sgpt.messager.repositionMessager(sgpt.messager.BOTTOM_RIGHT);

        //verify responsive menu is displayed
        msg(browser,'Step 3) Verify responsive menu is displayed..');
        expect(element(by.css('button.navbar-toggle')).isDisplayed()).toBeTruthy();

        //verify resize link not displayed.
        msg(browser,'Step 4) Verify resize link not displayed..');
        expect(element(by.css('a[id="resizeLink"]')).isDisplayed()).toBeFalsy();

        //access resize view view responsive menu.
        msg(browser,'Step 5) Access resize view view responsive menu..');
        element(by.css('button.navbar-toggle')).click();
        browser.waitForAngular();
        //click resize menu item
        msg(browser,'Step 6) Click resize menu item..');
        var resize = element(by.css('a[id="resizeLink"]'));
        resize.click();

        //verify resize view is open
        browser.sleep(2000);

        msg(browser,'Step 7) verify resize view is open..');
        var resizeViewText = element(by.css('p[id="resizeViewText"]'));
        expect(resizeViewText.getText()).toBe('This is the resize view.');
    }, 30000);
});
