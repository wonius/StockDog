'use strict';

/**
 * @ngdoc directive
 * @name stockDogApp.directive:stkSignColor
 * @description
 * # stkSignColor
 */
angular.module('stockDogApp')
  .directive('stkSignColor', function () {
    return {
      restrict: 'A',
      link: function postLink($scope, $element, $attrs) {
        //1. 使用$observe监视表达式的变化
        $attrs.$observe('stkSignColor', function (newVal) {   //监视标签的值
          var newSign = parseFloat(newVal);
          //2. 根据符号设置元素的sytle.color值
          if (newSign > 0) {
            $element[0].style.color = 'Red';
          } else {
            $element[0].style.color = 'Green';
          }
        });
      }
    };
  });
