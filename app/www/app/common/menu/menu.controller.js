angular.module('app.controllers')
	.controller('MenuCtrl', ['$translate', '$translatePartialLoader',
		function($translate, $translatePartialLoader) {
			$translatePartialLoader.addPart('menu');
				$translate.refresh();
		}
	]);
