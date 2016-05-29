angular.module('app.controllers')
  .controller('ChatRoomsCtrl', ['$scope', '$rootScope', '$translate', '$translatePartialLoader', '$state', 'myConfig', '$http', '$q',
    function ($scope, $rootScope, $translate, $translatePartialLoader, $state, myConfig, $http, $q) {
      $translatePartialLoader.addPart('chats');
      $translate.refresh();

      $scope.$state = $state;

      $scope.goToChat = function (room){
        console.log(room);
        var q = $q.defer();
        $http({
          method: 'GET',
          url: myConfig.url + ':' + myConfig.port + '/room/findRoom',
          params: {'roomid': room.RoomId}
        }).then(function successCallback(response) {
          console.log(JSON.stringify(response));
          $rootScope.currentRoom = new Object();
          $rootScope.currentRoom.id = response.data.Room.RoomId;
          $rootScope.currentRoom.userId1= room.UserID1;
          $rootScope.currentRoom.userName1= room.NameU1;
          $rootScope.currentRoom.userId2= room.UserID2;
          $rootScope.currentRoom.userName2= room.NameU2;
          console.log(response.data.Room.MessagesRoom);
          $rootScope.currentRoom.messages= response.data.Room.MessagesRoom;

          $state.go('app.chat');
          q.resolve(response);
        }, function errorCallback(response) {
          q.reject();
        });
      }

      var q = $q.defer();
      $http({
        method: 'GET',
        url: myConfig.url + ':' + myConfig.port + '/room/findRooms',
        params: {'userid': $rootScope.currentUser.id}
      }).then(function successCallback(response) {
        console.log(JSON.stringify(response.data));
        $scope.rooms = response.data;
        $scope.currentUser = new Object();
        $scope.currentUser.id = $rootScope.currentUser.id;
        $scope.currentUser.name = $rootScope.currentUser.name;
        $scope.currentUser.surname = $rootScope.currentUser.surname;
        q.resolve(response);
      }, function errorCallback(response) {
        q.reject();
      });
    }]);
