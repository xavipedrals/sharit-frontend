/**
 * Created by xavi on 24/03/16.
 */
angular.module('app.controllers')
  .controller('ProductDetailCtrl', ['$scope', '$rootScope', '$translate', '$translatePartialLoader', 'StubsFactory',
    function($scope, $rootScope, $translate, $translatePartialLoader, StubsFactory) {
      $translatePartialLoader.addPart('productDetail');
      $translate.refresh();
      $scope.items = StubsFactory;
      $scope.actualProduct = $rootScope.actualProduct;
      // $scope.unFavoriteImgUrl = "assets/img/dcCCPkrbQVmgHbe1RAOC_favorite.png";
      // $scope.FavoriteImgUrl = "assets/img/ci9k3i82QD66XbEI4bZ6_favorite-2.png";
      $scope.favoriteImgUrl = "assets/img/dcCCPkrbQVmgHbe1RAOC_favorite.png";

      $scope.toggleFavorite = function () {
        if($scope.favoriteImgUrl == "assets/img/dcCCPkrbQVmgHbe1RAOC_favorite.png"){
          $scope.favoriteImgUrl = "assets/img/ci9k3i82QD66XbEI4bZ6_favorite-2.png"
        } else {
          $scope.favoriteImgUrl = "assets/img/dcCCPkrbQVmgHbe1RAOC_favorite.png";
        }
      };
      // console.log($scope.actualItem);
    }
  ]);
