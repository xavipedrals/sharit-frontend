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
						currentProduct = response.data.It;
						resolve(response.data);
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
				return new Boolean(_.find($rootScope.currentUser.FavUser, ['IDitem', currentProduct.Idd])).valueOf();
			};

			// Set or unset an item as favourite to the current user.
			// If unset param is true, then unset the item as favourite.
			var setFavourite = function(unset) {
				return new Promise(function(resolve, reject) {
					if (_.isEmpty(currentProduct)) {
						console.log('currentProduct is empty');
						throw "Product not available";
					}
					$http({
						method: (unset ? 'DELETE' : 'POST'),
						url: baseUrl + '/fav',
						data: {
							'IDitem': currentProduct.Idd,
							'IDuser': currentProduct.IDuser
						},
						// TODO: Capture every request and add the token automatically
						headers: {'token': window.localStorage.getItem(myConfig.TOKEN_STORAGE_KEY)}
					})
					.then(function(response) {
						// TODO: Remove currentUser from $rootScope
						$rootScope.currentUser.FavUser = response.FavUser;
						resolve(response);
					}, function(error) {
						console.log((unset ? 'DELETE' : 'POST') + '/fav failed: ' + error);
						reject(error);
					});
				});
			};

			// var owner = function() {
			// 	return new Promise(function(resolve, reject) {
			// 		if (_.isEmpty(currentProduct)) {
			// 			console.log('currentProduct is empty');
			// 			throw "Product not available";
			// 		}
			// 		$http({
			// 			method: 'GET',
			// 			url: baseUrl + '/user',
			// 			params: {
			// 				'id': currentProduct.IDuser
			// 			},
			// 			// TODO: Capture every request and add the token automatically
			// 			headers: {'token': window.localStorage.getItem(myConfig.TOKEN_STORAGE_KEY)}
			// 		})
			// 		.then(function(response) {
			// 			debugger;
			// 			resolve(response);
			// 		}, function(error) {
			// 			console.log('GET /user failed: ' + error);
			// 			reject(error);
			// 		})
			// 	})
			// }

			return {
				get: get,
				isFavourite: isFavourite,
				setFavourite: setFavourite,
				//owner: owner
			}
		}
	]);