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
      $translatePartialLoader.addPart('request');
      $translate.refresh();

      $ionicPlatform.ready(function() {
              $scope.images = FileService.images();
              //$scope.$apply();
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
                //$scope.$apply();
              });
            };


            $scope.submitProduct = function (product) {
              this.submittedProduct = product;
              product.requesterName = 'testUser';
              console.log(this.submittedProduct);
              // TODO: Enviar peticio al servidor

              /*
              Remove this comment when server api is ready

               var request = require('request');

               // Set the headers
               var headers = {
               'User-Agent':       'Super Agent/0.0.1',
               'Content-Type':     'application/x-www-form-urlencoded'
               }

               // Configure the request
               var options = {
               url: 'http://whatever.pizza',
               method: 'POST',
               headers: headers,
               form: {'requesterName': 'xxx', 'productName': 'yyy', 'description' : 'zzz'}
               }

               // Start the request
               request(options, function (error, response, body) {
               if (!error && response.statusCode == 200) {
               // Print out the response body
               console.log(body)
               }
               })

               */
              var requests = localStorage.getItem('requests');
              console.log(requests);
              if (requests === undefined || requests == null) requests = [{'requesterName': 'testUser',
                'productName': product.title,
                'description' : product.description}];

              else {
                requests = JSON.parse(requests);
                console.log(requests);
                requests.push({'requesterName': 'testUser',
                  'productName': product.title,
                  'description' : product.description})
              }
              requests = JSON.stringify(requests);
              localStorage.setItem('requests', requests);
              $state.go('app.requestsDashboard',{}, {reload: true});


              /*var requests = localStorage.getItem('requests');
              if (requests === undefined || requests == null) requests = product;
              else requests.push(product);
              localStorage.setItem('requests', JSON.stringify(requests));*/


            };
          }
  ]);
