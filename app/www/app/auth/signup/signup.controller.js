angular.module('app.controllers')
	.controller('SignupCtrl', ['$scope', '$state', 'AuthService',
		function($scope, $state, AuthService) {
			$scope.signup = function() {
				var promise = AuthService.signup($scope.name, $scope.username, $scope.password);
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