angular.module('app.controllers')
	.controller('ComplaintsCtrl', [ '$scope', '$stateParams', '$ionicHistory', 'ComplaintService', '$translate', '$translatePartialLoader',
		function($scope, $stateParams, $ionicHistory, ComplaintService, $translate, $translatePartialLoader) {
			$translatePartialLoader.addPart('configuration');
			$translate.refresh();

			$scope.$on('LANG_CHANGED', function(event) {
	          $translate.use(event.language);
	        });

			$scope.makeComplaint = function() {
				ComplaintService.create($stateParams.itemId, $stateParams.ownerId)
					.then(function(response) {
						$ionicHistory.goBack();
					}, function(error) {
						// TODO: Do something when failing!
					});
			};
		}
	]);