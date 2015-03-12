'use strict';

/**
 * @ngdoc function
 * @name exampleApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the exampleApp
 */
angular.module('exampleApp')
  .controller('AboutCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
