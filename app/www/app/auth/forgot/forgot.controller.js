angular.module('app.controllers')
	.controller('ForgotCtrl', ['$scope', '$state', 'AuthService',
		function($scope, $state, AuthService) {
			$scope.sendMail = function() {
				var promise = AuthService.sendMail($scope.email);
				promise
					.then(function() {
					//Send Email
					})
					.catch(function(e) {
						// TODO: Do something if authentication went wrong
						console.log('Sending email failed!');
					})
			}
		}
	]);
