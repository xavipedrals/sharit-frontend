/**
 * Created by xavi on 24/03/16.
 */
angular.module('app.controllers').controller('ProductDetailCtrl', ['$scope', '$rootScope', '$translate', '$translatePartialLoader', '$state', 'StubsFactory', 'NgMap',
    function($scope, $rootScope, $translate, $translatePartialLoader, $state, StubsFactory, NgMap) {
      $translatePartialLoader.addPart('productDetail');
      $translate.refresh();

      debugger;
      $scope.$state = $state;
      $scope.items = StubsFactory;
      $scope.actualProduct = $rootScope.actualProduct;
      $scope.favoriteImgUrl = "assets/img/dcCCPkrbQVmgHbe1RAOC_favorite.png";

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
    }
  ]);
