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
    function($scope, $rootScope, $translate, $translatePartialLoader, $state, StubsFactory, $cordovaDevice, $cordovaFile, $ionicPlatform, $ionicActionSheet, ImageService, FileService) {
      $translatePartialLoader.addPart('addProduct');
      $translate.refresh();

      $scope.$state = $state;
      // $scope.product = null;
      console.log("Hola compi");

      $ionicPlatform.ready(function() {
        $scope.images = FileService.images();
        // console.log($scope.images);
        $scope.$apply();
      });

      $scope.urlForImage = function(imageName) {
        // console.log(imageName);
        var trueOrigin = cordova.file.dataDirectory + imageName;
        // console.log(trueOrigin);
        return trueOrigin;
      };

      $scope.addMedia = function() {
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
      };

      $scope.addImage = function(type) {
        $scope.hideSheet();
        ImageService.handleMediaDialog(type).then(function() {
          $scope.$apply();
        });
      };


      $scope.submitProduct = function (product) {
        this.submittedProduct = product;
        console.log(this.submittedProduct);
        // TODO: Enviar o al servidor
      };
    }
  ]);
