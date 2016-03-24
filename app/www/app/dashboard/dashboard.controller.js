angular.module('app.controllers')
	.controller('DashboardCtrl', ['$scope', '$rootScope', '$translate', '$translatePartialLoader', '$state', 'StubsFactory',
		function($scope, $rootScope, $translate, $translatePartialLoader, $state, StubsFactory) {
			$translatePartialLoader.addPart('dashboard');
  			$translate.refresh();

      $scope.$state = $state;
      $scope.items = StubsFactory;
      $scope.goToDetail = function ($index) {
        // console.log($index);
        $rootScope.actualProductIndex = $index;
        $state.go('productDetail');
      }

		}
	]);
