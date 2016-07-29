// Author - Josué P. Bernardino | josuepaiva@lavid.ufpb.br

/* recommended */

// autocomplete.js

angular
	.module('culturi')
	.controller("MyCtrl", function(NgMap,$scope){
	 'use strict';
	  var vm = this;
	  var location;
	  vm.types = "['establishment']";
	  vm.placeChanged = function() {
	    vm.place = this.getPlace();


	   //console.log(JSON.stringify(vm.place));

   		location = vm.place.geometry.location;
	  }

	  vm.getLocation = function(){
	  	//console.log(location);
	  	var json = {};

	  	json.location = location;
	  	if(location != null){
	  		json.district = vm.place.address_components[1].long_name;
	  	}
	  	json.city = "João Pessoa";
	  	json.state = "Paraiba";
	  	
	  	return json;
	  }


});
