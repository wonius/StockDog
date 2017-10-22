'use strict';

describe('Directive: stkStockTabble', function () {

  // load the directive's module
  beforeEach(module('stockDogApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<stk-stock-tabble></stk-stock-tabble>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the stkStockTabble directive');
  }));
});
