'use strict';

describe('Directive: sgMoveable', function () {

  // load the directive's module
  beforeEach(module('exampleApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<sg-moveable></sg-moveable>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the sgMoveable directive');
  }));
});
