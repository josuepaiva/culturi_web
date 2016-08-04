(function(){
	angular
	.module('culturi')
	.controller("mapController", mapController);


	mapController.$inject = ['$scope','$http','eventService'];

	function mapController($scope, $http, eventService) {
		// body...
		var vm = this;
		var vm_places = this;
		vm.events = [];


		activate();
		
		 function activate() {

	      return listEvents()
	        .then(function() {

	          console.log('Activated Events View');

	        });
    	};


	    function listEvents() {

	      return eventService.getEvents()
	        .then(function(response) {

	          angular.forEach(response, function(value){

	            vm.events.push( { event :  value } );

	          });
	          
	          return vm.events;
	        });
	    };
	};

})();

