'use strict';

/**
 * @ngdoc function
 * @name exampleApp.controller:memoryCtrl
 * @description
 * # AboutCtrl
 * Controller of the exampleApp
 */
angular.module('exampleApp')
    .controller('MemoryCtrl', function ($scope, $compile) {
        $scope.produceNonLeaking = function () {
            angular.element('#memoryContainer').html($compile('<memory-directive leak="false"></memory-directive>')($scope));
        };

        $scope.produceLeak = function () {
            angular.element('#memoryContainer').html($compile('<memory-directive leak="true"></memory-directive>')($scope));
        };
    });
