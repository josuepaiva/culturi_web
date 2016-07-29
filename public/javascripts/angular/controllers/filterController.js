// app.controller("filtroController", ['$http', '$scope', '$mdDialog', 'culturiURL', function(){
// 	console.log("shdjksasda");
// 	// $scope.showFilter = function(){
// 	// 	return $mdDialog.show({
// 	// 		controller: filtroController,
// 	// 		controllerAs : 'fm',
// 	// 		templateUrl  : 'partials/map/filtro.html',
// 	// 		parent: angular.element(document.body),
// 	// 		clickOutsideToClose: true
// 	// 	});
// 	// };


// 	// $scope.hide = function(){
// 	// 	return $mdDialog.hide();
// 	// };


// 	// $scope.cancel = function(){
// 	// 	return $mdDialog.cancel();
// 	// };

// 	// $scope.answer = function(){
// 	// 	return $mdDialog.hide(answer);
// 	// };

// }]);





(function(){
	'use strict';

	angular
		.module('culturi')
		.controller('filtroController', filtroController);

		filtroController.$inject = ['eventService', '$scope', '$http', '$mdDialog'];

		function filtroController(eventService, $scope, $mdDialog){
			
			var location = window.location;

		    console.log("Controller ranking "+location.hash);
		    if(location.hash == "#/map"){
		    	var c_toolbar = document.getElementsByClassName("toolbar-bar-collor");
		      	var c_menu = document.getElementsByClassName("sidenavtoolbar");
		     
		      	c_toolbar[0].style.background = "rgb(63,81,181)";
		      	c_menu[0].style.background = "rgb(63,81,181)";
		    }

		};

})();