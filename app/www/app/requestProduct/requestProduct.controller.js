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
        ImageService.handleMediaDialog(type, true).then(function () {
          //$scope.$apply();
        });
      };


      $scope.submitRequest = function () {
        // this.submittedProduct = product;
        // product.requesterName = 'testUser';
        // console.log(this.submittedProduct);
        // TODO: Enviar peticio al servidor
        PeticionFactory.createPeticion($scope.request.title, $scope.request.description, $scope.images[0]).then(function (response) {
          console.log("Funciona");
          //console.log(response);
        });
        
        var requests = localStorage.getItem('requests');
        console.log(requests);
        if (requests === undefined || requests == null) requests = [{
          'requesterName': 'testUser',
          'productName': product.title,
          'description': product.description
        }];

        else {
          requests = JSON.parse(requests);
          console.log(requests);
          requests.push({
            'requesterName': 'testUser',
            'productName': product.title,
            'description': product.description
          })
        }
        requests = JSON.stringify(requests);
        localStorage.setItem('requests', requests);
        //$state.go('app.requestsDashboard', {}, {reload: true});
        $ionicHistory.goBack();

        /*var requests = localStorage.getItem('requests');
         if (requests === undefined || requests == null) requests = product;
         else requests.push(product);
         localStorage.setItem('requests', JSON.stringify(requests));*/


      };
    }
  ]);
