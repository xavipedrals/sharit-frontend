angular.module('app.controllers').controller('ProductDetailCtrl', ['$scope', '$rootScope', '$translate', '$translatePartialLoader', '$state', 'StubsFactory', 'NgMap', '$q', '$http', 'myConfig',
    function($scope, $rootScope, $translate, $translatePartialLoader, $state, StubsFactory, NgMap, $q, $http, myConfig) {
      $translatePartialLoader.addPart('productDetail');
      $translate.refresh();

      $scope.$state = $state;
      $scope.items = StubsFactory;
      $scope.actualProduct = $rootScope.actualProduct;
      $scope.favoriteImgUrl = "assets/img/dcCCPkrbQVmgHbe1RAOC_favorite.png";
      $scope.canAskForProduct = $rootScope.actualProduct.lenderUserId != $rootScope.currentUser.id;
      console.log($rootScope.actualProduct.lenderUserId + " " + $rootScope.currentUser.id);
      console.log($scope.canAskForProduct);

      $scope.toggleFavorite = function () {
        if($scope.favoriteImgUrl == "assets/img/dcCCPkrbQVmgHbe1RAOC_favorite.png"){
          $scope.favoriteImgUrl = "assets/img/ci9k3i82QD66XbEI4bZ6_favorite-2.png"
        } else {
          $scope.favoriteImgUrl = "assets/img/dcCCPkrbQVmgHbe1RAOC_favorite.png";
        }
      };
      // $scope.goToUserProfile = function () {
      //   $state.go('userProfile');
      // }

      $scope.showValoracions = function () {
        $state.go('app.valoracions');
      }

      NgMap.getMap().then(function(map) {
        map.setCenter({ lat: 41.403841, lng: 2.174340 });
        map.setZoom(10);
        new google.maps.Marker({position: {lat: 41.403841, lng: 2.174340}, map: map});
      });



      $scope.startChat = function () {
        //creo una nova transaccio
        var q = $q.defer();
        console.log('PRODUCTE');
        console.log(JSON.stringify($scope.actualProduct,1,1));
        console.log('iduser pel david: ', $scope.actualProduct.IDuser);
        $http({
          method: 'POST',
          url: myConfig.url + ':' + myConfig.port + '/transaccion',
          headers: {'token': window.localStorage.getItem('token')},
          data: {'itemID': $scope.actualProduct.Idd,
            'iduser': $scope.actualProduct.IDuser}
        }).then(function successCallback(response) {
          console.log('UN COP CREADA LA TRANSACCO');
          console.log(JSON.stringify(response.data, 1, 1));
          //creo una nova room
          var r = $q.defer();
          $http({
            method: 'POST',
            url: myConfig.url + ':' + myConfig.port + '/room/create',
            data: {'UserID1': $rootScope.currentUser.id,
              'UserID2': $rootScope.actualProduct.lenderUserId,
              'ItemID' : $rootScope.actualProduct.id,
              'idtrans' : response.data.IDTrans /*barbaraTrans*/}
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
      }
    }
  ]);
