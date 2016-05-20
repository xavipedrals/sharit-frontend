
angular.module('app.services', [])
  .factory('StubsFactory', ['$http', function ($http) {
    return [
      {
        name: 'Hammer',
        imgUrl: 'assets/img/s3H3Hyn0Rn0tv96qQEsc_martillo.jpg',
        stars: 3,
        description: "Deixo el meu martell de fusta. és nou de fa poc i es troba en perfectes condicions. També serveix per treure claus.",
        lastSharit: "Fa una setmana",
        ownerName: "Dani Gil",
        location: "51.503333, -0.127500"

      },
      {
        name: 'Stairs',
        imgUrl: 'assets/img/SCoBGo4hTsChNUhEKt1B_escalera-madera.jpg',
        stars: 5,
        description: "Deixo la meva escala. És de mida mitjana i pesa poc.",
        lastSharit: "Fa un mes",
        ownerName: "Xavi Pedrals",
        location: "38.897778,-77.036667"
      },
      {
        name: 'Taladro (Trepant)',
        imgUrl: 'assets/img/VjM6q6RuSv2jUaKFFdtA_taladro.JPG',
        stars: 4,
        description: "Deixo la meu taladro. És gran i fa uns bons forats.",
        lastSharit: "Fa 3 dies",
        ownerName: "Marçal Peiró",
        location: "44.419246, 38.205275"
      }
    ]
  }])

  .factory('FileService', function () {
    var images;
    var IMAGE_STORAGE_KEY = 'images';

    function getImages() {
      var img = window.localStorage.getItem(IMAGE_STORAGE_KEY);
      if (img) {
        images = JSON.parse(img);
      } else {
        images = [];
      }
      return images;
    }

    function addImage(img) {
      images.push(img);
      window.localStorage.setItem(IMAGE_STORAGE_KEY, JSON.stringify(images));
    }

    return {
      storeImage: addImage,
      images: getImages
    }
  })

  .factory('ImageService', ['$cordovaCamera', 'FileService', '$q', '$cordovaFile', '$cordovaImagePicker', function ($cordovaCamera, FileService, $q, $cordovaFile, $cordovaImagePicker) {
    function makeid() {
      var text = '';
      var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

      for (var i = 0; i < 5; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
      }
      return text;
    }

    function optionsForType(type) {
      var source;
      switch (type) {
        case 0:
          source = Camera.PictureSourceType.CAMERA;
          break;
        case 1:
          source = Camera.PictureSourceType.PHOTOLIBRARY;
          break;
      }
      return {
        quality: 50,
        destinationType: Camera.DestinationType.FILE_URI,
        sourceType: source,
        targetWidth: 200,
        targetHeight: 200,
        allowEdit: false,
        encodingType: Camera.EncodingType.JPEG,
        //popoverOptions: CameraPopoverOptions,
        saveToPhotoAlbum: false
      };
    }

    function saveMedia(type) {
      return $q(function (resolve, reject) {
        var options = optionsForType(type);

        // if(type = 1) {
          $cordovaCamera.getPicture(options).then(function (imageUrl) {
            //console.log("imageUrl-> " + imageUrl);
            console.log(imageUrl.indexOf('?'));
            var realUri = null;
            if (imageUrl.indexOf('?') != -1) {
              realUri = imageUrl.substr(0, imageUrl.indexOf('?'));
              //console.log("realUri-> " + realUri);
            } else {
              realUri = imageUrl;
              //console.log("realUri-> " + realUri);
            }
            var name = realUri.substr(realUri.lastIndexOf('/') + 1);
            //console.log("name-> " + name);
            var namePath = realUri.substr(0, realUri.lastIndexOf('/') + 1);
            //console.log("namePath-> " + namePath);

            var newName = makeid() + name;
            $cordovaFile.copyFile(namePath, name, cordova.file.dataDirectory, newName)
              .then(function (info) {
                FileService.storeImage(newName);
                resolve();
              }, function (e) {
                reject();
              });
          });
      })

    }

    return {
      handleMediaDialog: saveMedia
    }
  }])

  .factory('socket', function (socketFactory) {
    //Create socket and connect to http://chat.socket.io
    var myIoSocket = io.connect('http://chat.socket.io');

    return socketFactory({
      ioSocket: myIoSocket
    });
  })

  .factory('HttpCalls', ['$http', '$q', 'myConfig', function ($http, $q, myConfig) {
    var baseUrl = myConfig.url + ':' + myConfig.port;

    function getAnuncios() {
      var q = $q.defer();

      $http({
        method: 'GET',
        url: baseUrl + '/anuncios',
        headers: {'token': window.localStorage.getItem(myConfig.TOKEN_STORAGE_KEY)}
      }).then(function successCallback(response) {
        console.log("Exito");
        console.log(response);
        q.resolve(response);
      }, function errorCallback(response) {
        console.log("Puta bida");
        console.log(response);
        q.reject();
      });
      return q.promise;
    }

    var postAnuncio = function (title, description) {
      var data = {
        name: title,
        description: description
      };
      var q = $q.defer();

      $http({
        method: 'POST',
        url: baseUrl + '/anuncio',
        data: data,
        headers: {'token': window.localStorage.getItem(myConfig.TOKEN_STORAGE_KEY), 'Content-Type': 'application/json'}
      }).then(function successCallback(response) {
        console.log("Exito");
        console.log(response);
        q.resolve(response);
      }, function errorCallback(response) {
        console.log("Puta bida");
        console.log(response);
        q.reject();
      });
      return q.promise;
    };

    var postPeticion = function (title, description) {
      var data = {
        name: title,
        description: description
      };
      var q = $q.defer();

      $http({
        method: 'POST',
        url: baseUrl + '/peticion',
        data: data,
        headers: {'token': window.localStorage.getItem(myConfig.TOKEN_STORAGE_KEY), 'Content-Type': 'application/json'}
      }).then(function successCallback(response) {
        console.log("Exito");
        console.log(response);
        q.resolve(response);
      }, function errorCallback(response) {
        console.log("Puta bida");
        console.log(response);
        q.reject();
      });
      return q.promise;
    };

    return {
      postAnuncio: postAnuncio,
      postPeticion: postPeticion,
      getAnuncios: getAnuncios
    }
  }]);

//   .factory('httpCallsManager', ['$q', 'http', function ($http, ) {
// }])
//
//
// var promise = new Promise(function(resolve) {
//   $http.post('http://52.34.79.154:8080/user/putItem', {
//     params: {
//       "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE0NjIyNjU3MzEsInVzZXJpZCI6ImRHVnpkR3h2WjJsdVRXRnlZMkZzYkd4VGVXeDJaWE4wY21seiJ9.ymlVy9SDuFk2r2VKhVSbd4dPKZObVLknJ_z5rG0cYO0",
//       "name": "Martell",
//       "description": "Prova de descripció",
//       "image": "-1"
//     }
//   }).then(function(response) {
//     console.log(response);
//     console.log(response.data);
//
//     //TODO: Guardar camps al local storage
//     //console.log(response.data.token);
//     //var aux = JSON.toJson(response.data);
//     //console.log(aux);
//     //console.log(aux.token);
//     //console.log(response.data.token);
//     //console.log(response.data.iduser);
//
//     //$cookies.put('auth_token', response.token);
//     //currentUser = getCurrentUser();
//   });
// });
// return promise;
