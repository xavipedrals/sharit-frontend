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
    '$http',
    function($scope, $rootScope, $translate, $translatePartialLoader, $state, StubsFactory, $cordovaDevice, $cordovaFile, $ionicPlatform, $ionicActionSheet, ImageService, FileService, $http) {
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

        // var promise = new Promise(function(resolve) {
        //   $http.post('http://52.34.79.154:8080/user/putItem', {
        //     params: {
        //       "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE0NjIyNjU3MzEsInVzZXJpZCI6ImRHVnpkR3h2WjJsdVRXRnlZMkZzYkd4VGVXeDJaWE4wY21seiJ9.ymlVy9SDuFk2r2VKhVSbd4dPKZObVLknJ_z5rG0cYO0",
        //       "name": "Martell",
        //       "description": "Prova de descripció",
        //       "image": "-1"
        //     }
        //   }).then(function(response) {
        //     console.log(response);
        //     console.log(response.data);
        //
        //     //TODO: Guardar camps al local storage
        //     //console.log(response.data.token);
        //     //var aux = JSON.toJson(response.data);
        //     //console.log(aux);
        //     //console.log(aux.token);
        //     //console.log(response.data.token);
        //     //console.log(response.data.iduser);
        //
        //     //$cookies.put('auth_token', response.token);
        //     //currentUser = getCurrentUser();
        //   });

          $http({
            method: 'POST',
            url: 'http://52.34.79.154:8080/user/putItem',
            params: {
              "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE0NjIyNjgyMTAsInVzZXJpZCI6ImRHVnpkR3h2WjJsdVRXRnlZMkZzYkd4VGVXeDJaWE4wY21seiJ9.L8CaDm7iVFThL2unSfAd037zlumeoaBm5eZtsu74W4I",
              "name": "Taladro",
              "description": "Prova de descripció",
              "image": "-1"
            }
          }).then(function successCallback(response) {
            console.log(response);
          });
        };

        // });
        // return promise;

      //};
    }
  ]);
