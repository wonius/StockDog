'use strict';

/**
 * @ngdoc directive
 * @name stockDogApp.directive:stkWatchlistPanel
 * @description
 * # stkWatchlistPanel
 */
angular.module('stockDogApp')
  //1. 注册指令、注入依赖
  .directive('stkWatchlistPanel', function ($routeParams, $location, $modal, WatchlistService) {
    return {
      templateUrl: 'views/templates/watchlist-panel.html',
      restrict: 'E',
      scope: true,
      link: function ($scope) {
        $scope.hello = "hello";
        //2. 初始化不变量
        $scope.watchlist = {};
        var addListModal = $modal({
          scope: $scope,
          template: 'views/templates/addlist-modal.html',
          show: false
        });

        //3. 将服务中的模型绑定到该作用域
        $scope.watchlists = WatchlistService.query();

        //4. 显示addlist modal
        $scope.showModal = function () {
          addListModal.$promise.then(addListModal.show);
        };

        //5. 根据模态框中的字段创建一个新的列表
        $scope.createList = function () {
          WatchlistService.save($scope.watchlist);
          addListModal.hide();
          $scope.watchlist = {};
        };

        //6. 删除目标列表并重定向值主页
        $scope.deleteList = function (list) {
          WatchlistService.remove(list);
          $location.path('/');
        };

        $scope.currentList = $routeParams.listId;
        $scope.gotoList = function (listId) {
          $location.path('watchlist/'+listId);
        };

      }
    };
  });
