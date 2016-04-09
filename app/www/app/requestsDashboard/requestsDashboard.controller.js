angular.module('app.controllers')
  .controller('RequestsDashboardCtrl', ['$scope', '$rootScope', '$translate', '$translatePartialLoader', '$state', 'StubsFactory',
    function($scope, $rootScope, $translate, $translatePartialLoader, $state, StubsFactory) {
      $translatePartialLoader.addPart('request');
      $translate.refresh();;
      $scope.$state = $state;

      $scope.$on('$ionicView.beforeEnter', function () {
        $scope.items = JSON.parse(localStorage.getItem('requests'));
      });

      $scope.requestProduct = function () {
        $state.go('app.requestProduct');
      }
      $scope.items = JSON.parse(localStorage.getItem('requests'));
      console.log($scope.items);
    }
  ]);



/*
 var requests;
 try {
 requests = localStorage.requests;
 }
 catch (err) {
 requests =
 "[{'requesterName': 'person1', 'productName': 'product1', 'description' : 'description1'}," +
 "{'requesterName': 'person2', 'productName': 'product2', 'description' : 'description2'}," +
 "{'requesterName': 'person2', 'productName': 'product2', 'description' : 'description2'}]";
 localStorage.requests = requests;
 }
 */
