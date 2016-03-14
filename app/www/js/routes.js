angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider
    
  

      .state('menu.taulellDAnuncis', {
    url: '/page1',
    views: {
      'side-menu21': {
        templateUrl: 'templates/taulellDAnuncis.html',
        controller: 'taulellDAnuncisCtrl'
      }
    }
  })

  .state('menu.taulellDePeticions', {
    url: '/page17',
    views: {
      'side-menu21': {
        templateUrl: 'templates/taulellDePeticions.html',
        controller: 'taulellDePeticionsCtrl'
      }
    }
  })

  .state('menu.petici', {
    url: '/page18',
    views: {
      'side-menu21': {
        templateUrl: 'templates/petici.html',
        controller: 'peticiCtrl'
      }
    }
  })

  .state('menu.martellDeFusta', {
    url: '/page7',
    views: {
      'side-menu21': {
        templateUrl: 'templates/martellDeFusta.html',
        controller: 'martellDeFustaCtrl'
      }
    }
  })

  .state('menu.EscalaMitjana', {
    url: '/page11',
    views: {
      'side-menu21': {
        templateUrl: 'templates/EscalaMitjana.html',
        controller: 'EscalaMitjanaCtrl'
      }
    }
  })

  .state('menu.escalaMitjana', {
    url: '/page14',
    views: {
      'side-menu21': {
        templateUrl: 'templates/escalaMitjana.html',
        controller: 'escalaMitjanaCtrl'
      }
    }
  })

  .state('menu.valoracions', {
    url: '/page9',
    views: {
      'side-menu21': {
        templateUrl: 'templates/valoracions.html',
        controller: 'valoracionsCtrl'
      }
    }
  })

  .state('menu.denunciarObjecte', {
    url: '/page10',
    views: {
      'side-menu21': {
        templateUrl: 'templates/denunciarObjecte.html',
        controller: 'denunciarObjecteCtrl'
      }
    }
  })

  .state('menu.perfil', {
    url: '/page2',
    views: {
      'side-menu21': {
        templateUrl: 'templates/perfil.html',
        controller: 'perfilCtrl'
      }
    }
  })

  .state('menu.preferits', {
    url: '/page3',
    views: {
      'side-menu21': {
        templateUrl: 'templates/preferits.html',
        controller: 'preferitsCtrl'
      }
    }
  })

  .state('menu.actuals', {
    url: '/page15',
    views: {
      'side-menu21': {
        templateUrl: 'templates/actuals.html',
        controller: 'actualsCtrl'
      }
    }
  })

  .state('menu.peticions', {
    url: '/page21',
    views: {
      'side-menu21': {
        templateUrl: 'templates/peticions.html',
        controller: 'peticionsCtrl'
      }
    }
  })

  .state('menu.xats', {
    url: '/page5',
    views: {
      'side-menu21': {
        templateUrl: 'templates/xats.html',
        controller: 'xatsCtrl'
      }
    }
  })

  .state('menu.xat', {
    url: '/page16',
    views: {
      'side-menu21': {
        templateUrl: 'templates/xat.html',
        controller: 'xatCtrl'
      }
    }
  })

  .state('menu.configuraci', {
    url: '/page6',
    views: {
      'side-menu21': {
        templateUrl: 'templates/configuraci.html',
        controller: 'configuraciCtrl'
      }
    }
  })

  .state('menu.afegirProducte', {
    url: '/page12',
    views: {
      'side-menu21': {
        templateUrl: 'templates/afegirProducte.html',
        controller: 'afegirProducteCtrl'
      }
    }
  })

  .state('menu.ferPetici', {
    url: '/page19',
    views: {
      'side-menu21': {
        templateUrl: 'templates/ferPetici.html',
        controller: 'ferPeticiCtrl'
      }
    }
  })

  .state('menu.editarProducte', {
    url: '/page13',
    views: {
      'side-menu21': {
        templateUrl: 'templates/editarProducte.html',
        controller: 'editarProducteCtrl'
      }
    }
  })

  .state('menu.editarPetici', {
    url: '/page20',
    views: {
      'side-menu21': {
        templateUrl: 'templates/editarPetici.html',
        controller: 'editarPeticiCtrl'
      }
    }
  })

  .state('menu', {
    url: '/side-menu21',
    templateUrl: 'templates/menu.html',
    abstract:true
  })

$urlRouterProvider.otherwise('/side-menu21/page1')

  

});