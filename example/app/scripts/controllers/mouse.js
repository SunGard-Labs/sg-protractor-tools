'use strict';

/**
 * @ngdoc function
 * @name exampleApp.controller:mouseCtrl
 * @description
 * # MouseCtrl
 * Controller of the exampleApp
 */
angular.module('exampleApp')
    .controller('MouseCtrl', function ($scope) {
        $scope.msg = '';

        $scope.handleDrop = function (dragElem, dropTarget) {
            $scope.msg = dragElem + ' landed in ' + dropTarget;
        };
    });
