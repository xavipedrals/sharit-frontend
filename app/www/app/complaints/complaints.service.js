angular.module('app.services')
	.factory('ComplaintService', ['$http', 'myConfig',
		function($http, myConfig) {
			var baseUrl = myConfig.url + ':' + myConfig.port;

			var create = function(itemId, userId) {
				return new Promise(function(resolve, reject) {
					$http({
						method: 'POST',
						url: baseUrl + '/complain',
						data: {
							'IDitem': itemId,
							'IDuser': userId
						},
						// TODO: Capture every request and add the token automatically
						headers: {'token': window.localStorage.getItem(myConfig.TOKEN_STORAGE_KEY)}
					})
					.then(function(response) {
						resolve();
					}, function(error) {
						console.log('POST /complain failed: ' + error);
						reject(error);
					});
				});
			};

			return {
				create: create
			};
		}
	]);
