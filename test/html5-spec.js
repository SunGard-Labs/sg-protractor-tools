'use strict';

var expect = require('expect.js');
var html5 = require('..');

describe('HTML5 Package', function () {
    it('should return an object that is not empty', function () {
        expect(html5).to.not.be.empty();
    });

    it('should contain entries for scroll, resize and memory', function () {
        expect(html5.scroll.scrollTo).to.be.a('function');
        expect(html5.resize.setWindowSize).to.be.a('function');
        expect(html5.resize.getWindowSize).to.be.a('function');
        expect(html5.resize.setViewportSize).to.be.a('function');
        expect(html5.resize.getViewportSize).to.be.a('function');
        expect(html5.resize.reset).to.be.a('function');
        expect(html5.memory.measureMemory).to.be.a('function');
    });
});
