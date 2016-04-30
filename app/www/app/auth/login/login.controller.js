angular.module('app.controllers')
	.controller('LoginCtrl', ['$scope', '$state', 'AuthService',
		function($scope, $state, AuthService) {
			if (AuthService.isAuthenticated())
				$state.go('app.dashboard');

			$scope.login = function() {


				var promise = AuthService.login($scope.username, $scope.password);
				promise
					.then(function() {
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
