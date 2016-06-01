angular.module('app.controllers')
	.controller('ComplaintsCtrl', [ '$scope', '$stateParams', '$ionicHistory', 'ComplaintService',
		function($scope, $stateParams, $ionicHistory, ComplaintService) {
			$scope.makeComplaint = function() {
				ComplaintService.create($stateParams.itemId, $stateParams.ownerId)
					.then(function(response) {
						$ionicHistory.goBack();
					}, function(error) {
						// TODO: Do something when failing!
					})
			}
		}
	]);