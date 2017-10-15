'use strict';

/**
 * @ngdoc function
 * @name stockDogApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the stockDogApp
 */
angular.module('stockDogApp')
  .controller('MainCtrl', function ($scope, $location, WatchlistService) {
    // 1. 为动态导航链接填充监视列表
    $scope.watchlists = WatchlistService.query();

    // 2. 将$location.path() 函数用作$watch表达式
    $scope.$watch(function () {
      return $location.path();
    }, function (path) {
      if (_.contains(path, 'watchlist')) {
        $scope.activeView = 'watchlist';
      } else {
        $scope.activeView = 'dashboard';
      }
    });
    // $scope.$watch($location.path(), function (path) {
    //   if (_.contains(path, 'watchlist')) {
    //     $scope.activeView = 'watchlist';
    //   } else {
    //     $scope.activeView = 'dashboard';
    //   }
    // });
  });


