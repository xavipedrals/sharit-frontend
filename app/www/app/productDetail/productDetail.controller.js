angular.module('app.controllers').controller('ProductDetailCtrl', ['$scope', '$rootScope', '$translate', '$translatePartialLoader', '$state', '$stateParams', 'StubsFactory', 'NgMap', '$q', '$http', 'myConfig', 'ProductService',
    function($scope, $rootScope, $translate, $translatePartialLoader, $state, $stateParams, StubsFactory, NgMap, $q, $http, myConfig, ProductService) {
      	// TODO: Remove this i18n methods from controller
      	$translatePartialLoader.addPart('productDetail');
      	$translate.refresh();

      	$scope.productImage = '';
      	$scope.canAskForProduct = '';

      	var favoriteImgs = ['assets/img/not_fav.png', 'assets/img/fav.png'];
      	var favoriteImgsIndex = 0;
      	$scope.favoriteImg = favoriteImgs[favoriteImgsIndex];

      	// Get the accessed product
      	ProductService.get($stateParams.itemId, $stateParams.ownerId)
      		.then(function(response) {
      			$scope.product = response;
      			$scope.productImage = $scope.product.Image1;
		      	$scope.canAskForProduct = $scope.product.IDuser != $rootScope.currentUser.id;
		      	if (ProductService.isFavourite()) {
		      		favoriteImgsIndex = 1;
		      		$scope.favoriteImg = favoriteImgs[favoriteImgsIndex];
		      	}
		      	$scope.$apply();
      		}, function(error) {
      			// TODO: Do something when failing!
      		});

      	$scope.toggleFavorite = function () {
    		ProductService.setFavourite(favoriteImgsIndex)
    			.then(function(response) {
	          		favoriteImgsIndex ^= 1;
	          		$scope.favoriteImg = favoriteImgs[favoriteImgsIndex];
	          		$scope.$apply();
    			}, function(error) {
    				// TODO: Do something when failing!
    			});
      	};

      $scope.showValoracions = function () {
        $state.go('app.valoracions');
      }

      NgMap.getMap().then(function(map) {
        map.setCenter({ lat: 41.403841, lng: 2.174340 });
        map.setZoom(10);
        new google.maps.Marker({position: {lat: 41.403841, lng: 2.174340}, map: map});
      });

      $scope.startChat = function () {
        //get user data
        var q = $q.defer();
        $http({
          	method: 'POST',
          	url: myConfig.url + ':' + myConfig.port + '/room/create',
         	data: {
	          	'UserID1': $rootScope.currentUser.id,
	            'UserID2': $scope.product.IDuser,
	            'ItemID' : $scope.product.id 
        	}
        }).then(function successCallback(response) {
          console.log(JSON.stringify(response.data));
          $rootScope.currentRoom = new Object();
          $rootScope.currentRoom.roomId = response.data.RoomId;
          $rootScope.currentRoom.userId1= response.data.UserID1;
          $rootScope.currentRoom.userName1= response.data.NameU1;
          $rootScope.currentRoom.userId2= response.data.UserID2;
          $rootScope.currentRoom.userName2= response.data.NameU2;
          $rootScope.currentRoom.messages= new Array();
          $state.go('app.chat');
          q.resolve(response);
        }, function errorCallback(response) {
          q.reject();
        });
      }
    }
  ]);
