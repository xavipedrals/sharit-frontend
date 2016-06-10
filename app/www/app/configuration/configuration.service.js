angular.module('app.services')
	.factory('ConfigurationService', ['$http', '$rootScope', 'myConfig',
		function($http, $rootScope, myConfig) {
			var baseUrl = myConfig.url + ':' + myConfig.port;

			var update = function(user) {
				return new Promise(function(resolve, reject) {
					$http({
						method: 'PUT',
						url: baseUrl + '/user',
						data: user,
						// TODO: Capture every request and add the token automatically
						headers: {'token': window.localStorage.getItem(myConfig.TOKEN_STORAGE_KEY)}
					})
					.then(function(response) {
						resolve(response.data);
					}, function(error) {
						console.log('PUT /user failed: ' + error);
						reject(error);
					})
				});
			};

			return {
				update: update
			};
		}
	]);