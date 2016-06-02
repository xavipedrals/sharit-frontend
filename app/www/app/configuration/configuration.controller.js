angular.module('app.controllers')
.controller('ConfigurationCtrl', ['$scope', '$rootScope', '$translate', '$translatePartialLoader', '$state', 'NgMap', 'ProfileFactory', 'AuthService',
	function($scope, $rootScope, $translate, $translatePartialLoader, $state, NgMap, ProfileFactory, AuthService) {
		$translatePartialLoader.addPart('configuration');
		$translate.refresh();
		
    $scope.settings = {};

		ProfileFactory.getGeneralInfo().then(function (info) {

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

    $scope.logout = function() {
      AuthService.logout();
      $state.go('login');
    };

    $scope.setLocation = function() {
      // TODO: Set location via GPS.
    };

    $scope.saveChanges = function() {
      // TODO: Update the user.
    };
  }
]);
