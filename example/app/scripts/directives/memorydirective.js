'use strict';

/**
 * @ngdoc directive
 * @name exampleApp.directive:memoryDirective
 * @description
 * # memoryDirective
 */
angular.module('exampleApp')
    .directive('memoryDirective', function () {
        return {
            controller: {},
                template: '<div>' +
                            '<input type="text" name="Input" ng-model="m.textinput"></input>' +
                            '<span >{{m.textinput}}</span>' +
                           '</div>',
            restrict: 'E',
            link: function postLink(scope, element, attrs) {
                element.text('this is the memoryDirective directive');
            }
        };
    });
