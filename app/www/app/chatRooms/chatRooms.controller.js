angular.module('app.controllers')
  .controller('ChatRoomsCtrl', ['$scope', '$rootScope', '$translate', '$translatePartialLoader', '$state', 'myConfig', '$http', '$q',
    function ($scope, $rootScope, $translate, $translatePartialLoader, $state, myConfig, $http, $q) {
      $translatePartialLoader.addPart('chats');
      $translate.refresh();

      $scope.$on('LANG_CHANGED', function(event) {
            $translate.use(event.language);
        });
      
      $scope.$state = $state;
      $scope.currentUser = $rootScope.currentUser;

      $scope.goToRate = function (room) {
        console.log('RATE')
        console.log(JSON.stringify(room, 1, 1));
        $rootScope.currentRoom = new Object();
        $rootScope.currentRoom.id = room.RoomId;
        $rootScope.currentRoom.userId1= room.UserID1;
        $rootScope.currentRoom.userName1= room.NameU1;
        $rootScope.currentRoom.userSurname1= room.SurnameU1;
        $rootScope.currentRoom.userId2= room.UserID2;
        $rootScope.currentRoom.userName2= room.NameU2;
        $rootScope.currentRoom.userSurname2= room.SurnameU2;
        $rootScope.currentRoom.rated1= Boolean(room.Rated1);
        $rootScope.currentRoom.rated2= Boolean(room.Rated2);
        $rootScope.currentRoom.idTrans= room.IdTrans;
        $rootScope.currentRoom.itemId= room.ItemID;
        $state.go('app.rateProduct');
      }

      $scope.goToChat = function (room){
        console.log(room);
        var q = $q.defer();
        $http({
          method: 'GET',
          url: myConfig.url + ':' + myConfig.port + '/room/findRoom',
          params: {'roomid': room.RoomId}
        }).then(function successCallback(response) {
          console.log(JSON.stringify(response, 1, 1));
          $rootScope.currentRoom = new Object();
          $rootScope.currentRoom.id = response.data.Room.RoomId;
          $rootScope.currentRoom.userId1= room.UserID1;
          $rootScope.currentRoom.userName1= room.NameU1;
          $rootScope.currentRoom.userSurname1= room.SurnameU1;
          $rootScope.currentRoom.userId2= room.UserID2;
          $rootScope.currentRoom.userName2= room.NameU2;
          $rootScope.currentRoom.userSurname2= room.SurnameU2;
          $rootScope.currentRoom.messages= response.data.Room.MessagesRoom;

          $state.go('app.chat');
          q.resolve(response);
        }, function errorCallback(response) {
          q.reject();
        });
      };

      var q = $q.defer();
      $http({
        method: 'GET',
        url: myConfig.url + ':' + myConfig.port + '/room/findRooms',
        params: {'userid': $rootScope.currentUser.id}
      }).then(function successCallback(response) {
        console.log('FINDROOMS');
        console.log(JSON.stringify(response.data, 1, 1));
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
