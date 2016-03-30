/**
 * Created by xavi on 25/03/16.
 */
angular.module('app.controllers')
  .controller('RequestsDashboardCtrl', ['$scope', '$rootScope', '$translate', '$translatePartialLoader', '$state', 'StubsFactory',
    function($scope, $rootScope, $translate, $translatePartialLoader, $state, StubsFactory) {
      $translatePartialLoader.addPart('request');
      $translate.refresh();
      $scope.$state = $state;
    }
  ]);
