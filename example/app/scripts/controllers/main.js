'use strict';

/**
 * @ngdoc function
 * @name exampleApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the exampleApp
 */
angular.module('exampleApp')
    .controller('MainCtrl', function ($scope) {
        var awesomeIcons = [
            'ok',
            'thumbs-up',
            'cloud',
            'screenshot',
            'fire'
        ];
        var i = 0;
        $scope.awesomeIcon = awesomeIcons[i];

        $scope.awesome = function () {
            i++;
            i = (i % awesomeIcons.length);
            $scope.awesomeIcon = awesomeIcons[i];
        };
    });
