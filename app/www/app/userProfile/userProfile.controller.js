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
        if(typeof info.Image === 'undefined' || info.Image === null || info.Image === ''){
          info.Image = 'assets/img/boy.png';
        }
        if(info.Stars == '0') info.Stars = 4;
        $scope.userInfo = info;

        for (i = 0; i < info.ItemsUser.length; i++) {
          if (typeof info.ItemsUser[i].Image1 === 'undefined' || info.ItemsUser[i].Image1 === null || info.ItemsUser[i].Image1 === '') {
            info.ItemsUser[i].Image1 = 'assets/img/box.png';
          }
          if (typeof info.ItemsUser[i].ItemName === 'undefined' || info.ItemsUser[i].ItemName === null || info.ItemsUser[i].ItemName === '') {
            info.ItemsUser[i].ItemName = 'Caja sorpresa';
          }
        }
        $scope.anunciosUser = info.ItemsUser;

        NgMap.getMap().then(function(map) {
          map.setCenter({ lat: $scope.userInfo.X, lng: $scope.userInfo.Y });
          map.setZoom(10);
          new google.maps.Marker({position: {lat: $scope.userInfo.X, lng: $scope.userInfo.Y}, map: map});
        });

      });

      $scope.goToDetail = function (item) {
        // console.log($index);
        $rootScope.actualProduct = item;
        $state.go('app.productDetail');
      };

      $scope.sayHello = function () {
        console.log("Hola");
      }

	 }
 ]);

