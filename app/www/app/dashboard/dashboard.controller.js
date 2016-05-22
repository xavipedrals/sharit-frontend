angular.module('app.controllers')
  .controller('DashboardCtrl', ['$scope',
    '$rootScope', '$translate',
    '$translatePartialLoader',
    '$state', 'StubsFactory',
    '$ionicHistory', 'AnuncioFactory',
    '$q', '$http', 'myConfig',
    function($scope, $rootScope, $translate, $translatePartialLoader, $state, StubsFactory, $ionicHistory, AnuncioFactory, $q, $http, myConfig) {
      $translatePartialLoader.addPart('dashboard');
      $translate.refresh();

      $scope.changetorequests = function() {
        $ionicHistory.nextViewOptions({ disableBack: true});
        $state.go('app.requestsDashboard');
      };

      $scope.$state = $state;
      //$scope.items = StubsFactory;

      //get user data
      var q = $q.defer();
      console.log("token:" + window.localStorage.getItem('token'));
      $http({
        method: 'GET',
        url: myConfig.url + ':' + myConfig.port + '/user',
        headers: {'token': window.localStorage.getItem('token')}
      }).then(function successCallback(response) {
        console.log(JSON.stringify(response.data));
        $scope.currentUser = new Object();
        $scope.currentUser.id = response.data.ID;
        $scope.currentUser.name = response.data.Name;
        $scope.currentUser.surname = response.data.Surname;
        console.log(JSON.stringify($scope.currentUser));
        q.resolve(response);
      }, function errorCallback(response) {
        q.reject();
      });

      AnuncioFactory.getAnuncios().then(function (anuncios) {
        //console.log(anuncios);
        for (i = 0; i < anuncios.length; i++) {
          if(typeof anuncios[i].Image1 === 'undefined' || anuncios[i].Image1 === null || anuncios[i].Image1 === ''){
            anuncios[i].Image1 = 'assets/img/box.png';
          }
          if(typeof anuncios[i].ItemName === 'undefined' || anuncios[i].ItemName === null || anuncios[i].ItemName === ''){
            anuncios[i].ItemName = 'Caja sorpresa';
          }
        }
        //console.log(anuncios);
        $scope.items = anuncios;
      });

      $scope.goToDetail = function (item) {
        // console.log($index);
        $rootScope.actualProduct = item;
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
