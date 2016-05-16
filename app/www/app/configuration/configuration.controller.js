angular.module('app.controllers')
.controller('ConfigurationCtrl', ['$scope', '$rootScope', '$translate', '$translatePartialLoader', '$state', 'StubsFactory',
	function($scope, $rootScope, $translate, $translatePartialLoader, $state, StubsFactory) {
		$translatePartialLoader.addPart('configuration');
		$translate.refresh();
		$scope.$state = $state;
	}
	]);
