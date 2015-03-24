'use strict';

/**
 * @ngdoc directive
 * @name exampleApp.directive:memoryDirective
 * @description
 * # memoryDirective
 */
angular.module('exampleApp')
    .directive('memoryDirective', function () {

        return {
            template: '<div id="memoryDiv">' +
                '<H1>Test Text</H1>' +
                '<input type="text" name="Input" ng-model="m.textinput">' +
                '<br><span >{{m.textinput}}</span>' +
                '</div>',
            restrict: 'E',
            replace: true,
            link: function postLink(scope, element, attrs) {


                if (!scope.$parent.leak) {
                    scope.$parent.leak = [];
                }

                for (var i; i < 100; i++ ) {
                    var dom = angular.element('#lorem');
                    scope.$parent.leak.push(dom);
                }

                if (attrs.leak === 'false') {
                    console.log("Set the leaking variable" + attrs.leak);
                    dom = undefined;
                }
                scope.$on('$destroy', function (destroy) {
                    console.log("Destroy Called");
                });
            }
        };
    });
