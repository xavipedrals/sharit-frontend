angular.module('app.controllers')
  .controller('DashboardCtrl', ['$scope',
    '$rootScope', '$translate',
    '$translatePartialLoader',
    '$state', 'StubsFactory',
    '$ionicHistory', 'AnuncioFactory',
    '$q', '$http', 'myConfig', '$ionicHistory',
    function($scope, $rootScope, $translate, $translatePartialLoader, $state, StubsFactory, $ionicHistory, AnuncioFactory, $q, $http, myConfig, $ionicHistory) {
      $translatePartialLoader.addPart('dashboard');
      $translate.refresh();

      $scope.changetorequests = function () {
        $ionicHistory.nextViewOptions({disableBack: true});
        $state.go('app.requestsDashboard');
      };

      $scope.$state = $state;
      //$scope.items = StubsFactory;
      var _selected;

      $scope.selected = "";

      $scope.ngModelOptionsSelected = function (value) {
        if (arguments.length) {
          _selected = value;
        } else {
          return _selected;
        }
      };

      // TODO: Remove all this shit and put it in a fuckin' service!
      //get user data
      var q = $q.defer();
      $http({
        method: 'GET',
        url: myConfig.url + ':' + myConfig.port + '/user',
        headers: {'token': window.localStorage.getItem('token')}
      }).then(function successCallback(response) {
        console.log('Soc aqui');
        console.log(JSON.stringify(response.data));

        $rootScope.currentUser = new Object();
        $rootScope.currentUser.id = response.data.IDuser;
        $rootScope.currentUser.name = response.data.Name;
        $rootScope.currentUser.surname = response.data.Surname;
        $rootScope.currentUser.FavUser = response.data.FavUser;
        q.resolve(response);
      }, function errorCallback(response) {
        q.reject();
      });

      AnuncioFactory.getAnuncios().then(function (anuncios) {
        $scope.itemNames = [];
        for (i = 0; i < anuncios.length; i++) {
          if (typeof anuncios[i].Image1 === 'undefined' || anuncios[i].Image1 === null || anuncios[i].Image1 === '') {
            anuncios[i].Image1 = 'assets/img/box.png';
          }
          if (typeof anuncios[i].ItemName === 'undefined' || anuncios[i].ItemName === null || anuncios[i].ItemName === '') {
            anuncios[i].ItemName = 'Caja sorpresa';
          }
          $scope.itemNames.push(anuncios[i].ItemName);
        }
        $scope.items = anuncios;
        //console.log($scope.itemNames);
      });

      $scope.goToDetail = function (item) {
        // console.log($index);
        $rootScope.actualProduct = item;
        $rootScope.actualProduct.id = item.Idd;
        $rootScope.actualProduct.lenderUserId = item.IDuser;
        console.log(item);
        $state.go('app.productDetail');
      }

      for (var j in $scope.items) {
        var item = $scope.items[j];

        $htmlstars = '';

        for (var i = 0; i < item.Stars; i++) {
          $htmlstars += '⭐';
        }

        $scope.items[j].htmlestrellitas = $htmlstars;
      }
    }]);
