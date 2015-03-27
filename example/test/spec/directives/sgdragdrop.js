'use strict';

describe('Directive: sgDragDrop', function () {

  // load the directive's module
  beforeEach(module('exampleApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<sg-drag-drop></sg-drag-drop>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the sgDragDrop directive');
  }));
});
