const angular = require('angular');
require("!style!css!./../style.css");
require('angular-route');

const app = angular.module('UserApp', ['ngRoute']);

app.factory('service', function() {
  return {
    firstUser: function (array){
      console.log('first user is ' + array[0].name) ;
    },
    lastUser: function(array){
      console.log('last user is ' + array[array.length -1].name);
    }
  };
});

app.controller('UserController', ['$http', 'service', function($http, service) {
  const mainRoute = 'http://localhost:3000/users';
  this.smokeTest = 'SMOKE TEST';
  this.user = ['user'];
  this.getUser = function() {
    $http.get(mainRoute)
      .then((result) => {
        this.user = result.data.data;
        service.firstUser(this.user);
        service.lastUser(this.user);
        console.log(result.data.data);
      }, function(error) {
        console.log('this is an error');
      });
  };
  this.createUser = function(user) {
    $http.post(mainRoute, user)
      .then((res) => {
        console.log(res);
        this.user.push(res.data);
        this.newUser = {};
      });
  };
  this.removeUser = function(user) {
    $http.delete(mainRoute + '/' + user._id)
      .then((res) => {
        this.user = this.user.filter((u) => u._id != user._id);
      });
  };

  this.updateUser = function(name, $index) {
    var tempName = this.user[$index].name;
    console.log(this.user[$index].name);
    this.user[$index].name = name;
    $http.put(mainRoute + '/' + this.user[$index]._id, this.user[$index])
      .then((res) => {
        console.log(res.data.name);
      }, (err) => {
        console.log(err);
        this.user = tempName;
      }
    );
  };

}]);

app.directive('forminput', function() {
  return {
      restrict: 'E',
      replace: 'true',
      template: '<input bold type="text" data-ng-model="newUser.name"/>'
  };
});

app.directive('apptitle', function() {
  return {
      restrict: 'E',
      replace: 'true',
      template: '<h1>Angular Crud for Two Resource API</h1>'
  };
});

app.config(['$routeProvider', function(router) {
  router
    .when('/signup', {
      controller: 'UserController',
      controllerAs: 'userctrl',
      templateUrl: 'views/signup_in.html'
    })
    .when('/home', {
      controller: 'UserController',
      controllerAs: 'userctrl',
      templateUrl: 'views/home.html'
    })
}])
