'use strict';

/**
 * @ngdoc overview
 * @name exampleApp
 * @description
 * # exampleApp
 *
 * Main module of the application.
 */
angular
    .module('exampleApp', [
        'ngAnimate',
        'ngCookies',
        'ngResource',
        'ngRoute',
        'ngSanitize',
        'ngTouch'
    ])
    .config(function ($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'views/main.html',
                controller: 'MainCtrl'
            })
            .when('/scroll', {
                templateUrl: 'views/scroll.html',
                controller: 'ScrollCtrl'
            })
            .when('/resize', {
                templateUrl: 'views/resize.html',
                controller: 'ResizeCtrl'
            })
            .when('/mouse', {
                templateUrl: 'views/mouse.html',
                controller: 'MouseCtrl'
            })
            .when('/dom', {
                templateUrl: 'views/dom.html',
                controller: 'DomCtrl'
            })
            .when('/consoleLogs', {
                templateUrl: 'views/consolelogs.html',
                controller: 'ConsoleCtrl'
            })
            .when('/memoryTest', {
                templateUrl: 'views/memoryview.html',
                controller: 'MemoryCtrl'
            }).otherwise({
                redirectTo: '/'
            });
    });
