/**
 * Created by xavi on 28/03/16.
 */
angular.module('app.controllers')
  .controller('AddProductCtrl', ['$scope', '$rootScope', '$translate', '$translatePartialLoader', '$state', 'StubsFactory',
    function($scope, $rootScope, $translate, $translatePartialLoader, $state, StubsFactory) {
      $translatePartialLoader.addPart('addProduct');
      $translate.refresh();

      $scope.$state = $state;
      // $scope.product = null;

      $scope.submitProduct = function (product) {

        this.submittedProduct = product;
        console.log(this.submittedProduct);
        // TODO: Enviar peticio al servidor
      };
    }
  ]);
