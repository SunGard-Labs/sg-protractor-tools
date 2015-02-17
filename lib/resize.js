'use strict';

// Default viewport size used when running protractor tests
var defaultSize = {width: 1200, height: 700};

module.exports.setWindowSize = function(width, height) {
    return browser.driver.manage().window().setSize(width, height);
};

module.exports.getWindowSize = function(){
    return browser.driver.manage().window().getSize();
};

module.exports.setViewportSize = function(width, height) {
    var d = protractor.promise.defer();
    var windowSizePromise = module.exports.getWindowSize();
    var browserUISizePromise = module.exports.getViewportSize();

    protractor.promise.fullyResolved([windowSizePromise, browserUISizePromise]).then(function(sizes){
        var windowSize = sizes[0];
        var viewportSize = sizes[1];
        // Calculate the difference between viewport and window height/width
        var deltaHeight = windowSize.height - viewportSize.height;
        var deltaWidth = windowSize.width - viewportSize.width;
        d.fulfill(module.exports.setWindowSize(width + deltaWidth, height + deltaHeight));
    });
    return d.promise;
};

module.exports.getViewportSize = function(){
    var viewportSizesJs = 'return {height: window.document.documentElement.clientHeight, width: window.document.documentElement.clientWidth}';
    return browser.driver.executeScript(viewportSizesJs);
};

module.exports.reset = function(){
    return module.exports.setViewportSize(defaultSize.width, defaultSize.height);
};

module.exports.setDefaultSize = function(width, height) {
    defaultSize = {
        width: width,
        height: height
    };
};
