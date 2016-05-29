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
        //get user data
        var q = $q.defer();
        $http({
          method: 'POST',
          url: myConfig.url + ':' + myConfig.port + '/room/create',
          data: {'UserID1': $rootScope.currentUser.id,
            'UserID2': $rootScope.actualProduct.lenderUserId,
            'ItemID' : $rootScope.actualProduct.id}
        }).then(function successCallback(response) {
          console.log(JSON.stringify(response.data));
          $rootScope.currentRoom = new Object();
          $rootScope.currentRoom.roomId = response.data.RoomId;
          $rootScope.currentRoom.userId1= response.data.UserID1;
          $rootScope.currentRoom.userName1= response.data.NameU1;
          $rootScope.currentRoom.userId2= response.data.UserID2;
          $rootScope.currentRoom.userName2= response.data.NameU2;
          $rootScope.currentRoom.messages= new Array();
          $state.go('app.chat');
          q.resolve(response);
        }, function errorCallback(response) {
          q.reject();
        });
      }
    }
  ]);
