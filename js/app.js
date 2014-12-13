var todoModule = angular.module('todo', []);
todoModule.controller('TodoController', function($scope)
{
  var todos = [
    {name: '这是一个已完成的任务', finish: new Date(), create: new Date()},
    {name: '要完成任务请打勾', finish:null, create: new Date()},
    {name: '要重新开始任务请取消勾选', finish:null, create: new Date()},
    {name: '要删除任务请点击垃圾桶图标', finish:null, create: new Date()},
  ];

  $scope.todos = todos;

  $scope.toggleFinish = function(todo)
  {
    todo.finish = todo.finish ? null : (new Date());
  };

  $scope.remove = function(index)
  {
    $scope.todos.splice(index, 1);
  };

  $scope.sort = function()
  {
    $scope.todos.sort(function(a, b)
    {
      if(a.finish || b.finish)
      {
        if(a.finish && b.finish)
        {
          if(a.finish == b.finish)
          {
            return b.create - a.create;
          }
          return a.finish - b.finish;
        }
        else if(a.finish)
        {
          return 1;
        }
        else return -1;
      }
      return b.create - a.create;
    });
  };

  $scope.createTodo = function()
  {
    $scope.todos.push({name: $scope.search, create: new Date(), finish: null});
    $scope.search = '';
  };

  $scope.onSearch = function(event)
  {
    if(event.keyCode === 13 && $scope.search)
    {
      $scope.createTodo();
    }
  };

  $scope.waitCount = function()
  {
    console.log(todos);
    var count = 0;
    angular.forEach($scope.todos, function(todo) {
      count += todo.finish ? 0 : 1;
    });
    return count;
  };
});
