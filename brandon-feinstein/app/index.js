const angular = require('angular');

const app = angular.module('UserApp', []);
app.controller('UserController', ['$http', function($http) {
  const mainRoute = 'http://localhost:3000/users';
  this.smokeTest = 'SMOKE TEST';
  this.user = ['user'];
  this.getUser = function() {
    $http.get(mainRoute)
      .then((result) => {
        this.user = result.data.data;
        console.log(result.data.data);
      }, function(error) {
        console.log('this is an error')
      });
  };
    this.createUser = function(user) {
      $http.post(mainRoute, user)
        .then((res) => {
          this.user.push(user);
          this.newUser = {};
        });
    };
  this.removeUser = function(user) {
    $http.delete(mainRoute + '/' + user._id)
      .then((res) => {
        this.user = this.user.filter((u) => u._id != user._id);
      });
  };

}]);
