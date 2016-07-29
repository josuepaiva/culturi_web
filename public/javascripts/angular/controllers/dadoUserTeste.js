app.controller("controllerTeste", ['$scope','$http', 'culturiURL', 'userService' , function($scope, $http, culturiURL, userService){

	$http.get('https://tochabeta.api.culturi.com.br/api/users/me').
		then(function(response){
			$scope.user = response.data;
		});
}]);