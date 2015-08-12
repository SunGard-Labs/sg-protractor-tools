'use strict';

/**
 * @ngdoc function
 * @name exampleApp.controller:ScrollCtrl
 * @description
 * # ScrollCtrl
 * Controller of the exampleApp
 */
angular.module('exampleApp')
    .controller('ScrollCtrl', function ($scope) {
        $scope.foo = function () {
            angular.element('div.button-obstructor').text('Goodbye World');
        };
    });
