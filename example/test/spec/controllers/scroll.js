'use strict';

describe('Controller: ScrollCtrl', function () {

  // load the controller's module
  beforeEach(module('exampleApp'));

  var ScrollCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ScrollCtrl = $controller('ScrollCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
