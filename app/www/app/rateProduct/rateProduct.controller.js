angular.module('app.controllers')
.controller('RateProductCtrl', ['$scope', '$rootScope', '$translate', '$translatePartialLoader', '$state', 'NgMap', 'StubsFactory', 'ProfileFactory',
  function($scope, $rootScope, $translate, $translatePartialLoader, $state, NgMap, StubsFactory, ProfileFactory) {
    $translatePartialLoader.addPart('rateProduct');
    $translate.refresh();
    $scope.$state = $state;
    
  }
  ]);
