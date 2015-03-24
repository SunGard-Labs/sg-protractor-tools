/*jshint multistr:true */
/**
 * @name sgMessager
 * @description Directive that displays specified messages in protractor tests.
 */
angular.module('exampleApp').directive('sgMessager', function () {
    'use strict';

    return {
		restrict: 'E',
		replace: true,
		template :  '<div class="{{ messageClasses }}">' +
						'<input type="button" value="-" ng-click="toggleMessageArea()" class="message-area-icons">' +
						'<input id="messageKey" type="text" ng-model="currentMessageKey" style="opacity:0;"><br>' +
						'{{ currentMessage }}<br>' +
						'<input id="errorMessage" type="text" ng-model="errorMessage" style="opacity:0;">' +
					'</div>',
        link: function (scope, element, attrs) {
            scope.showMessages = true;
			scope.styleState = '';
			scope.messageClasses = 'explanation-message';
			scope.currentMessageKey = 'default';
			scope.$watch('currentMessageKey',function(newValue){
				if (newValue !== undefined && newValue !== '') {
					scope.messageClasses = 'explanation-message';
					scope.currentMessage = scope.currentMessageKey;
				}
			});
			scope.errorMessage = '';
			scope.$watch('errorMessage',function(newValue){
				if (newValue !== undefined && newValue !== '') {
					// maybe do some formatting here
					scope.styleState = 'error';
					scope.messageClasses = 'explanation-message '+scope.styleState;
					scope.currentMessage = 'EXCEPTION THROWN:<br>' + newValue;
				}
			});
			scope.$watch('showMessages',function(newValue){
				if (newValue !== undefined && newValue === true) {
					// maybe do some formatting here
					scope.messageClasses = 'explanation-message '+scope.styleState;
				} else {
					scope.messageClasses = 'explanation-message '+scope.styleState+' reduced';
				}
			});
			scope.toggleMessageArea = function() {
				if (scope.showMessages === false) {
					scope.showMessages = true;
				} else {
					scope.showMessages = false;
				}
			};
        }
    };

});
