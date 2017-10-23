'use strict';

/**
 * @ngdoc service
 * @name stockDogApp.QuoteService
 * @description
 * # QuoteService
 * Service in the stockDogApp.
 */
angular.module('stockDogApp')
  .service('QuoteService', function QuoteService($http, $interval) {
    var stocks = [];
    // var BASE = 'http://query.yahooapis.com/v1/public/yql';
    var BASE = 'https://query.yahooapis.com/v1/public/yql';

    // 1. 使用来自报价的适当数据更新股票模型
    var update = function (quotes) {
      console.log(quotes);
      if (quotes.length === stocks.length) {
        _.each(quotes, function (quote, idx) {
          var stock = stocks[idx];
          stock.lastPrice = parseFloat(quote.LastTradePriceOnly);
          stock.change = quote.Change;
          stock.percentChange = quote.ChangeinPercent;
          stock.marketValue = stock.shares * stock.lastPrice;
          stock.dayChange = stock.shares * parseFloat(stock.change);
          stock.save();
        });
      }
    };

    // 2. 管理获取哪只股票不保价 的辅助函数
    this.register = function (stock) {
      stocks.push(stock);
    };

    this.deregister = function (stock) {
      _.remove(stocks, stock);
    };

    this.clear = function () {
      stocks = [];
    };

    // 3. 与Yahoo Finance API 通信的主函数
    this.fetch = function () {
      var symbols = _.reduce(stocks, function (symbols, stock) {
        symbols.push(stock.company.symbol);
        return symbols;
      }, []);

      // var query = encodeURIComponent('select * from yahoo.finance.quotes ' +
      //   'where symbol in (\'' + symbols.join('\',\'') + '\')');
      // var url = BASE + '?' + 'q=' + query + '&format=json&diagnostics=true' +
      //   '&env=http://datatables.org/alltables.env';
      var query = encodeURIComponent('select * from yahoo.finance.quotes ' +
        'where symbol in (\"' + symbols.join('\",\"') + '\")');
      var url = BASE + '?' + 'q=' + query + '&format=json&diagnostics=true' +
        '&env=store://datatables.org/alltableswithkeys';

      $http.jsonp(url + '&callback=JSON_CALLBACK')
        .success(function (data) {
          if (data.query.count) {
            var quotes = data.query.count > 1 ? data.query.results.quote() : [data.query.results.quote];
            update(quotes);
          }
        })
        .error(function (data) {
          console.log(data);
        });
    };

    // 4. 用于每5 秒抓取一次新的报价数据
    $interval(this.fetch, 5000);
  });




