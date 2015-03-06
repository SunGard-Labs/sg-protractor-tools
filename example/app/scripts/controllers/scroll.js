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
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
