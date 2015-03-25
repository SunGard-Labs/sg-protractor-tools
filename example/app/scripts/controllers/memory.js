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
        $scope.add = function () {
            angular.element("#memoryContainer").html($compile('<memory-directive leak="false"></memory-directive>')($scope));
            console.log('add');
        };

        $scope.remove = function () {
            angular.element("#memoryContainer").html($compile('<memory-directive leak="true"></memory-directive>')($scope));
            console.log('remove');
        };

        $scope.produceLeak = function (){
            angular.element("#memoryContainer").html($compile('<memory-directive leak="true" leak-type="plain"></memory-directive>')($scope));
        }
    });
