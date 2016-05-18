angular.module('app.controllers')
	.controller('SignupCtrl', ['$scope', '$state', 'AuthService',
		function($scope, $state, AuthService) {

      $scope.input = {};
      $scope.signup = function() {
				var promise = AuthService.signup($scope.input.name, $scope.input.surname, $scope.input.email, $scope.input.password);
				promise
					.then(function() {
						$state.go('app.dashboard');
					})
					.catch(function(e) {
						// TODO: Do something if authentication went wrong
						console.log('Signup failed!');
					})
			}
		}
	]);
