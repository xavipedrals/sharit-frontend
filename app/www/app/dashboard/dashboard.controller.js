angular.module('app.controllers')
.controller('DashboardCtrl', ['$scope', '$rootScope', '$translate', '$translatePartialLoader', '$state', 'StubsFactory', '$ionicHistory', 
  function($scope, $rootScope, $translate, $translatePartialLoader, $state, StubsFactory, $ionicHistory) {
   $translatePartialLoader.addPart('dashboard');
   $translate.refresh();

   $scope.changetorequests = function() {
    $ionicHistory.nextViewOptions({ disableBack: true});
    $state.go('app.requestsDashboard');
   }

   $scope.$state = $state;
   $scope.items = StubsFactory;
   $scope.goToDetail = function (item) {
        // console.log($index);
        $rootScope.actualProduct = item;
        $state.go('app.productDetail');
      }

      for (var j in $scope.items) {
        var item = $scope.items[j];

        $htmlstars = '';

        for (var i = 0; i < item.stars; i++) {
          $htmlstars += '⭐';
        }

        $scope.items[j].htmlestrellitas = $htmlstars;
      }
}]);
