angular.module('app.controllers')
.controller('DashboardCtrl', ['$scope',
  '$rootScope', '$translate',
  '$translatePartialLoader',
  '$state', 'StubsFactory',
  '$ionicHistory', 'AnuncioFactory',
  function($scope, $rootScope, $translate, $translatePartialLoader, $state, StubsFactory, $ionicHistory, AnuncioFactory) {
   $translatePartialLoader.addPart('dashboard');
   $translate.refresh();

   $scope.changetorequests = function() {
    $ionicHistory.nextViewOptions({ disableBack: true});
    $state.go('app.requestsDashboard');
   };

   $scope.$state = $state;
   //$scope.items = StubsFactory;

    AnuncioFactory.getAnuncios().then(function (anuncios) {
      //console.log(anuncios);
      for (i = 0; i < anuncios.length; i++) {
        if(typeof anuncios[i].Image1 === 'undefined' || anuncios[i].Image1 === null || anuncios[i].Image1 === ''){
          anuncios[i].Image1 = 'assets/img/box.png';
        }
        if(typeof anuncios[i].ItemName === 'undefined' || anuncios[i].ItemName === null || anuncios[i].ItemName === ''){
          anuncios[i].ItemName = 'Caja sorpresa';
        }
      }
      //console.log(anuncios);
      $scope.items = anuncios;
    });

   $scope.goToDetail = function (item) {
        // console.log($index);
        $rootScope.actualProduct = item;
        $state.go('app.productDetail');
      }

      for (var j in $scope.items) {
        var item = $scope.items[j];

        $htmlstars = '';

        for (var i = 0; i < item.Stars; i++) {
          $htmlstars += '⭐';
        }

        $scope.items[j].htmlestrellitas = $htmlstars;
      }
}]);
