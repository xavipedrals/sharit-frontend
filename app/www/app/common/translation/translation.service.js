angular.module('app.services')
	.factory('TranslateService', ['$rootScope',
		function($rootScope) {
			var LANG_STORAGE_KEY = 'lang';

			function setLanguage(language) {
				window.localStorage.setItem(LANG_STORAGE_KEY, language);
	          $rootScope.$broadcast('LANG_CHANGED', language);
			};

			function getLanguage() {
				return window.localStorage.getItem(LANG_STORAGE_KEY);
			};

			return {
				get: getLanguage,
				set: setLanguage
			};
		}
	]);