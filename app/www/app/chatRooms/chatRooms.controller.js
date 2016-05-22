angular.module('app.controllers')
  .controller('ChatCtrl',
    function ($scope, $rootScope, $translate, $translatePartialLoader, $state, myConfig) {
      $translatePartialLoader.addPart('chats');
      $translate.refresh();

      $scope.$state = $state;

      var baseUrl = myConfig.url + ':' + myConfig.port;

      var userInfo = function (email, pass) {
        var q = $q.defer();
        $http.get(baseUrl + '/user', {
          params: {
            "userid": $scope.user_id
          }
        }).then(function successCallback(response) {
          q.resolve(response);
        }, function errorCallback(response) {
          console.log("Error al GET user/login");
          console.log(response);
          q.reject();
        });
        return q.promise;
      };

      var login = function (email, pass) {
        var q = $q.defer();
        $http.get(baseUrl + '/room/findRooms', {
          params: {
            "userid": $scope.user_id
          }
        }).then(function successCallback(response) {
          window.localStorage.setItem(TOKEN_STORAGE_KEY, response.data.Token);
          currentUser = getCurrentUser();
          q.resolve(response);
        }, function errorCallback(response) {
          console.log("Error al GET user/login");
          console.log(response);
          q.reject();
        });
        return q.promise;
      };
    });
