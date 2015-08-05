'use strict';

/**
 * @ngdoc directive
 * @name exampleApp.directive:draggable
 * @description
 * # draggable directive to implement drag-and-drop with native html5 support
 */
angular.module('exampleApp').directive('draggable', function() {
    return function(scope, element) {
        // this gives us the native JS object
        var el = element[0];

        el.draggable = true;

        element.mousedown(function(){

        });

        el.addEventListener('dragstart', function(e) {
                e.dataTransfer.effectAllowed = 'move';
                e.dataTransfer.setData('Text', this.id);
                this.classList.add('drag');
                return false;
            },
            false
        );

        el.addEventListener('dragend', function() {
                this.classList.remove('drag');
                return false;
            },
            false
        );
    };
});
