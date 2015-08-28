'use strict';

/**
 * @ngdoc function
 * @name exampleApp.controller:mouseCtrl
 * @description
 * # MouseCtrl
 * Controller of the exampleApp
 */
angular.module('exampleApp')
    .controller('DomCtrl', function ($scope, $timeout) {
        var STATUS = {READY: 'Ready...', HIDING: 'Hiding...', READY_SEEK: 'Ready for Seeking...', SEEKING: 'Seeking...'};

        $scope.msg = '';
        $scope.visible = true;
        $scope.gameStatus = STATUS.READY;
        $scope.gameRunning = false;

        function changeHideSeekStatus() {
            $scope.visible = !$scope.visible;
            $scope.gameRunning = false;
            if (!$scope.visible) {
                $scope.gameStatus = STATUS.READY_SEEK;
            } else {
                $scope.gameStatus = STATUS.READY;
            }
        }

        $scope.seek = function startSeekingIfAllHidden() {
            $scope.gameStatus = STATUS.SEEKING;
            $scope.gameRunning = true;
            $timeout(changeHideSeekStatus, 2000 + Math.floor(Math.random() * 3500));
        };

        $scope.start = function () {
            $scope.gameStatus = STATUS.HIDING;
            $scope.gameRunning = true;
            $timeout(changeHideSeekStatus, Math.floor(Math.random() * 3500));
        };
    });
