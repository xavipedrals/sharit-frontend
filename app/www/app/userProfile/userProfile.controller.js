 angular.module('app.controllers').controller('UserProfileCtrl', ['$scope', '$rootScope', '$translate', '$translatePartialLoader', '$state', 'StubsFactory', 'NgMap',
    function($scope, $rootScope, $translate, $translatePartialLoader, $state, StubsFactory, NgMap) {
 		$translatePartialLoader.addPart('profile');
 		$translate.refresh();

	 	NgMap.getMap().then(function(map) {
	 		map.setCenter({ lat: 41.403841, lng: 2.174340 });
	 		map.setZoom(10);
	 		new google.maps.Marker({position: {lat: 41.403841, lng: 2.174340}, map: map});
	 	});
	 }
 ]);

