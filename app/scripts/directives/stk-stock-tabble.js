'use strict';

/**
 * @ngdoc directive
 * @name stockDogApp.directive:stkStockTabble
 * @description
 * # stkStockTabble
 */
angular.module('stockDogApp')
  .directive('stkStockTabble', function () {
    return {
      template: '<div></div>',
      restrict: 'E',
      link: function postLink(scope, element, attrs) {
        element.text('this is the stkStockTabble directive');
      }
    };
  });
