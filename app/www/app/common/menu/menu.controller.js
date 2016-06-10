angular.module('app.controllers')
	.controller('MenuCtrl', ['$scope', '$translate', '$translatePartialLoader',
		function($scope, $translate, $translatePartialLoader) {
			$translatePartialLoader.addPart('menu');
			$translate.refresh();

			$scope.$on('LANG_CHANGED', function(event, lang) {
				debugger;
	          $translate.use(lang);
	          $translate.refresh();
	          $scope.$apply();
	        });
		}
	]);
