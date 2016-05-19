angular.module('app.services')
	.factory('AuthService', ['$http', '$cookies', 'myConfig', '$cordovaOauth', '$timeout', '$q',
		function($http, $cookies, myConfig, $cordovaOauth, $timeout, $q) {
			// $timeout dependency injected because of the inexistence of an API
			var _ = window._;
      var TOKEN_STORAGE_KEY = 'token';
			var currentUser = getCurrentUser();

			var baseUrl = myConfig.url + ':' + myConfig.port + '/user';
			// REMOVE IN REPOSITORY!
			var GOOGLE_CLIENTID = '36015451376-g3u3npojfn225ff2v85eln4224agimm9.apps.googleusercontent.com';

			var TWITTER_KEY = 'a0yDQUBqAMPbUbl3NGnS0f5y4';
			var TWITTER_SECRET = 'its a secret';

			function getCurrentUser() {
        var token = window.localStorage.getItem(TOKEN_STORAGE_KEY);
        var user = {};
				if (typeof token !== 'undefined' && !(token === null)) {
					var encoded = token.split('.')[1];
					user = JSON.parse(window.atob(encoded));
				}
				return user;
			}

			var isAuthenticated = function() {
        return !(_.isEmpty(currentUser));
			};

      var login = function (email, pass) {
        var q = $q.defer();
        $http.get(baseUrl + '/login', {
          params: {
            "email": email,
            "pass": pass
          }
        }).then(function successCallback(response) {
          window.localStorage.setItem(TOKEN_STORAGE_KEY, response.data.Token);
          currentUser = getCurrentUser();
          q.resolve(response);
        }, function errorCallback(response) {
          console.log("Error al GET user/login");
          console.log(response);
          q.reject();
        });
        return q.promise;
      };

			var googleLogin = function () {
				var promise = new Promise(function(resolve, reject) {
					$cordovaOauth.google(GOOGLE_CLIENTID, ['email', 'profile'])
						.then(function(result) {
							// TODO: Send the token to the server.
							$cookies.put('auth_token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InZveG11cmVzIn0.qJ1xy6fWTrmzIuG6bRMdGKdpcLhQFjWVmrpFe3B09gM');
							currentUser = getCurrentUser();
							resolve();
						}, function(error) {
							console.log(error);
							reject(error);
						});
				});
				return promise;
			};

			var twitterLogin = function () {
				var promise = new Promise(function(resolve, reject) {
					$cordovaOauth.twitter(TWITTER_KEY, TWITTER_SECRET)
						.then(function(result) {
							// TODO: Send the token to the server.
							$cookies.put('auth_token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InZveG11cmVzIn0.qJ1xy6fWTrmzIuG6bRMdGKdpcLhQFjWVmrpFe3B09gM');
							currentUser = getCurrentUser();
							resolve();
						}, function(error) {
							console.log(error);
							reject(error);
						});
				});
				return promise;
			};

			var facebookLogin = function () {
				var promise = new Promise(function(resolve, reject) {
					$cordovaOauth.facebook(GOOGLE_CLIENTID, ['email', 'profile'])
						.then(function(result) {
							// TODO: Send the token to the server.
							$cookies.put('auth_token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InZveG11cmVzIn0.qJ1xy6fWTrmzIuG6bRMdGKdpcLhQFjWVmrpFe3B09gM');
							currentUser = getCurrentUser();
							resolve();
						}, function(error) {
							console.log(error);
							reject(error);
						});
				});
				return promise;
			};

			var signup = function(name, surname, email, password) {
        console.log(baseUrl);
        var data = {
          name: name,
          surname: surname,
          email: email,
          pass: password
        };
        console.log(data);
				//var promise = new Promise(function(resolve) {
				// 	$http.post(baseUrl, {name: name, surname: surname, email: email, pass: password}).then(function(response) {
            // console.log(response);
            // console.log(response.data);
            // console.log(response.data.Token);
            // console.log(response.data.Iduser);
            //
            // //console.log(response.data.token);
            // //var aux = JSON.toJson(response.data);
            // //console.log(aux);
            // //console.log(aux.token);
            // //console.log(response.data.token);
            // //console.log(response.data.iduser);
            //
            // window.localStorage.setItem(TOKEN_STORAGE_KEY, response.data.Token);
            //
            // $cookies.put('auth_token', response.data.Token);
				// 		currentUser = getCurrentUser();
				// 	});

        //var promise = new Promise(function(resolve) {

        var q = $q.defer();

        $http({
          method  : 'POST',
          url     : baseUrl,
          data    : data,
          headers : {'Content-Type': 'application/json'}
          //TODO: Comment line above when CORS is poperly configured
        }).then(function successCallback(response) {
          console.log(response);
          window.localStorage.setItem(TOKEN_STORAGE_KEY, response.data.Token);
          //currentUser = getCurrentUser();
          //TODO: Uncomment line above when CORS is poperly configured
          q.resolve(response);
        }, function errorCallback(response) {
          console.log("Puta bida");
          console.log(response);
          q.reject();
        });

        return q.promise;

        //});
				//return promise;


			};

			return {
				login: login,
				googleLogin: googleLogin,
				twitterLogin: twitterLogin,
				signup: signup,
				isAuthenticated: isAuthenticated,
				getCurrentUser: function () { return currentUser; }
			}
		}
	]);
