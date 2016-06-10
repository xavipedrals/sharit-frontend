angular.module('app.controllers')
	.controller('LoginCtrl', ['$scope', '$state', 'AuthService', '$translate',
		function($scope, $state, AuthService, $translate) {
			if (AuthService.isAuthenticated()) {
				$state.go('app.dashboard');
			}

      $scope.input = {};
			$scope.login = function() {
				var promise = AuthService.login($scope.input.email, $scope.input.pass);
				promise
					.then(function(response) {
						$state.go('app.dashboard');
            console.log('Auth success!');
					})
					.catch(function(e) {
						// TODO: Do something if authentication went wrong
						console.log('Authentication failed!');
					});
			};

			$scope.googleLogin = function() {
				AuthService.googleLogin()
					.then(function() {
						$state.go('app.dashboard');
					})
					.catch(function(e) {
						// TODO: Do something if authentication went wrong
						console.log('Google authentication failed!');
					});
			};

			$scope.twitterLogin = function() {
				AuthService.twitterLogin()
					.then(function() {
						$state.go('app.dashboard');
					})
					.catch(function(e) {
						// TODO: Do something if authentication went wrong
						console.log('Twitter authentication failed!');
					});
			};

			$scope.facebookLogin = function() {
				AuthService.facebookLogin()
					.then(function() {
						$state.go('app.dashboard');
					})
					.catch(function(e) {
						// TODO: Do something if authentication went wrong
						console.log('Facebook authentication failed!');
					});
			};
		}
	]);
