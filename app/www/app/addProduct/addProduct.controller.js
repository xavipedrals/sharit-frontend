/**
 * Created by xavi on 28/03/16.
 */
angular.module('app.controllers')
  .controller('AddProductCtrl', ['$scope',
    '$rootScope',
    '$translate',
    '$translatePartialLoader',
    '$state', 'StubsFactory',
    '$cordovaDevice', '$cordovaFile',
    '$ionicPlatform', '$ionicActionSheet',
    'ImageService', 'FileService',
    'HttpCalls',
    function($scope, $rootScope, $translate, $translatePartialLoader, $state, StubsFactory, $cordovaDevice, $cordovaFile, $ionicPlatform, $ionicActionSheet, ImageService, FileService, HttpCalls) {
      $translatePartialLoader.addPart('addProduct');
      $translate.refresh();

      $scope.product = {}; // TODO: Cache the product values
      $scope.images = FileService.images(false);

      $scope.addMedia = function() {
        if ($scope.images.length < 3) {
          $scope.hideSheet = $ionicActionSheet.show({
            buttons: [
              { text: 'Take photo' },
              { text: 'Photo from library' }
            ],
            titleText: 'Add images',
            cancelText: 'Cancel',
            buttonClicked: function(index) {
              $scope.addImage(index);
            }
          });
        } else {
          // TODO: Show toast to inform that the user has reached the limit.
        }
        
      };

      $scope.addImage = function(type) {
        $scope.hideSheet();
        ImageService.handleMediaDialog(type, false).then(function(data) {
          //$scope.images.push(data);
        });
      };


      $scope.submitProduct = function () {
        HttpCalls.postAnuncio($scope.product.title, $scope.product.description, $scope.images).then(function () {
          $scope.product = {};
          $scope.images = [];
        });
      };
    }
  ]);
