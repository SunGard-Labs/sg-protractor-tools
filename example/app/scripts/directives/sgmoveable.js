'use strict';

/**
 * @ngdoc directive
 * @name exampleApp.directive:sgMoveable
 * @description
 * # sgMoveable
 */
angular.module('exampleApp')
    .directive('sgMoveable', function ($document) {
        return {
            restrict: 'A',
            link: function postLink(scope, element) {
                var startX = 0, startY = 0, x = 0, y = 0;
                element.css('position', 'absolute');

                element.on('mousedown', function(event) {
                    // Prevent default dragging of selected content
                    event.preventDefault();
                    startX = event.pageX - x;
                    startY = event.pageY - y;
                    $document.on('mousemove', mousemove);
                    $document.on('mouseup', mouseup);
                });

                function mousemove(event) {
                    y = event.pageY - startY;
                    x = event.pageX - startX;
                    element.css({
                        top: y + 'px',
                        left:  x + 'px'
                    });
                }

                function mouseup() {
                    $document.off('mousemove', mousemove);
                    $document.off('mouseup', mouseup);
                }
            }
        };
    });
