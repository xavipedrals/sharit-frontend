angular.module('app.controllers')
	.controller('SignupCtrl', ['$scope', '$state', 'AuthService', '$cordovaGeolocation',
		function($scope, $state, AuthService, $cordovaGeolocation) {

      $scope.input = {};
      $scope.signup = function() {
		      	$cordovaGeolocation.getCurrentPosition({
			        timeout: 10000,
			        enableHighAccuracy: false
		        }).then(function(position) {
		        	var promise = AuthService.signup($scope.input.name, $scope.input.surname, $scope.input.email, $scope.input.password, position);
				promise
					.then(function() {
						$state.go('app.dashboard');
					})
					.catch(function(e) {
						// TODO: Do something if authentication went wrong
						console.log('Signup failed!');
					})
		        })
				
			}
		}
	]);
