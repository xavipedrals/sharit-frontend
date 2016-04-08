angular.module('app.controllers')
  .controller('RequestProductCtrl', ['$scope',
    '$rootScope',
    '$translate',
    '$translatePartialLoader',
    '$state', 'StubsFactory',
    '$cordovaDevice', '$cordovaFile',
    '$ionicPlatform', '$ionicActionSheet',
    'ImageService', 'FileService',
    function($scope, $rootScope, $translate, $translatePartialLoader, $state, StubsFactory, $cordovaDevice, $cordovaFile, $ionicPlatform, $ionicActionSheet, ImageService, FileService) {
      $translatePartialLoader.addPart('requestProduct');
      $translate.refresh();

      $ionicPlatform.ready(function() {
              $scope.images = FileService.images();
              $scope.$apply();
            });

            $scope.urlForImage = function(imageName) {
              var trueOrigin = cordova.file.dataDirectory + imageName;
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
              // TODO: Enviar peticio al servidor
            };
          }
  ]);
