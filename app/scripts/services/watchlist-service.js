'use strict';

/**
 * @ngdoc service
 * @name stockDogApp.WatchlistService
 * @description
 * # WatchlistService
 * Service in the stockDogApp.
 */
angular.module('stockDogApp')
  .service('WatchlistService', function WatchlistService() {
    //1.辅助方法：从localStorage中加载监视列表
    var loadModel = function () {
      var model = {
        watchlists: localStorage['StockDog.watchlists'] ? JSON.parse(localStorage['StockDog.watchlists']) : [],
        nextId: localStorage['StockDog.nextId'] ? parseInt(localStorage['StockDog.nextId']) : 0
      };
      return model;
    };

    //2.辅助方法： 将监视列表保存到localStorage
    var saveModel = function () {
      localStorage['StockDog.watchlists'] = JSON.stringify(Model.watchlists);
      localStorage['StockDog.nextId'] = Model.nextId;
    };

    //3.辅助方法： 使用lodash找到指定Id的监视列表
    var findById = function (listId) {
      return _.find(Model.watchlists, function (watchList) {
        return watchList.id === parseInt(listId);
      });
    };

    //4.返回所有监视列表，或按知道Id查找
    this.query = function (listId) {
      if (listId) {
        return findById(listId);
      } else {
        return Model.watchlists;
      }
    };

    //5.在监视列表中增加新的监视列表
    this.save = function (watchList) {
      watchList.id = Model.nextId++;
      Model.watchlists.push(watchList);
      saveModel();
    };

    //6.删除
    this.remove = function (watchList) {
      _.remove(Model.watchlists, function (list) {
        return list.id === watchList.id;
      });
      saveModel();
    };

    //7. 初始化模型
    var Model = new loadModel();
  });
