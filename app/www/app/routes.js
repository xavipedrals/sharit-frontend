angular.module('app.routes', [])

.config(['$locationProvider', '$stateProvider', '$urlRouterProvider',
  function($locationProvider, $stateProvider, $urlRouterProvider) {
    // $locationProvider.html5Mode({
    //   enabled: true,
    //   requireBase: false
    // });
    $stateProvider
      .state('login', {
        url: '/login',
        templateUrl: 'app/auth/login/login.html',
        controller: 'LoginCtrl'
      })
      .state('signup', {
        url: '/signup',
        templateUrl: 'app/auth/signup/signup.html',
        controller: 'SignupCtrl'
      })
       .state('forgot', {
         url: '/forgot',
         templateUrl: 'app/auth/forgot/forgot.html',
         controller: 'ForgotCtrl'
       })
      .state('app', {
        url: '/app',
        templateUrl: 'app/common/menu/menu.html',
        controller: 'MenuCtrl',
        abstract: true,
        // resolve: {
        //   isAuthenticated: ['AuthService', function(AuthService) {
        //     if (!AuthService.isAuthenticated()) {
        //       throw 'Not authorized';
        //     }
        //   }]
        // }
      })
      .state('app.dashboard', {
        url: '/dashboard',
        cache: false,
        views: {
          'menuContent': {
            templateUrl: 'app/dashboard/dashboard.html',
            controller: 'DashboardCtrl'
          }
        }
      })
      .state('app.productDetail', {
        url: '/product-detail',
        views: {
          'menuContent': {
            templateUrl: 'app/productDetail/productDetail.html',
            controller: 'ProductDetailCtrl'
          }
        }
      })
      .state('app.userProfile', {
        url: '/user-profile',
        cache: false,
        views: {
          'menuContent': {
            templateUrl: 'app/userProfile/userProfile.html',
            controller: 'UserProfileCtrl'
          }
        }
      })
    .state('app.requestsDashboard', {
      url: '/requests-dashboard',
      cache: false,
      views: {
        'menuContent': {
          templateUrl: 'app/requestsDashboard/requestsDashboard.html',
          controller: 'RequestsDashboardCtrl'
        }
      }
    })
    .state('app.chat', {
      url: '/chat',
      views: {
        'menuContent': {
          templateUrl: 'app/chat/chat.html',
          controller: 'ChatCtrl'
        }
      }
    })
      .state('app.chatRooms', {
        url: '/chat-rooms',
        cache: false,
        views: {
          'menuContent': {
            templateUrl: 'app/chatRooms/chatRooms.html',
            controller: 'ChatRoomsCtrl'
          }
        }
      })
    .state('app.requestProduct', {
        url: '/request-product',
        views: {
          'menuContent': {
            templateUrl: 'app/requestProduct/requestProduct.html',
            controller: 'RequestProductCtrl'
          }
        }
      })
    .state('app.valoracions', {
          url: '/valoracions',
          views: {
            'menuContent': {
              templateUrl: 'app/valoracions/valoracions.html',
              controller: 'ValoracionsCtrl'
            }
          }
        })
    .state('app.configuration', {
          url: '/configuration',
          views: {
            'menuContent': {
              templateUrl: 'app/configuration/configuration.html',
              controller: 'ConfigurationCtrl'
            }
          }
        })
    .state('app.rateProduct', {
        url: '/rateProduct',
        views: {
          'menuContent': {
            templateUrl: 'app/rateProduct/rateProduct.html',
            controller: 'RateProductCtrl'
          }
        }
      })
      .state('app.addProduct', {
        url: '/add-product',
        views: {
          'menuContent': {
            templateUrl: 'app/addProduct/addProduct.html',
            controller: 'AddProductCtrl'
          }
        }
      });
    $urlRouterProvider.otherwise('/login');
  }
])

.run(['$rootScope', '$state',
  function($rootScope, $state) {
    $rootScope.$on('$stateChangeError', function(e, toState, toParams, fromState, fromParams, error) {
      //if (error === 'Not authorized') {
      //  console.log(error);
      //  $state.go('login');
      //}
    })
  }
]);
