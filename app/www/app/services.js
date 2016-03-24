angular.module('app.services', [])

.factory('StubsFactory', ['$http', function($http){
    return [
        {
            name: 'Hammer',
            imgUrl: 'assets/img/s3H3Hyn0Rn0tv96qQEsc_martillo.jpg',
            stars: 3
        },
        {
            name: 'Stairs',
            imgUrl: 'assets/img/SCoBGo4hTsChNUhEKt1B_escalera-madera.jpg',
            stars: 5
        }
    ]
}]);

// .service('BlankService', [function(){

// }]);

