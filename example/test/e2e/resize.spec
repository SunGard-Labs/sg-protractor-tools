describe('Testing protractor resize function', function () {

    // In your test suite, use this code to include the test library.
    // var sgpt = require('sg-protractor-tools');

    // Using the local version of the code from this project.
    var sgpt = require('../../../');

    var webDriver = browser.driver;

    beforeEach(function () {
        browser.get('#/home');
    });


    //TODO get test to pass
    xit('should display responsive menu when browser is resized to certain width ', function () {

          //verify responsive menu is not displayed
          expect(element(by.css('button.navbar-toggle')).isDisplayed()).toBeTruthy();
          //resize
          sgpt.resize.setViewportSize(544,850);

          //verify responsive menu is displayed
          expect(element(by.css('button.navbar-toggle')).isDisplayed()).toBeFalsy();

          //verify resize link not displayed.

          //access resize view view responsive menu.
          element(by.css('button.navbar-toggle')).click();

          //click resize menu item
          var resize = element(by.linkText('Resize Example'));
          resize.click();

          //verify resize view is open
    });
});
