const angular = require('angular');
require("!style!css!./../style.css");

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
