describe('Testing protractor scrolling function', function () {
	
	// Using the local version of the code from this project.
    var sgpt = require('../../../');
    // In your test suite, use this code to include the test library.
    // var sgpt = require('sg-protractor-tools');

    var webDriver = browser.driver;
	// go to the right page, and set the size of the browser
	sgpt.resize.setViewportSize(800,600);
	browser.get('#/scroll');
	// initializing test parameters
	var ORIGINAL_CONTENT = 'Hello World';
	var CHANGED_CONTENT = 'Goodbye World';
	// input queries
	var BUTTON_CONTAINER_QUERY = 'div[id="paddedButtonContainer"]';
	var BUTTON_QUERY = 'input[id="btn_1"]';
	var BUTTON_OBSTRUCTOR_QUERY = 'div.button-obstructor';
	
	var BUTTON_EXPLAIN_QUERY = '.explanation-message';
	
	// get the messager function
	var msg = sgpt.messager.msg;

    beforeEach(function () {
		// nothing to see here...
    });
	
	afterEach(function() {
		sgpt.messager.logErrors(browser,msg);
	});

    var moveAndClickMouse = function(element, posX, posY){
        webDriver.actions().
			mouseMove(element,{x: posX, y: posY}).
			mouseDown().
			mouseUp().
			perform();
    }
	
	/* WHAT ARE WE TESTING:
	*
	* To test the scroll feature we setup a scenario where a button's position starts off the page. 
	* (When clicked successfully, the button changes the content of the opaque layer from hello world, to goodbye world)
	* we scroll the button into the page area, but behind an opaque div. This proves that obscured items are still unclickable.
	*
	*/
	
	it(msg(browser,'should scroll the button into view and click on it successfully'), function () {
		msg(browser,'3.1) Scrolling the button into view..');
        var goodbyeButton = element(by.css(BUTTON_QUERY));
        // we first verify that the content in the obstructor div has not changed
        expect(element(by.css(BUTTON_OBSTRUCTOR_QUERY)).getText()).toBe(ORIGINAL_CONTENT);		
		// scroll to make button visible 
        sgpt.scroll.scrollTo(goodbyeButton);
		msg(browser,'3.2) Now attempting to click the button..');
        // click on the now visible button
        moveAndClickMouse(goodbyeButton, 5, 5);
		msg(browser,'3.3) Button clicked, the message should now read "Goodbye World"');
		// the click should now have worked so we expect the obstructor test to have changed
        expect(element(by.css(BUTTON_OBSTRUCTOR_QUERY)).getText()).toBe(CHANGED_CONTENT);        
    });
	
});
