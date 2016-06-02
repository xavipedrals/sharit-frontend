angular.module('app.controllers')
  .controller('RequestsDashboardCtrl',
    ['$scope', '$rootScope', '$translate',
      '$translatePartialLoader', '$state',
      'StubsFactory', '$ionicHistory',
      'PeticionFactory',
    function($scope, $rootScope, $translate, $translatePartialLoader, $state, StubsFactory, $ionicHistory, PeticionFactory) {
      $translatePartialLoader.addPart('request');
      $translate.refresh();
      $scope.$state = $state;

      var _selected;

      $scope.selected = "";

      $scope.ngModelOptionsSelected = function (value) {
        if (arguments.length) {
          _selected = value;
        } else {
          return _selected;
        }
      };

      $scope.changetodashboard = function() {
        $ionicHistory.nextViewOptions({ disableBack: true});
        $state.go('app.dashboard');
      };

      PeticionFactory.getPeticiones().then(function (requests) {
        $scope.itemNames = [];
        for (i = 0; i < requests.length; i++) {
          if(typeof requests[i].Image === 'undefined' || requests[i].Image === null || requests[i].Image === ''){
            requests[i].Image = 'assets/img/lupa.png';
          }
          if(typeof requests[i].Name === 'undefined' || requests[i].Name === null || requests[i].Name === ''){
            requests[i].Name = 'Lupa mágica';
          }
          $scope.itemNames.push(requests[i].Name);
        }
        $scope.items = requests;
      });
    }
  ]);