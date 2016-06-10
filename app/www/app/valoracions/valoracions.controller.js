/**
 * Created by xavi on 28/03/16.
 */
angular.module('app.controllers')
  .controller('ValoracionsCtrl', ['$scope',
    '$rootScope',
    '$translate',
    '$translatePartialLoader',
    '$state', 'StubsFactory',
    '$cordovaDevice', '$cordovaFile',
    '$ionicPlatform', '$ionicActionSheet',
    'ImageService', 'FileService',
    function($scope, $rootScope, $translate, $translatePartialLoader, $state, StubsFactory, $cordovaDevice, $cordovaFile, $ionicPlatform, $ionicActionSheet, ImageService, FileService) {
      $translatePartialLoader.addPart('valoracions');
      $translate.refresh();

      $scope.$on('LANG_CHANGED', function(event) {
          $translate.use(event.language);
        });
          }

    
  ]);
