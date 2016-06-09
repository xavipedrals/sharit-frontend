/**
 * Created by xavi on 02/06/16.
 */
angular.module('app.controllers').controller('OtherUserProfileCtrl',
  ['$scope', '$rootScope', '$translate',
    '$translatePartialLoader', '$state',
    'StubsFactory', 'NgMap', 'ProfileFactory',
    function($scope, $rootScope, $translate, $translatePartialLoader, $state, StubsFactory, NgMap, ProfileFactory) {
      $translatePartialLoader.addPart('profile');
      $translate.refresh();

      $scope.otherProfile = true;
      $scope.actualUserId = $rootScope.actualUserId;

      ProfileFactory.getOtherUserInfo($scope.actualUserId).then(function (info) {
        console.log(info);
        if(info.X == '1' && info.Y == '1'){
          info.X = 41.403841;
          info.Y = 2.174340;
        }
        if(typeof info.Image === 'undefined' || info.Image === null || info.Image === ''){
          info.Image = 'assets/img/boy.png';
        }
        if(info.Stars == '0') info.Stars = 4;
        $scope.userInfo = info;

        for (i = 0; i < info.ItemsUser.length; i++) {
          if (typeof info.ItemsUser[i].Image1 === 'undefined' || info.ItemsUser[i].Image1 === null || info.ItemsUser[i].Image1 === '') {
            info.ItemsUser[i].Image1 = 'assets/img/box.png';
          }
          if (typeof info.ItemsUser[i].ItemName === 'undefined' || info.ItemsUser[i].ItemName === null || info.ItemsUser[i].ItemName === '') {
            info.ItemsUser[i].ItemName = 'Caja sorpresa';
          }
        }
        $scope.anunciosUser = info.ItemsUser;

        NgMap.getMap().then(function(map) {
          map.setCenter({ lat: $scope.userInfo.X, lng: $scope.userInfo.Y });
          map.setZoom(10);
          new google.maps.Marker({position: {lat: $scope.userInfo.X, lng: $scope.userInfo.Y}, map: map});
        });

        ProfileFactory.getUserPeticiones().then(function (peticiones) {
          if(peticiones != null) {
            for (i = 0; i < peticiones.length; i++) {
              if (typeof peticiones[i].Image1 === 'undefined' || peticiones[i].Image1 === null || peticiones[i].Image1 === '') {
                peticiones[i].Image1 = 'assets/img/lupa.png';
              }
              if (typeof peticiones[i].Name === 'undefined' || peticiones[i].Name === null || peticiones[i].Name === '') {
                peticiones[i].Name = 'Lupa mágica';
              }
            }
          }
          $scope.userPeticiones = peticiones;
        });

        ProfileFactory.getUserValoraciones().then(function (valoraciones) {
          console.log("valoraciones");
          console.log(valoraciones);
          $scope.userValoraciones = $scope.userInfo.Valoracions;

          for (var j in $scope.userValoraciones) {
            var item = $scope.userValoraciones[j];

            $htmlstars = '';

            for (var i = 0; i < item.Stars; i++) {
              $htmlstars += '⭐';
            }

            $scope.userValoraciones[j].htmlestrellitas = $htmlstars;
          }
        });

        ProfileFactory.getUserFavoritos().then(function (favoritos) {
          console.log("favoritos");
          console.log(favoritos);
          $scope.userFavoritos = favoritos;
        });

      });

      $scope.goToDetail = function (item) {
        // console.log($index);
        $rootScope.actualProduct = item;
        $state.go('app.productDetail');
      };

    }
  ]);

