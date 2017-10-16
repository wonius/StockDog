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

    // 使用额外的辅助函数增强股票
    var StockModel = {
      save: function () {
        var watchlist = findById(this.listId);
        watchlist.recalculate();
        saveModel();
      }
    };

    // 使用额外的负主函数增强监视列表
    var WatchlistModel = {
      addStock: function (stock) {
        var existingStock = _.find(this.stocks, function (s) {
          return s.company.symbol === stock.company.symbol;
        });

        if (existingStock) {
          existingStock.shares +=stock.shares;
        } else {
          _.extend(stock, StockModel);
          this.stocks.push(stock);
        }
        this.recalculate();
        saveModel();
      },

      removeStock: function (stock) {
        _.remove(this.stocks, function (s) {
          return s.company.symbbol === stock.company.symbol;
        });
        this.recalculate();
        saveModel();
      },

      recalculate: function () {
        var calcs = _.reduce(this.stocks, function (calcs, stock) {
          calcs.shares += stock.shares;
          calcs.marketValue += stock.marketValue;
          calcs.dayChange += stock.dayChange;
          return calcs;
        }, {shares: 0, marketValue: 0, dayChange: 0});

        this.shares = calcs.shares;
        this.marketValue = calcs.marketValue;
        this.dayChange = calcs.dayChange;
      }

    };


    //1.辅助方法：从localStorage中加载监视列表
    var loadModel = function () {
      var model = {
        watchlists: localStorage['StockDog.watchlists'] ? JSON.parse(localStorage['StockDog.watchlists']) : [],
        nextId: localStorage['StockDog.nextId'] ? parseInt(localStorage['StockDog.nextId']) : 0
      };

      _.each(model.watchlists, function (watchlist) {
        _.extend(watchlist, WatchlistModel);
        _.each(watchlist.stocks, function (stock) {
          _.extend(stock, StockModel);
        });
      });
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
    this.save = function (watchlist) {
      watchlist.id = Model.nextId++;
      watchlist.stocks = [];
      _.extend(watchlist, WatchlistModel);
      Model.watchlists.push(watchlist);
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
