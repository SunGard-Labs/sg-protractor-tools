'use strict';

// Default viewport size used when running protractor tests
var defaultSize = {width: 1200, height: 700};

/**
 * Set the browser window size to the given pixels
 * @param width Width of the browser window
 * @param height Height of the browser window
 * @returns {!webdriver.promise.Promise.<void>} Promise to be resolved after the window has been resized
 */
module.exports.setWindowSize = function (width, height) {
    return browser.driver.manage().window().setSize(width, height);
};

/**
 * Convenience function to get the current window size
 * @returns {!webdriver.promise.Promise.<{width: number, height: number}>} Promise to be resolved with {width: number, height: number} containing the current browser size
 */
module.exports.getWindowSize = function () {
    return browser.driver.manage().window().getSize();
};

/**
 * Set the viewport area of the browser to the given amount of pixels.
 * This method takes sizes of navigation bars and similar into account and adjusts the browser window
 * accordingly to ensure the given size for the content.
 * @param width Width of the browser viewport
 * @param height Height of the browser viewport
 * @returns {promise}
 */
module.exports.setViewportSize = function (width, height) {
    var d = protractor.promise.defer();
    var windowSizePromise = module.exports.getWindowSize();
    var browserUISizePromise = module.exports.getViewportSize();

    protractor.promise.fullyResolved([windowSizePromise, browserUISizePromise]).then(function (sizes) {
        var windowSize = sizes[0];
        var viewportSize = sizes[1];
        // Calculate the difference between viewport and window height/width
        var deltaHeight = windowSize.height - viewportSize.height;
        var deltaWidth = windowSize.width - viewportSize.width;
        d.fulfill(module.exports.setWindowSize(width + deltaWidth, height + deltaHeight));
    });
    return d.promise;
};

/**
 * Get the current size of the browser viewport.
 * Viewport is the actual area of the browser window that displays content. Height and width
 * of navigation bars and similar elements get subtracted.
 * @returns {!webdriver.promise.Promise.<{width: number, height: number}>} Promise to be resolved with {width: number, height: number} containing the current viewport size
 */
module.exports.getViewportSize = function () {
    var viewportSizesJs = 'return {height: window.document.documentElement.clientHeight, width: window.document.documentElement.clientWidth}';
    return browser.driver.executeScript(viewportSizesJs);
};

/**
 * Reset the browser viewport to 1200x700 pixels
 * @returns {promise|*} Promise to be resolved after the window got resized
 */
module.exports.reset = function () {
    return module.exports.setViewportSize(defaultSize.width, defaultSize.height);
};

/**
 * Manipulate the default viewport size, the browser gets resized to initially and when calling resize.reset()
 * @param width Width of the browser viewport
 * @param height Height of the browser viewport
 */
module.exports.setDefaultSize = function (width, height) {
    defaultSize = {
        width: width,
        height: height
    };
};
