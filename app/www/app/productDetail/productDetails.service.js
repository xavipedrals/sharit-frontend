angular.module('app.services')
	.factory('ProductService', ['$http', 'myConfig',
		function($http, myConfig) {
			var baseUrl = myConfig.url + ':' + myConfig.port;

			var get = function(id) {
				return new Promise(function(resolve, reject) {
					$http({
						method: 'GET',
						url: baseUrl + '/anuncio',
						params: {
							'idItem': id
						},
						// TODO: Capture every request and add the token automatically
						headers: {'token': window.localStorage.getItem(myConfig.TOKEN_STORAGE_KEY)}	
					})
					.then(function(response) {
						resolve(response);
					}, function(error) {
						console.log('GET /anuncio failed: ' + error);
						reject(error);
					});
				});
			};

			return {
				get: get
			}
		}
	]);