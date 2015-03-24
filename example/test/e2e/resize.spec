describe('Testing protractor resize function', function () {

    // In your test suite, use this code to include the test library.
    // var sgpt = require('sg-protractor-tools');

    // Using the local version of the code from this project.
    var sgpt = require('../../../');

    var webDriver = browser.driver;

    beforeEach(function () {
        browser.get('#/home');
    });

    it('should display responsive menu when browser is resized to certain width ', function () {

          //verify responsive menu is not displayed
          expect(element(by.css('button.navbar-toggle')).isDisplayed()).toBeFalsy();
          //resize
          sgpt.resize.setViewportSize(544,850);

          //verify responsive menu is displayed
          expect(element(by.css('button.navbar-toggle')).isDisplayed()).toBeTruthy();

          //verify resize link not displayed.

          //access resize view view responsive menu.
          element(by.css('button.navbar-toggle')).click();
          browser.waitForAngular();
          //click resize menu item
          var resize = element(by.css('a[id="resizeLink"]'));
          resize.click();

          //verify resize view is open
          browser.sleep(2000);

          var resizeViewText = element(by.css('p[id="resizeViewText"]'));
          expect(resizeViewText.getText()).toBe('This is the resize view.');
    });
});
