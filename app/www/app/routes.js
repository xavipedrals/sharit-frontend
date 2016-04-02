angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

    .state('app', {
      url: '/app',
      templateUrl: 'app/common/menu/menu.html',
      controller: 'MenuCtrl',
      abstract: true
    })

    .state('app.dashboard', {
      url: '/dashboard',
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
      views: {
        'menuContent': {
          templateUrl: 'app/userProfile/userProfile.html',
          controller: 'UserProfileCtrl'
        }
      }
    })

  .state('app.requestsDashboard', {
    url: '/requests-dashboard',
    views: {
      'menuContent': {
        templateUrl: 'app/requestsDashboard/requestsDashboard.html',
        controller: 'RequestsDashboardCtrl'
      }
    }
  })

  .state('app.chatList', {
    url: '/chat-list',
    views: {
      'menuContent': {
        templateUrl: 'app/chatList/chatList.html',
        controller: 'ChatListCtrl'
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

    .state('app.addProduct', {
      url: '/add-product',
      views: {
        'menuContent': {
          templateUrl: 'app/addProduct/addProduct.html',
          controller: 'AddProductCtrl'
        }
      }
    });

  $urlRouterProvider.otherwise('/app/dashboard');
});
