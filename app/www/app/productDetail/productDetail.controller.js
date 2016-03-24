/**
 * Created by xavi on 24/03/16.
 */
angular.module('app.controllers')
  .controller('ProductDetailCtrl', ['$scope', '$rootScope', '$translate', '$translatePartialLoader', 'StubsFactory',
    function($scope, $rootScope, $translate, $translatePartialLoader, StubsFactory) {
      $translatePartialLoader.addPart('productDetail');
      $translate.refresh();
      $scope.items = StubsFactory;
      $scope.actualItem = $scope.items[$rootScope.actualProductIndex];
      // console.log($scope.actualItem);
    }
  ]);
