angular.module('app.services')
	.factory('ProductService', ['$http', 'myConfig', '$rootScope',
		function($http, myConfig, $rootScope) {
			var _ = window._;
			var baseUrl = myConfig.url + ':' + myConfig.port;
			var currentProduct = {};

			var get = function(itemId, userId) {
				return new Promise(function(resolve, reject) {
					$http({
						method: 'GET',
						url: baseUrl + '/anuncio',
						params: {
							'idItem': itemId,
							'idUser': userId
						},
						// TODO: Capture every request and add the token automatically
						headers: {'token': window.localStorage.getItem(myConfig.TOKEN_STORAGE_KEY)}	
					})
					.then(function(response) {
						currentProduct = response.data;
						resolve(currentProduct);
					}, function(error) {
						console.log('GET /anuncio failed: ' + error);
						reject(error);
					});
				});
			};

			// Check if the current product is favourite to the current user
			var isFavourite = function() {
				if (_.isEmpty(currentProduct)) {
					console.log('currentProduct is empty');
					throw "Product not available";
				}
				// TODO: Remove currentUser from $rootScope
				return _.includes($rootScope.currentUser.FavUser, currentProduct.Idd);
			};

			var setFavourite = function() {
				return new Promise(function(resolve, reject) {
					if (_.isEmpty(currentProduct)) {
						console.log('currentProduct is empty');
						throw "Product not available";
					} 
					$http({
						method: 'POST',
						url: baseUrl + '/fav',
						data: {
							'IDitem': currentProduct.itemId,
							'IDuser': currentProduct.userId
						},
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

			var unsetFavourite = function() {
				return new Promise(function(resolve, reject) {
					if (_.isEmpty(currentProduct)) {
						console.log('currentProduct is empty');
						throw "Product not available";
					}
					$http({
						method: 'DELETE',
						url: baseUrl + '/fav',
						data: {
							'IDitem': currentProduct.itemId,
							'IDuser': currentProduct.userId
						},
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
			};

			return {
				get: get,
				isFavourite: isFavourite,
				setFavourite: setFavourite,
				unsetFavourite: unsetFavourite
			}
		}
	]);