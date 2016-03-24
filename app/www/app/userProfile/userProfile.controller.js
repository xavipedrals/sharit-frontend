/**
 * Created by xavi on 24/03/16.
 */
angular.module('app.controllers')
  .controller('UserProfileCtrl', ['$scope', '$rootScope', '$translate', '$translatePartialLoader', 'StubsFactory',
    function($scope, $rootScope, $translate, $translatePartialLoader, StubsFactory) {
      $translatePartialLoader.addPart('userProfile');
      $translate.refresh();
    }
  ]);
