angular.module('app.controllers')
	.controller('DashboardCtrl', ['$scope', '$translate', '$translatePartialLoader', 'StubsFactory',
		function($scope, $translate, $translatePartialLoader, StubsFactory) {
			$translatePartialLoader.addPart('dashboard');
  			$translate.refresh();

            $scope.items = StubsFactory;
		}
	]);