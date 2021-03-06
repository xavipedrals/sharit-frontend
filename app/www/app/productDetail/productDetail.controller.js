angular.module('app.controllers').controller('ProductDetailCtrl',
  ['$scope', '$rootScope', '$translate', '$translatePartialLoader',
    '$state', '$stateParams', 'StubsFactory', 'NgMap',
    '$q', '$http', 'myConfig', 'ProductService',
    '$ionicSlideBoxDelegate',
    function ($scope, $rootScope, $translate, $translatePartialLoader, $state, $stateParams, StubsFactory, NgMap, $q, $http, myConfig, ProductService, $ionicSlideBoxDelegate) {
      // TODO: Remove this i18n methods from controller
      $translatePartialLoader.addPart('productDetail');
      $translate.refresh();

      $scope.options = {
        loop: false,
        effect: 'fade',
        speed: 300
      };

      $scope.productImage = '';
      $scope.canAskForProduct = '';
      $scope.ownerData = {};

      var favoriteImgs = ['assets/img/not_fav.png', 'assets/img/fav.png'];
      var favoriteImgsIndex = 0;
      $scope.favoriteImg = favoriteImgs[favoriteImgsIndex];

      // Get the accessed product
      ProductService.get($stateParams.itemId, $stateParams.ownerId)
        .then(function (response) {
          console.log(response);
          $scope.ownerData = {
            'id': response.IDuser,
            'name': response.Name + ' ' + response.Surname,
            'position': {
              'x': response.X,
              'y': response.Y
            }
          };
          $scope.product = response.It;
          $scope.slides = [
            {
              image: $scope.product.Image1,
              id: 0
            },
            {
              image: $scope.product.Image2,
              id: 1
            },
            {
              image: $scope.product.Image3,
              id: 2
            }
          ];

          for (i = 0; i < $scope.slides.length; i++) {
            if (typeof $scope.slides[i].image === 'undefined' || $scope.slides[i].image === null || $scope.slides[i].image === '') {
              $scope.slides[i].image = 'assets/img/box.png';
            }
          }
          if ($scope.product.ItemName === 'undefined' || $scope.product.ItemName === null || $scope.product.ItemName === '') {
            $scope.product.ItemName = 'Caja sorpresa';
          }
          $scope.productImage = $scope.product.Image1;
          $scope.canAskForProduct = $scope.product.IDuser != $rootScope.currentUser.id;
          console.log($scope.product.IDuser, $rootScope.currentUser.id, $scope.canAskForProduct);

          NgMap.getMap().then(function (map) {
            map.setCenter({lat: $scope.ownerData.position.x, lng: $scope.ownerData.position.y});
            map.setZoom(10);
            new google.maps.Marker({
              position: {lat: $scope.ownerData.position.x, lng: $scope.ownerData.position.y},
              map: map
            });
          });

          if (ProductService.isFavourite()) {
            favoriteImgsIndex = 1;
            $scope.favoriteImg = favoriteImgs[favoriteImgsIndex];
          }
          $scope.$apply();
        }, function (error) {
          // TODO: Do something when failing!
        });

      $scope.toggleFavorite = function () {
        ProductService.setFavourite(favoriteImgsIndex)
          .then(function (response) {
            favoriteImgsIndex ^= 1;
            $scope.favoriteImg = favoriteImgs[favoriteImgsIndex];
            $scope.$apply();
          }, function (error) {
            // TODO: Do something when failing!
          });
      };

      $scope.showValoracions = function () {
        $state.go('app.valoracions');
      };

      $scope.startChat = function () {
        //creo una nova transaccio
        var q = $q.defer();
        $http({
          method: 'POST',
          url: myConfig.url + ':' + myConfig.port + '/transaccion',
          headers: {'token': window.localStorage.getItem('token')},
          data: {
            'itemID': $stateParams.itemId,
            'iduser': $stateParams.ownerId
          }
        }).then(function successCallback(response) {
          console.log('UN COP CREADA LA TRANSACCO');
          console.log(JSON.stringify(response.data, 1, 1));
          //creo una nova room
          var r = $q.defer();
          $http({
            method: 'POST',
            url: myConfig.url + ':' + myConfig.port + '/room/create',
            data: {
              'UserID1': $rootScope.currentUser.id,
              'UserID2': $stateParams.ownerId,
              'ItemID': $stateParams.itemId,
              'idtrans': response.data.IDTrans
            }
          }).then(function successCallback(response2) {
            console.log('alohaaa');
            console.log(JSON.stringify(response2.data));

            $rootScope.currentRoom = new Object();


            $rootScope.currentRoom.roomId = response2.data.RoomId;
            $rootScope.currentRoom.userId1 = response2.data.UserID1;
            $rootScope.currentRoom.userName1 = response2.data.NameU1;
            $rootScope.currentRoom.userId2 = response2.data.UserID2;
            $rootScope.currentRoom.userName2 = response2.data.NameU2;
            $rootScope.currentRoom.messages = new Array();
            $state.go('app.chatRooms');
            r.resolve(response2);
          }, function errorCallback(response2) {
            r.reject();
          });
          q.resolve(response);
        }, function errorCallback(response) {
          q.reject();
        });
      };
    }
  ]);
