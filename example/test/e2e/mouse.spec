// In your test suite, use this code to include the test library.
// var fispt = require('sg-protractor-tools');

// Using the local version of the code from this project.
var fispt = require('../../../');

describe('Testing protractor mouse function', function () {

    var webDriver = browser.driver;

    // Get the messager object to display current test execution status inside the browser
    var msg = fispt.messager.msg;

    beforeEach(function () {
        // Go to the right page
        browser.get('#/mouse');
        fispt.resize.reset();
        fispt.messager.repositionMessager(fispt.messager.TOP_RIGHT);
    });

    afterEach(function () {
        fispt.messager.logErrors(browser, msg);
    });

    it('should drag element with js drag-drop around', function () {
        msg(browser, 'should drag and drop elements around');

        var alerts = element(by.css('#alerts'));

        var yeomanjs = element(by.css('#yeomanjs'));
        var area52 = element(by.css('#area52'));
        var area51 = element(by.css('#area51'));
        var area50 = element(by.css('#area50'));

        expect(yeomanjs.getAttribute('style')).not.toContain('top');
        expect(yeomanjs.getCssValue('position')).toBe('absolute');

        msg(browser, 'Step 1) Moving yeoman into area50');
        fispt.mouse.drag(yeomanjs, area50);
        expect(yeomanjs.getAttribute('style')).toContain('top');
        expect(yeomanjs.getAttribute('style')).toContain('left');

        // Wait a little bit
        browser.sleep(1000);

        msg(browser, 'Step 2) Moving yeoman into area51');
        fispt.mouse.drag(yeomanjs, area51);
    }, 20000);

    xit('should drag element with html5 drag-drop around', function () {
        msg(browser, 'should drag and drop elements around');

        var alerts = element(by.css('#alerts'));

        var yeoman = element(by.css('#yeoman'));
        var area52 = element(by.css('#area52'));
        var area51 = element(by.css('#area51'));
        var area50 = element(by.css('#area50'));

        msg(browser, 'Step 1) Moving yeoman into area50');
        fispt.mouse.drag(yeoman, area50);
        expect(alerts.text()).toBe('yeoman landed in area50');

        msg(browser, 'Step 2) Moving yeoman into area51');
        fispt.mouse.drag(yeoman, area52);
        expect(alerts.text()).toBe('yeoman landed in area52');
    }, 20000);

});
