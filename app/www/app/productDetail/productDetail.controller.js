angular.module('app.controllers').controller('ProductDetailCtrl', ['$scope', '$rootScope', '$translate', '$translatePartialLoader', '$state', '$stateParams', 'StubsFactory', 'NgMap', '$q', '$http', 'myConfig', 'ProductService',
    function($scope, $rootScope, $translate, $translatePartialLoader, $state, $stateParams, StubsFactory, NgMap, $q, $http, myConfig, ProductService) {
      	// TODO: Remove this i18n methods from controller
      	$translatePartialLoader.addPart('productDetail');
      	$translate.refresh();

      	$scope.productImage = '';
      	$scope.canAskForProduct = '';
        $scope.ownerData = {};

      	var favoriteImgs = ['assets/img/not_fav.png', 'assets/img/fav.png'];
      	var favoriteImgsIndex = 0;
      	$scope.favoriteImg = favoriteImgs[favoriteImgsIndex];

      	// Get the accessed product
      	ProductService.get($stateParams.itemId, $stateParams.ownerId)
      		.then(function(response) {
            console.log(response);
            $scope.ownerData = {
              'id': response.IDuser,
              'name': response.Name + ' ' + response.Surname,
              'position': {
                'x': response.X,
                'y': response.Y
              }
            };
      			$scope.product = response.It;
      			$scope.productImage = $scope.product.Image1;
		      	$scope.canAskForProduct = $scope.product.IDuser != $rootScope.currentUser.id;

            NgMap.getMap().then(function(map) {
              map.setCenter({ lat: $scope.ownerData.position.x, lng: $scope.ownerData.position.y });
              map.setZoom(10);
              new google.maps.Marker({position: {lat: $scope.ownerData.position.x, lng: $scope.ownerData.position.y }, map: map});
            });

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

      $scope.startChat = function () {
        //creo una nova transaccio
        var q = $q.defer();
        console.log('PRODUCTE');
        console.log(JSON.stringify($scope.actualProduct,1,1));
        console.log('iduser pel david: ', $scope.actualProduct.IDuser);
        $http({
          method: 'POST',
          url: myConfig.url + ':' + myConfig.port + '/transaccion',
          headers: {'token': window.localStorage.getItem('token')},
          data: {'itemID': $scope.actualProduct.Idd,
            'iduser': $scope.actualProduct.IDuser}
        }).then(function successCallback(response) {
          console.log('UN COP CREADA LA TRANSACCO');
          console.log(JSON.stringify(response.data, 1, 1));
          //creo una nova room
          var r = $q.defer();
          $http({
            method: 'POST',
            url: myConfig.url + ':' + myConfig.port + '/room/create',
            data: {'UserID1': $rootScope.currentUser.id,
              'UserID2': $rootScope.actualProduct.lenderUserId,
              'ItemID' : $rootScope.actualProduct.id,
              'idtrans' : response.data.IDTrans /*barbaraTrans*/}
          }).then(function successCallback(response2) {
            console.log(JSON.stringify(response2.data));
            $rootScope.currentRoom = new Object();
            $rootScope.currentRoom.roomId = response2.data.RoomId;
            $rootScope.currentRoom.userId1= response2.data.UserID1;
            $rootScope.currentRoom.userName1= response2.data.NameU1;
            $rootScope.currentRoom.userId2= response2.data.UserID2;
            $rootScope.currentRoom.userName2= response2.data.NameU2;
            $rootScope.currentRoom.messages= new Array();
            $state.go('app.chat');
            r.resolve(response2);
          }, function errorCallback(response2) {
            r.reject();
          });
          q.resolve(response);
        }, function errorCallback(response) {
          q.reject();
        });
      };

      $scope.goToUserProfile = function (id) {
        console.log("go to user profile "+ id);
        $rootScope.actualUserId = id;
        $state.go('app.otherUserProfile');
      }
    }
  ]);
