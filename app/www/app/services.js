angular.module('app.services', [])

.factory('StubsFactory', ['$http', function($http){
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
}]);

// .service('BlankService', [function(){

// }]);

