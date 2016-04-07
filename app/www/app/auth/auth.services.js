angular.module('app.services')
	.factory('AuthService', ['$http', '$cookies', '$timeout',
		function($http, $cookies, $timeout) {
			// $timeout dependency injected because of the inexistence of an API
			var _ = window._;
			var currentUser = getCurrentUser();

			function getCurrentUser() {
				var token = $cookies.get('auth_token');
				var user = {};
				if (typeof token !== 'undefined') {
					var encoded = token.split('.')[1];
					user = JSON.parse(window.atob(encoded));
				}
				return user;
			}

			var isAuthenticated = function() {
				return !(_.isEmpty(currentUser));
			}

			var login = function (username, password) {
				// TODO: Replace this code with $http call
				var promise = $timeout(function() {
					var response = { success: true, message: '', data: 
						'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InZveG11cmVzIn0.qJ1xy6fWTrmzIuG6bRMdGKdpcLhQFjWVmrpFe3B09gM' 
					};
					$cookies.put('auth_token', response.data);
					currentUser = getCurrentUser();
					//return getCurrentUser();
				}, 1000);
				return promise;
			};

			return {
				login: login,
				isAuthenticated: isAuthenticated,
				getCurrentUser: function () { return currentUser; }
			}
		}
	]);