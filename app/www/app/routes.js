angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider
    .state('dashboard', {
      url: '/',
      templateUrl: 'app/dashboard/dashboard.html',
      controller: 'DashboardCtrl'
    });
  
  // .state('menu', {
  //   url: '/side-menu',
  //   templateUrl: 'assets/templates/menu.html',
  //   abstract:true
  // })

  // .state('menu.dashboard', {
  //   url: '/',
  //   views: {
  //     'dashboard': {
  //       templateUrl: 'app/dashboard/dashboard.html',
  //       controller: 'DashboardCtrl'
  //     }
  //   }
  // })

  // .state('menu.taulellDePeticions', {
  //   url: '/page17',
  //   views: {
  //     'side-menu21': {
  //       templateUrl: 'assets/templates/taulellDePeticions.html',
  //       controller: 'taulellDePeticionsCtrl'
  //     }
  //   }
  // })

  // .state('menu.petici', {
  //   url: '/page18',
  //   views: {
  //     'side-menu21': {
  //       templateUrl: 'assets/templates/petici.html',
  //       controller: 'peticiCtrl'
  //     }
  //   }
  // })

  // .state('menu.martellDeFusta', {
  //   url: '/page7',
  //   views: {
  //     'side-menu21': {
  //       templateUrl: 'assets/templates/martellDeFusta.html',
  //       controller: 'martellDeFustaCtrl'
  //     }
  //   }
  // })

  // .state('menu.EscalaMitjana', {
  //   url: '/page11',
  //   views: {
  //     'side-menu21': {
  //       templateUrl: 'assets/templates/EscalaMitjana.html',
  //       controller: 'EscalaMitjanaCtrl'
  //     }
  //   }
  // })

  // .state('menu.escalaMitjana', {
  //   url: '/page14',
  //   views: {
  //     'side-menu21': {
  //       templateUrl: 'assets/templates/escalaMitjana.html',
  //       controller: 'escalaMitjanaCtrl'
  //     }
  //   }
  // })

  // .state('menu.valoracions', {
  //   url: '/page9',
  //   views: {
  //     'side-menu21': {
  //       templateUrl: 'assets/templates/valoracions.html',
  //       controller: 'valoracionsCtrl'
  //     }
  //   }
  // })

  // .state('menu.denunciarObjecte', {
  //   url: '/page10',
  //   views: {
  //     'side-menu21': {
  //       templateUrl: 'assets/templates/denunciarObjecte.html',
  //       controller: 'denunciarObjecteCtrl'
  //     }
  //   }
  // })

  // .state('menu.perfil', {
  //   url: '/page2',
  //   views: {
  //     'side-menu21': {
  //       templateUrl: 'assets/templates/perfil.html',
  //       controller: 'perfilCtrl'
  //     }
  //   }
  // })

  // .state('menu.preferits', {
  //   url: '/page3',
  //   views: {
  //     'side-menu21': {
  //       templateUrl: 'assets/templates/preferits.html',
  //       controller: 'preferitsCtrl'
  //     }
  //   }
  // })

  // .state('menu.actuals', {
  //   url: '/page15',
  //   views: {
  //     'side-menu21': {
  //       templateUrl: 'assets/templates/actuals.html',
  //       controller: 'actualsCtrl'
  //     }
  //   }
  // })

  // .state('menu.peticions', {
  //   url: '/page21',
  //   views: {
  //     'side-menu21': {
  //       templateUrl: 'assets/templates/peticions.html',
  //       controller: 'peticionsCtrl'
  //     }
  //   }
  // })

  // .state('menu.xats', {
  //   url: '/page5',
  //   views: {
  //     'side-menu21': {
  //       templateUrl: 'assets/templates/xats.html',
  //       controller: 'xatsCtrl'
  //     }
  //   }
  // })

  // .state('menu.xat', {
  //   url: '/page16',
  //   views: {
  //     'side-menu21': {
  //       templateUrl: 'assets/templates/xat.html',
  //       controller: 'xatCtrl'
  //     }
  //   }
  // })

  // .state('menu.configuraci', {
  //   url: '/page6',
  //   views: {
  //     'side-menu21': {
  //       templateUrl: 'assets/templates/configuraci.html',
  //       controller: 'configuraciCtrl'
  //     }
  //   }
  // })

  // .state('menu.afegirProducte', {
  //   url: '/page12',
  //   views: {
  //     'side-menu21': {
  //       templateUrl: 'assets/templates/afegirProducte.html',
  //       controller: 'afegirProducteCtrl'
  //     }
  //   }
  // })

  // .state('menu.ferPetici', {
  //   url: '/page19',
  //   views: {
  //     'side-menu21': {
  //       templateUrl: 'assets/templates/ferPetici.html',
  //       controller: 'ferPeticiCtrl'
  //     }
  //   }
  // })

  // .state('menu.editarProducte', {
  //   url: '/page13',
  //   views: {
  //     'side-menu21': {
  //       templateUrl: 'assets/templates/editarProducte.html',
  //       controller: 'editarProducteCtrl'
  //     }
  //   }
  // })

  // .state('menu.editarPetici', {
  //   url: '/page20',
  //   views: {
  //     'side-menu21': {
  //       templateUrl: 'assets/templates/editarPetici.html',
  //       controller: 'editarPeticiCtrl'
  //     }
  //   }
  // })

  // .state('login', {
  //   url: '/page22',
  //   templateUrl: 'assets/templates/login.html',
  //   controller: 'loginCtrl'
  // })

  // .state('signup', {
  //   url: '/page23',
  //   templateUrl: 'assets/templates/signup.html',
  //   controller: 'signupCtrl'
  // })

$urlRouterProvider.otherwise('/');

});