angular.module('app.controllers')
  .controller('RequestProductCtrl', ['$scope',
    '$rootScope',
    '$translate',
    '$translatePartialLoader',
    '$state', 'StubsFactory',
    '$cordovaDevice', '$cordovaFile',
    '$ionicPlatform', '$ionicActionSheet',
    'ImageService', 'FileService',
    'PeticionFactory',
    '$ionicHistory',
    function($scope, $rootScope, $translate, $translatePartialLoader, $state, StubsFactory, $cordovaDevice, $cordovaFile, $ionicPlatform, $ionicActionSheet, ImageService, FileService, PeticionFactory, $ionicHistory) {
      $translatePartialLoader.addPart('request');
      $translate.refresh();

      $scope.$on('LANG_CHANGED', function(event) {
          $translate.use(event.language);
        });
      
      $scope.request = {}; // TODO: Cache the request values
      $scope.images = FileService.images(true);

      $scope.addMedia = function () {
        if ($scope.images.length < 1) {
          $scope.hideSheet = $ionicActionSheet.show({
            buttons: [
              {text: 'Take photo'},
              {text: 'Photo from library'}
            ],
            titleText: 'Add images',
            cancelText: 'Cancel',
            buttonClicked: function (index) {
              $scope.addImage(index);
            }
          });
        } else {
          // TODO: Show toast to inform that the user has reached the limit.
        }
        
      };

      $scope.addImage = function (type) {
        $scope.hideSheet();
        ImageService.handleMediaDialog(type, 'request').then(function () {
          //$scope.$apply();
        });
      };


      $scope.submitRequest = function () {
        PeticionFactory.createPeticion($scope.request.title, $scope.request.description, $scope.images[0]).then(function (response) {
          $scope.request = {};
          $scope.images = [];
          //$ionicHistory.goBack();
        });
        
        // var requests = localStorage.getItem('requests');
        // console.log(requests);
        // if (requests === undefined || requests == null) requests = [{
        //   'requesterName': 'testUser',
        //   'productName': $scope.request.title,
        //   'description': $scope.request.description
        // }];

        // else {
        //   requests = JSON.parse(requests);
        //   console.log(requests);
        //   requests.push({
        //     'requesterName': 'testUser',
        //     'productName': $scope.request.title,
        //     'description': $scope.request.description
        //   })
        // }
        // requests = JSON.stringify(requests);
        // localStorage.setItem('requests', requests);
      };
    }
  ]);
