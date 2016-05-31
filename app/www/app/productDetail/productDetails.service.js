angular.module('app.services')
	.factory('ProductService', ['$http', 'myConfig', '$rootScope',
		function($http, myConfig, $rootScope) {
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

			var setFavourite = function(id) {
				return new Promise(function(resolve, reject) {
					$http({
						method: 'POST',
						url: baseUrl + '/fav',
						data: {
							'IDitem': id,
							'IDuser': $rootScope.currentUser.id	// It may be the id of the owner, and not the current user ones.
																// TODO: Set currentUser as a variable in a service.
						}
						// TODO: Capture every request and add the token automatically
						headers: {'token': window.localStorage.getItem(myConfig.TOKEN_STORAGE_KEY)}
					})
					.then(function(response) {
						resolve(response);
					}, function(error) {
						console.log('POST /fav failed: ' + error);
						reject(error);
					});
				});
			};

			var unsetFavourite = function(id) {
				return new Promise(function(resolve, reject) {
					$http({
						method: 'DELETE',
						url: baseUrl + '/fav',
						data: {
							'IDitem': id,
							'IDuser': $rootScope.currentUser.id	// It may be the id of the owner, and not the current user ones.
																// TODO: Set currentUser as a variable in a service.
						}
						// TODO: Capture every request and add the token automatically
						headers: {'token': window.localStorage.getItem(myConfig.TOKEN_STORAGE_KEY)}
					})
					.then(function(response) {
						resolve(response);
					}, function(error) {
						console.log('DELETE /fav failed: ' + error);
						reject(error);
					});
				});
			}

			return {
				get: get,
				setFavourite: setFavourite,
				unsetFavourite: unsetFavourite
			}
		}
	]);