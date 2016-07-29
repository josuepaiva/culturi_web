// auth with facebook

app.controller("authFacebook", ['$scope','$http','$location', 'culturiURL', 'userService' , function($scope, $http, $location, culturiURL, userService){

	$scope.name = "Convidado";
  $scope.user;
  $scope.email

	$scope.FBLogin = function(){
            FB.login(function(response){
                if(response.authResponse){
                    console.log('Welcome! Fetching your information....');
                    FB.api('/me', {fields: 'name, email, picture'}, function(response){

                       var json = {
                       		"uid" : response.id,
                       		"info" : { "name" : response.name, "email" : response.email }
                       };
                       //console.log(response);
                       userService.getUserLoggedIn(json).then(function(response){
                          document.cookie = "culturiToken"+"="+response.access_token+"culturiEmail"+"="+response.user.email;
                          // $scope.user = response.user;
                          // console.log("scope user", response);
                          // console.log("response user", response.user);
                          $location.path('/');
                          //$scope.$apply();
                       });
                       
                    });
                }else{
                    console.log("User cancelled login or did not fully authorize.");
                }
            },{scope: 'public_profile, email'});
        }
}]);