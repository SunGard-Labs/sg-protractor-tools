'use strict';

/**
 * @ngdoc function
 * @name exampleApp.controller:ConsoleCtrl
 * @description
 * # MouseCtrl
 * Controller of the exampleApp
 */
angular.module('exampleApp')
    .controller('ConsoleCtrl', function ($scope) {

        $scope.logError = function() {
            console.error("An Error is logged");
        };
        $scope.logMessage = function() {
            console.log("A message is logged");
        };
    });
