angular.module('app.controllers')
.controller('ConfigurationCtrl', ['$scope', '$rootScope', '$translate', '$translatePartialLoader', '$state', 'NgMap', 'ProfileFactory', 'AuthService', '$ionicActionSheet', 'ImageService', 'FileService', '$cordovaGeolocation', 'ConfigurationService',
	function($scope, $rootScope, $translate, $translatePartialLoader, $state, NgMap, ProfileFactory, AuthService, $ionicActionSheet, ImageService, FileService, $cordovaGeolocation, ConfigurationService) {
		$translatePartialLoader.addPart('configuration');
		$translate.refresh();

    $scope.settings = {};
    var user = {};

		ProfileFactory.getGeneralInfo().then(function (info) {
        user = info;
        $scope.settings = {
          'name': info.Name,
          'surname': info.Surname,
          'position': {
            'x': info.X,
            'y': info.Y
          },
          'lang': info.Idioma,
          'image': (info.Image == '' ? 'assets/img/boy.png' : info.Image),
          'radius': info.Radi
        }

        NgMap.getMap().then(function(map) {
          map.setCenter({ lat: $scope.settings.position.x, lng: $scope.settings.position.y });
          map.setZoom(10);
          new google.maps.Marker({ position: { lat: $scope.settings.position.x, lng: $scope.settings.position.y }, map: map });
        });
    });

    $scope.changeImage = function() {
      // TODO: Translate that resources
      $scope.hideSheet = $ionicActionSheet.show({
        buttons: [
          { text: 'Take photo' },
          { text: 'Photo from library' }
        ],
        titleText: 'Add images',
        cancelText: 'Cancel',
        buttonClicked: function(index) {
          addImage(index);
        }
      });
    };

    var addImage = function(type) {
        $scope.hideSheet();
        FileService.images('settings'); // This call has to be done to create the array that contains the user image.
                                        // TODO: Fix the problem of having to use this call
        ImageService.handleMediaDialog(type, 'settings').then(function(data) {
          $scope.settings.image = data;
          FileService.removeImages('settings');
        });
      };

    $scope.setLocation = function() {
      $cordovaGeolocation.getCurrentPosition({
        timeout: 10000,
        enableHighAccuracy: false
      })
      .then(function (position) {
        $scope.settings.position.x = position.coords.latitude;
        $scope.settings.position.y = position.coords.longitude;

        NgMap.getMap().then(function(map) {
          map.setCenter({ lat: $scope.settings.position.x, lng: $scope.settings.position.y });
          map.setZoom(10);
          new google.maps.Marker({ position: { lat: $scope.settings.position.x, lng: $scope.settings.position.y }, map: map });
        });
      }, function (error) {
        // TODO: Show something when failing!
      })
    };

    $scope.logout = function() {
      AuthService.logout();

      // Remove all the tokens
      FileService.removeImages('request');
      FileService.removeImages('product');
      FileService.removeImages('settings');

      $state.go('login');
    };

    $scope.saveChanges = function() {
      // Prepare the data to submit
      user.Name = $scope.settings.name;
      user.Surname = $scope.settings.surname;
      user.Idioma = $scope.settings.lang;
      user.Image = $scope.settings.image;
      user.Radi = $scope.settings.radius;
      user.X = $scope.settings.position.x;
      user.Y = $scope.settings.position.y;

      ConfigurationService.update(user)
        .then(function(response) {
          $translate.use(response.Idioma);
          $translate.refresh();
        }, function(error) {
          // TODO: Show something when failing!
        })
    };
  }
]);
