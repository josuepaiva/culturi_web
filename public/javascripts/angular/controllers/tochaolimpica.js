app.controller("tochaOlimpica", ['$scope','$http','$q', '$location', 'culturiURL', function($scope, $http, $location, culturiURL){

	$scope.city = "João Pessoa";
	$scope.place = "Shopping Mangabeira";
	$scope.data = "25 ABR";


	console.log(document.cookie);

	var location = window.location;

    console.log("Controller ranking "+location.hash);
    if(location.hash == "#/torch"){
    	var c_toolbar = document.getElementsByClassName("toolbar-bar-collor");
      	var c_menu = document.getElementsByClassName("sidenavtoolbar");
     
      	c_toolbar[0].style.background = "#B22222";
      	c_menu[0].style.background = "#B22222";
    }

	$scope.swapePoint = function(){

	};

}]);