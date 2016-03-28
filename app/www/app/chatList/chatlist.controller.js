/**
 * Created by xavi on 28/03/16.
 */
angular.module('app.controllers')
  .controller('ChatListCtrl', ['$scope', '$rootScope', '$translate', '$translatePartialLoader', '$state', 'StubsFactory',
    function($scope, $rootScope, $translate, $translatePartialLoader, $state, StubsFactory) {
      $translatePartialLoader.addPart('dashboard');
      $translate.refresh();

      $scope.$state = $state;
    }
  ]);
