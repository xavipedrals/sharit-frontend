angular.module('app.controllers')
	.controller('DashboardCtrl', ['$scope', '$translate', '$translatePartialLoader',
		function($scope, $translate, $translatePartialLoader) {
			$translatePartialLoader.addPart('dashboard');
  			$translate.refresh();
		}
	]);