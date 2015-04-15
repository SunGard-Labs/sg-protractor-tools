'use strict';

/**
 * Drags the `from` element to the location of the `to` element.
 * @param from element whose position to start drag operation at
 * @param to element whose position to stop drag operation at
 */
module.exports.drag = function (from, to) {
    browser.actions().
        mouseMove(from).
        mouseDown().
        mouseMove(to).
        mouseUp().
        perform();
};
