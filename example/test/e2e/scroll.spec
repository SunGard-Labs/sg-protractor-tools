describe('Testing protractor scrolling function', function () {

    // In your test suite, use this code to include the test library.
    // var sgpt = require('sg-protractor-tools');

    // Using the local version of the code from this project.
    var sgpt = require('../../../');

    var webDriver = browser.driver;

    beforeEach(function () {
        sgpt.resize.setViewportSize(1100,850);
        browser.get('#/scroll');
    });

    var moveAndClickMouse = function(element, posX, posY){
        webDriver.actions().
			mouseMove(element,{x: posX, y: posY}).
			mouseDown().
			mouseUp().
			perform();
    }
    
    it('button should only be clickable after using the scroll function to scroll to it', function () {
        var testButton = element(by.css('input[id="btn_1"]'));

        browser.isElementPresent(testButton);

        expect(element(by.css('div.button-obstructor')).getText()).toBe('Hello World');
        
        moveAndClickMouse(testButton, 5, 5);
         
        //Make sure that without scrolling button cannot be clicked
        expect(element(by.css('div.button-obstructor')).getText()).toBe('Hello World');
         
        //Scroll to make button visible 
        sgpt.scroll.scrollTo(testButton);
        
        moveAndClickMouse(testButton, 5, 5);

        expect(element(by.css('div.button-obstructor')).getText()).toBe('Goodbye World');        
       
    });
});
