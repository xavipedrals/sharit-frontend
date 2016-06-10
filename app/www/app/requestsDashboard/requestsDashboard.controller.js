angular.module('app.controllers')
  .controller('RequestsDashboardCtrl',
    ['$scope', '$rootScope', '$translate',
      '$translatePartialLoader', '$state',
      'StubsFactory', '$ionicHistory',
      'PeticionFactory','$q','$http', 'myConfig',
    function($scope, $rootScope, $translate, $translatePartialLoader, $state, StubsFactory, $ionicHistory, PeticionFactory, $q, $http, myConfig) {
      $translatePartialLoader.addPart('request');
      $translate.refresh();
      $scope.$state = $state;

      $scope.acceptRequest = function (item) {
        console.log(JSON.stringify(item,1,1));
        //creo una nova transaccio
        var q = $q.defer();
        $http({
          method: 'POST',
          url: myConfig.url + ':' + myConfig.port + '/transaccion',
          headers: {'token': window.localStorage.getItem('token')},
          data: {'itemID': item.ID,
            'iduser': item.To}
        }).then(function successCallback(response) {
          console.log('UN COP CREADA LA TRANSACCO');
          console.log(JSON.stringify(response.data, 1, 1));
          //creo una nova room
          var r = $q.defer();
          $http({
            method: 'POST',
            url: myConfig.url + ':' + myConfig.port + '/room/create',
            data: {'UserID1': $rootScope.currentUser.id,
              'UserID2': item.To,
              'ItemID' : item.ID,
              'idtrans' : response.data.IDTrans}
          }).then(function successCallback(response2) {
            console.log(JSON.stringify(response2.data));
            $rootScope.currentRoom = new Object();
            $rootScope.currentRoom.roomId = response2.data.RoomId;
            $rootScope.currentRoom.userId1= response2.data.UserID1;
            $rootScope.currentRoom.userName1= response2.data.NameU1;
            $rootScope.currentRoom.userId2= response2.data.UserID2;
            $rootScope.currentRoom.userName2= response2.data.NameU2;
            $rootScope.currentRoom.messages= new Array();
            $state.go('app.chat');
            r.resolve(response2);
          }, function errorCallback(response2) {
            r.reject();
          });
          q.resolve(response);
        }, function errorCallback(response) {
          q.reject();
        });
      };

      $scope.$on('LANG_CHANGED', function(event) {
          $translate.use(event.language);
        });
      
      var _selected;

      $scope.selected = "";

      $scope.ngModelOptionsSelected = function (value) {
        if (arguments.length) {
          _selected = value;
        } else {
          return _selected;
        }
      };

      $scope.changetodashboard = function() {
        $ionicHistory.nextViewOptions({ disableBack: true});
        $state.go('app.dashboard');
      };

      PeticionFactory.getPeticiones().then(function (requests) {
        $scope.itemNames = [];
        for (i = 0; i < requests.length; i++) {
          if(typeof requests[i].Image === 'undefined' || requests[i].Image === null || requests[i].Image === ''){
            requests[i].Image = 'assets/img/lupa.png';
          }
          if(typeof requests[i].Name === 'undefined' || requests[i].Name === null || requests[i].Name === ''){
            requests[i].Name = 'Lupa mágica';
          }
          $scope.itemNames.push(requests[i].Name);
        }
        $scope.items = requests;
      });
    }
  ]);
