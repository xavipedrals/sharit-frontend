angular.module('app.controllers')
	.controller('ForgotCtrl', ['$scope', '$state', 'AuthService', '$ionicPopup',
		function($scope, $state, AuthService, $ionicPopup) {
			$scope.sendMail = function() {
				var promise = AuthService.forgot($scope.email);
				promise
					.then(function() {
					//Send Email
					$state.go('app.auth.login');

					})
					.catch(function(e) {
						// TODO: Do something if authentication went wrong
               var alertPopup = $ionicPopup.alert({
                 title: 'No se ha podido enviar el mail',
                 template: 'Introduce un mail válido'
               });

               alertPopup.then(function(res) {
                 console.log('Email error');
               });
          });
        console.log('Sending email failed!');
      }
    }
	]);





