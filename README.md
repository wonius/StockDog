# StockDog

## Bug
1. 项目中使用了Lodash框架，main.js中使用了_.contains()函数，该函数是不存在的。

fix：
```
      // if (_.contains(path, 'watchlist')) {
      if (path.indexOf('watchlist') >= 0) {
        $scope.activeView = 'watchlist';
      } else {
        $scope.activeView = 'dashboard';
      }
```

2. 按照书上的教程，敲完1.5章节的代码后，发现右侧列表一片空白，而且也无法添加新的股票。
调试后发现，company变量没有symbol属性，导致addStock、{{stock.company.symbol}}报错。

fix：
```
      $scope.watchlist.addStock({
        listId: $routeParams.listId,
        // company: $scope.newStock.company,
        company: _.find($scope.companies, function(o){return o.label==$scope.newStock.company}),
        shares: $scope.newStock.shares
      });
```

3. 敲完1.6章节后，注册QuoteService，请求yql获取数据，无法获取正确数据。原来之前的api已经不能使用。
fix：
```
    var BASE = 'https://query.yahooapis.com/v1/public/yql';
    var query = encodeURIComponent('select * from yahoo.finance.quotes ' +
        'where symbol in (\"' + symbols.join('\",\"') + '\")');
    var url = BASE + '?' + 'q=' + query + '&format=json&diagnostics=true' +
        '&env=store://datatables.org/alltableswithkeys';
```
PS：该服务极不稳定，经常返回异常。
想查看其他api，请访问 https://developer.yahoo.com/yql/console/

4. 股票显示页面报错。ng-repeat中增加`track by $index`
fix：
```
        <p ng-repeat="stock in stocks track by $index">{{stock.company.symbol}}</p>

```
