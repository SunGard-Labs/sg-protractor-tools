'use strict';

/**
 * @ngdoc directive
 * @name exampleApp.directive:memoryDirective
 * @description
 * # memoryDirective
 */
angular.module('exampleApp')
    .directive('memoryDirective', function ($document) {

        function randomString(length, alpha, numeric) {
            var chars = '';
            if (alpha) {
                chars += 'ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz';
            }
            if (numeric) {
                chars += '0123456789'
            }
            var randomstring = '';
            for (var i = 0; i < length; i++) {
                var rnum = Math.floor(Math.random() * chars.length);
                randomstring += chars.substring(rnum, rnum + 1);
            }
            return randomstring;
        }

        function randomNumber(min, max) {
            return Math.random() * (max - min) + min;
        }

        function polluteObject(object, pollutionLevel, flat) {
            for (var i = 0; i < pollutionLevel * 10; i++) {
                if (flat) {
                    object[randomString(randomNumber(5, 10), true, false)] = randomString(randomNumber(5, 10), true, true);
                } else {
                    object[randomString(randomNumber(5, 10), true, false)] = polluteObject({}, 3, true);
                }
            }
            return object;
        }

        return {
            template: '<div class="memoryLeakDiv">' +
                '<p>Memory Directive (scope.$id: {{ $id }})</p>' +
                '<p class="alert alert-success" ng-if="!leaking">This directive does not leak memory!</p>' +
                '<p class="alert alert-danger" ng-if="leaking">This directive is leaking memory!</p>' +
                '<input type="text" name="Input" ng-model="m.textinput" class="form-control" >' +
                '<span>{{m.textinput}}</span>' +
                '</div>',
            restrict: 'E',
            scope: true,
            replace: true,
            link: function postLink(scope, element, attrs) {
                scope.leaking = attrs.leak !== 'false';
                    if (scope.leaking && attrs.leakType === 'plain') {
                        // Source: http://www.toptal.com/javascript/10-most-common-javascript-mistakes#common-mistake-3-creating-memory-leaks
                        var theThing = null;
                        var replaceThing = function () {
                            var priorThing = theThing;  // hold on to the prior thing
                            var unused = function () {
                                // 'unused' is the only place where 'priorThing' is referenced,
                                // but 'unused' never gets invoked
                                if (priorThing) {
                                    console.log('hi');
                                }
                            };
                            theThing = {
                                longStr: new Array(1000000).join('*'),  // create a 1MB object
                                someMethod: function () {
                                    console.log('some message');
                                }
                            };
                            for (var i = 0; i < 10; i++) {
                                replaceThing();
                            }
                        };
                    } else {
                        for (var i = 0; i < 10; i++) {
                            polluteObject(scope, 10, false);
                        }

                        scope.counter = 0;

                        $document.on('click.' + scope.$id, function () {
                            // Random event listener that keeps the reference
                            // to the current scope alive
                            // We do not unregister this listener
                            scope.counter++;
                        });
                    }


                scope.$on('$destroy', function (destroy) {
                    document.off('click.' + scope.$id);
                    console.log('Scope Destroy Called');
                });

                element.on('$destroy', function (destroy) {
                    scope.$destroy();
                    // Destroy the scope when the element gets removed
                    // Otherwise our scope cleanup will only take place when we navigate away from the
                    // current ngRoute path
                    console.log("Elemenet Destroy Called");
                });
            }
        };
    });
