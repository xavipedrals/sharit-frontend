angular.module('app.controllers')
.controller('RateProductCtrl', ['$scope', '$rootScope', '$translate', '$translatePartialLoader', '$state', 'NgMap', 'StubsFactory', 'ProfileFactory',
  function($scope, $rootScope, $translate, $translatePartialLoader, $state, NgMap, StubsFactory, ProfileFactory) {
    $translatePartialLoader.addPart('rateProduct');
    $translate.refresh();
    $scope.$state = $state;

    ProfileFactory.getGeneralInfo().then(function (info) {
        console.log(info);
        if(info.X == '1' && info.Y == '1'){
          info.X = 41.403841;
          info.Y = 2.174340;
        }

        $scope.userInfo = info;

        NgMap.getMap().then(function(map) {
          map.setCenter({ lat: $scope.userInfo.X, lng: $scope.userInfo.Y });
          map.setZoom(10);
          new google.maps.Marker({position: {lat: $scope.userInfo.X, lng: $scope.userInfo.Y}, map: map});
        });

      });
  }
  ]);
