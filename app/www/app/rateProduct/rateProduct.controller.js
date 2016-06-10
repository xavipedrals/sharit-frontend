angular.module('app.controllers')
  .controller('RateProductCtrl', ['$scope', '$rootScope', '$translate', '$translatePartialLoader', '$state', 'NgMap', 'StubsFactory', 'ProfileFactory', '$q', '$http', 'myConfig', '$ionicHistory',
    function($scope, $rootScope, $translate, $translatePartialLoader, $state, NgMap, StubsFactory, ProfileFactory, $q, $http, myConfig, $ionicHistory) {
      $translatePartialLoader.addPart('rateProduct');
      $translate.refresh();
      $scope.$state = $state;

      $scope.input = {
        stars : 0,
        comment: ""
      };

      ProfileFactory.getOtherUserInfo($rootScope.currentRoom.userId1).then(function (info) {
        console.log(info);

        if(typeof info.Image === 'undefined' || info.Image === null || info.Image === ''){
          info.Image = 'assets/img/boy.png';
        }

        $scope.userImage = info.Image;
      });

      $scope.rate = function () {
        $scope.input.stars = parseInt($scope.input.stars);
        if ($rootScope.currentUser.id == $rootScope.currentRoom.userId2) {
          var q = $q.defer();
          $http({
            method: 'POST',
            url: myConfig.url + ':' + myConfig.port + '/valorarUser',
            data: {
              'idpet': $rootScope.currentRoom.idTrans,
              'user': $rootScope.currentRoom.userId1,
              'roomid': $rootScope.currentRoom.id,
              'iditem' :$rootScope.currentRoom.itemId,
              'name': $rootScope.currentRoom.userName1,
              'surname': $rootScope.currentRoom.userSurname1,
              'stars': $scope.input.stars,
              'valoracio': $scope.input.comment
            },
            headers: {'token': window.localStorage.getItem('token')}
          }).then(function successCallback(response) {
            console.log(JSON.stringify(response,1,1));
            console.log('User Valorat');
            $ionicHistory.nextViewOptions({disableBack: true});
            $state.go('app.dashboard');
            q.resolve(response);
          }, function errorCallback(response) {
            q.reject();
          });
        }/*
         var data = {
         name: title,
         descripcio: description
         };
         var q = $q.defer();

         $http({
         method: 'POST',
         url: baseUrl + '/peticion',
         data: data,
         headers: {'token': window.localStorage.getItem(myConfig.TOKEN_STORAGE_KEY), 'Content-Type': 'application/json'}
         }).then(function successCallback(response) {
         console.log("Exito");
         console.log(response);
         q.resolve(response);
         }, function errorCallback(response) {
         console.log("Puta bida");
         console.log(response);
         q.reject();
         });
         return q.promise;
         };
        */
        else if ($rootScope.currentUser.id == $rootScope.currentRoom.userId1) {
          console.log(JSON.stringify($rootScope.currentRoom.idTrans, 1, 1), JSON.stringify($rootScope.currentRoom.userId2,1,1), JSON.stringify($rootScope.currentRoom.id,1,1), $rootScope.currentRoom.itemId, $rootScope.currentRoom.userName2, $rootScope.currentRoom.userSurname2);
          var q = $q.defer();
          $http({
            method: 'POST',
            url: myConfig.url + ':' + myConfig.port + '/valorarItem',
            data: {
              'idpet': $rootScope.currentRoom.idTrans,
              'user': $rootScope.currentRoom.userId2,
              'roomid': $rootScope.currentRoom.id,
              'iditem' :$rootScope.currentRoom.itemId,
              'name': $rootScope.currentRoom.userName2,
              'surname': $rootScope.currentRoom.userSurname2,
              'stars': $scope.input.stars,
              'valoracio': $scope.input.comment
            },
            headers: {'token': window.localStorage.getItem('token')}
          }).then(function successCallback(response) {
            console.log(JSON.stringify(response,1,1));
            console.log('Item Valorat');
            $ionicHistory.nextViewOptions({disableBack: true});
            $state.go('app.dashboard');
            q.resolve(response);
          }, function errorCallback(response) {
            q.reject();
          });
        }
        else {
          console.log('ERROR: Marçal, ets un inutil. Alguna cosa ha anat malament')
        }
      }
    }
  ]);
