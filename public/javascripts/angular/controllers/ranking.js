//app.controller("authFacebook", ['$scope','$http','$location', 'culturiURL', 'userService' , function($scope, $http, $location, culturiURL, userService){
//"use strict";


app.controller('rankingController', ['$scope','eventService' ,'$http', 'culturiURL', 'userService', function($scope, eventService, $http, culturiURL, userService){
	
	var location = window.location;
	var vm = this;

    if(location.hash == "#/ranking"){
    	var c_toolbar = document.getElementsByClassName("toolbar-bar-collor");
      	var c_menu = document.getElementsByClassName("sidenavtoolbar");
     	
     	if(c_toolbar[0].style == null || c_menu[0].style == null){
     		location.reload();
     	}else{
     		c_toolbar[0].style.background = "rgba(0,0,0,0.87";
      		c_menu[0].style.background = "rgba(0,0,0,0.87";
     	}
      	
    }

    userService.getUserStatus().
    	then(function(response){
    		console.log(response);
    		return vm.user = response;
    });

	// var getUsers = function(){

	// 	console.log(culturiURL.API_URL+culturiURL.USERS_URL);
	// 	$http.get(culturiURL.API_URL+culturiURL.USERS_URL).
	// 	success(function(response){
	// 		angular.forEach(response, function(value){
 //            	$scope.rank.users.push( { user :  value } );
 //            	//console.log(value.name);
 //          });
	// 	}).error(function(data, status, config){
	// 		console.log("error ranking");
	// 	});
		
	// };


	// var getCities = function(){
	// 	console.log(culturiURL.API_URL+culturiURL.CITIES_URL);
	// 	$http.get(culturiURL.API_URL+culturiURL.CITIES_URL).
	// 	success(function(response){
	// 		angular.forEach(response, function(value){
 //            	$scope.city.cities.push( { city :  value } );
 //            	console.log(value);
 //          });
	// 	}).error(function(data, status, config){
	// 		console.log("error ranking cities");
	// 	});
	// };

	// //getUsers();
 //    getCities();
	// // console.log($scope.rank);

}]);