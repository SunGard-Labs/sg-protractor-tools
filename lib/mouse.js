'use strict';

module.exports.drag = function(from, to) {
    browser.actions().
        mouseMove(from).
        mouseDown().
        mouseMove(to).
        mouseUp().
        perform();
};
