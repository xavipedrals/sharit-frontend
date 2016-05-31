angular.module('app.translation', ['pascalprecht.translate'])
  .config(function($translateProvider, $translatePartialLoaderProvider ) {
    $translateProvider.useLoader('$translatePartialLoader', {
      urlTemplate: 'assets/translations/{lang}/{part}.json'
    });

  $translateProvider.preferredLanguage('es-ES');
});