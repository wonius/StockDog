# StockDog

##Bug
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

