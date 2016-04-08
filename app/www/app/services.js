angular.module('app.services', [])

  .factory('StubsFactory', ['$http', function ($http) {
    return [
      {
        name: 'Hammer',
        imgUrl: 'assets/img/s3H3Hyn0Rn0tv96qQEsc_martillo.jpg',
        stars: 3,
        description: "Deixo el meu martell de fusta. és nou de fa poc i es troba en perfectes condicions. També serveix per treure claus.",
        lastSharit: "Fa una setmana",
        ownerName: "Dani Gil"

      },
      {
        name: 'Stairs',
        imgUrl: 'assets/img/SCoBGo4hTsChNUhEKt1B_escalera-madera.jpg',
        stars: 5,
        description: "Deixo la meva escala. És de mida mitjana i pesa poc.",
        lastSharit: "Fa un mes",
        ownerName: "Xavi Pedrals"
      },
      {
        name: 'Taladro (Trepant)',
        imgUrl: 'assets/img/VjM6q6RuSv2jUaKFFdtA_taladro.JPG',
        stars: 4,
        description: "Deixo la meu taladro. És gran i fa uns bons forats.",
        lastSharit: "Fa 3 dies",
        ownerName: "Marçal Peiró"
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
            console.log("imageUrl-> " + imageUrl);

            var name = imageUrl.substr(imageUrl.lastIndexOf('/') + 1);

            console.log("name-> " + name);
            var namePath = imageUrl.substr(0, imageUrl.lastIndexOf('/') + 1);

            console.log("namePath-> " + namePath);
            var newName = makeid() + name;
            $cordovaFile.copyFile(namePath, name, cordova.file.dataDirectory, newName)
              .then(function (info) {
                FileService.storeImage(newName);
                resolve();
              }, function (e) {
                reject();
              });
          });
        // } else if (type = 0){
        //   var options1 = {
        //     maximumImagesCount: 2,
        //     width: 800,
        //     height: 800,
        //     quality: 80
        //   };
        //
        //   $cordovaImagePicker.getPictures(options1)
        //     .then(function (results) {
        //       for (var i = 0; i < results.length; i++) {
        //         console.log('Image URI: ' + results[i]);
        //       }
        //     }, function(error) {
        //       // error getting photos
        //     });
        // }
      })

    }

    return {
      handleMediaDialog: saveMedia
    }
  }]);

