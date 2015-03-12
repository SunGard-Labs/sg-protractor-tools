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
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      })
      .when('/scroll', {
        templateUrl: 'views/scroll.html',
        controller: 'ScrollCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
