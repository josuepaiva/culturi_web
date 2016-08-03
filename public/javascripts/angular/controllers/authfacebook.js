// auth with facebook

app.controller("authFacebook", ['$scope','$http','$location', 'culturiURL', 'userService' , '$cookieStore', function($scope, $http, $location, culturiURL, userService, $cookieStore){

	$scope.FBLogin = function(){
            FB.login(function(response){
                if(response.authResponse){
                    console.log('Welcome! Fetching your information....');
                    FB.api('/me', {fields: 'name, email, picture'}, function(response){


                      console.log(response.picture.data.url);
                       var json = {
                       		"uid" : response.id,
                       		"info" : { "name" : response.name, "email" : response.email , "image": response.picture.data.url}
                       };
                       
                       userService.getUserLoggedIn(json).then(function(response){

                          var user = {
                            "access_token" : response.user.access_token,
                            "access_email" : response.user.email
                          };

                          // if(response.city == null && response.state == null){

                          // }
                          
                          userService.setAccessEmail(response.user.email);
                          userService.setAccessToken(response.access_token);
                          setConvidado(false);

                          $location.path('/');
        
                       });
                       
                    });
                }else{
                    console.log("User cancelled login or did not fully authorize.");
                }
            },{scope: 'public_profile, email'});
        }
}]);
