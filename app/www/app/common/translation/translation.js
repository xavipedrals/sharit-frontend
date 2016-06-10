angular.module('app.translation', ['pascalprecht.translate'])
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
  ])
  .config(['$translateProvider', '$translatePartialLoaderProvider',
  	function($translateProvider, $translatePartialLoaderProvider) {
	    $translateProvider.useLoader('$translatePartialLoader', {
	      urlTemplate: 'assets/translations/{lang}/{part}.json'
	    });

  		$translateProvider.preferredLanguage('es-ES');
  		
	  }
  ])
  .run(['TranslateService', '$translate', function(TranslateService, $translate) {
    var userLanguage = TranslateService.get();
      if (userLanguage != null)
       $translate.use(userLanguage);
      else { 
       TranslateService.set('es-ES');
       $translate.use('es-ES');
    }
  }]);