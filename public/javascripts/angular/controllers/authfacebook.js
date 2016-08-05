// auth with facebook
(function(){
  angular
    .module('culturi')
    .controller("authFacebook", authFacebook)
    .controller("authGooglePlus", authGooglePlus)
    .controller("convidado", convidado);

    authFacebook.$inject = ['$scope','$http','$location', 'culturiURL', 'userService' , '$cookieStore'];
    authGooglePlus.$inject = ['$scope','$http','$location', 'culturiURL', 'userService' , '$cookieStore'];
    convidado.$inject = ['$scope','$location', 'userService'];

    function authFacebook($scope, $http, $location, culturiURL, userService, $cookieStore){

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
                          exibeButtomSair();
                      
                          $location.path('/');
        
                       });
                       
                    });
                }else{
                    console.log("User cancelled login or did not fully authorize.");
                }
            },{scope: 'public_profile, email'});
        }
    };

    function authGooglePlus($scope, $http, $location, culturiURL, userService, $cookieStore){
      var params = {
        client_id : "721089784451-02436plcfgcjbs62gni9ifrgam1eclv7.apps.googleusercontent.com",
        scope: 'profile email',
        fetch_basic_profile: true
      };
      //  var google = gapi.auth2.getAuthInstance();
      // //gapi.auth2.init(params);

      var initClient = function () {
          gapi.load('auth2', function () {


          auth2 = gapi.auth2.init({
              client_id:    '721089784451-02436plcfgcjbs62gni9ifrgam1eclv7.apps.googleusercontent.com',
              cookiepolicy: 'single_host_origin', 
              scope: 'profile'});


          auth2.attachClickHandler('signin-button', {}, onSuccess, onFailure);
          });
      };


      var onSuccess = function (user) {
          console.log('Signed in as ' + user.getBasicProfile().getName());
      };


      var onFailure = function (error) {
          console.log(error);
      };


      $scope.onSignIn = function(googleUser) {
        
        initClient();

      };

    };


    function convidado($scope, $location, userService){

      $scope.convidado = function(){
        naoExibeButtomSair();
        userService.setConvidado(true);
        $location.url("/");
      };
    };
    
})();

