/**
 * Created by xavi on 24/03/16.
 */
angular.module('app.controllers')
  .controller('ProductDetailCtrl', ['$scope', '$rootScope', '$translate', '$translatePartialLoader', '$state', 'StubsFactory',
    function($scope, $rootScope, $translate, $translatePartialLoader, $state, StubsFactory) {
      $translatePartialLoader.addPart('productDetail');
      $translate.refresh();
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
    }
  ]);
