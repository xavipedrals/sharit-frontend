 angular.module('app.controllers').controller('UserProfileCtrl',
   ['$scope', '$rootScope', '$translate',
     '$translatePartialLoader', '$state',
     'StubsFactory', 'NgMap', 'ProfileFactory',
    function($scope, $rootScope, $translate, $translatePartialLoader, $state, StubsFactory, NgMap, ProfileFactory) {
 		$translatePartialLoader.addPart('profile');
 		$translate.refresh();


      ProfileFactory.getGeneralInfo().then(function (info) {
        console.log(info);
        if(info.X == '1' && info.Y == '1'){
          info.X = 41.403841;
          info.Y = 2.174340;
        }
        if(typeof info.Image1 === 'undefined' || info.Image1 === null || info.Image1 === ''){
          info.Image1 = 'assets/img/boy.png';
        }
        if(info.Stars == '0') info.Stars = 4;
        $scope.userInfo = info;

        NgMap.getMap().then(function(map) {
          map.setCenter({ lat: $scope.userInfo.X, lng: $scope.userInfo.Y });
          map.setZoom(10);
          new google.maps.Marker({position: {lat: $scope.userInfo.X, lng: $scope.userInfo.Y}, map: map});
        });

      });



	 }
 ]);

