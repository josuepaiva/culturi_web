// Author - Laércio S Bezerra | laerciosouza@lavid.ufpb.br

/* recommended */

// user.js
(function() {
  //'use strict';

  angular
    .module('culturi')
    .service('userService', userService);

  userService.$inject = ['$http', '$q', '$location', 'culturiURL', '$cookieStore'];

  /* recommended */
  function userService($http, $q, $location, culturiURL, $cookieStore){

    var user = this;

    /* jshint validthis: true */
    const LOGIN_URL = '/login';
    const CURRENT_USER_URL = 'auth/facebook/callback';
    const LOGGED_IN_URL = culturiURL.API_URL + '/users/me';

    // return available functions for use in the controllers
    return {
      getUserLoggedIn: getUserLoggedIn,
      getUserStatus: getUserStatus,
      getAccessToken: getAccessToken,
      getAccessEmail: getAccessEmail,
      setAccessToken: setAccessToken,
      setAccessEmail: setAccessEmail,
      getUserObj: getUserObj,
      logout: logout,
      getConvidado,
      setConvidado
    };

    ////////////

    // GET user on API
    function getUserLoggedIn(obj){
            
      // create a new instance of deferred
      var deferred = $q.defer();

      // Make an AJAX call get user logged in
      $http.post(culturiURL.API_URL + CURRENT_USER_URL, obj)
        .success(getUserComplete)
        .catch(getUserFailed);

      return deferred.promise;

      ////////////

      function getUserComplete(response) {
        // Authenticated
        console.log(response);
        if (response !== '0'){
          $http.defaults.headers.common['X-User-Email'] = response.user.email;
          $http.defaults.headers.common['X-User-Token'] = response.access_token;
          deferred.resolve(response);
          return response;
        }
        // Not Authenticated
        else {
          deferred.reject();
          $location.url(LOGIN_URL);
        }
      };

      function getUserFailed(error) {
        console.log('MSG: Error on userService request - getUserFailed - ERROR: '
         + error.statusText + ' - STATUS: ' + error.status);
      };
      
    };

    // GET user status on API
    function getUserStatus(){
            
      // create a new instance of deferred
      var deferred = $q.defer();

      // Make an AJAX call get user logged in
      $http.get(LOGGED_IN_URL)
        .success(getUserStatusComplete)
        .catch(getUserStatusFailed);

      return deferred.promise;

      ////////////

      function getUserStatusComplete(response, status) {
        // Authenticated
        if (status == 200){
          deferred.resolve(response);
        }
        // Not Authenticated
        else {
          deferred.reject();
          $location.url(LOGIN_URL);
        }
      };

      function getUserStatusFailed(error, status) {
        // console.log('MSG: Error on userService request - getUserStatusFailed - ERROR: '
        //  + error.statusText + ' - STATUS: ' + error.status);
         $location.url(LOGIN_URL);
      };
      
    };

    function getAccessToken(){

      var access_token = $cookieStore.get('access_token');

      return access_token;

    };

    function setAccessToken(token_access) {

      $cookieStore.put('access_token', token_access);

    };

    function getUserObj() {

      var userObj = $cookieStore.get('user'); 

      if(userObj){

        return userObj;

      }else{

        console.log("Usuário nao encontrado!");
        return null;

      }

    };

    function setAccessEmail(email) {
      
      $cookieStore.put('access_email', email);

    };

    function getAccessEmail() {
      
      var user_email = $cookieStore.get('access_email');
      return user_email;

    };


    function logout(){
      $cookieStore.remove('access_token');
      $cookieStore.remove('access_email');

      $http.delete(culturiURL.API_URL + "/auth/logout").
        success(function(response){
          $location.url('/login');
          $http.defaults.headers.common['X-User-Email'] = "";
          $http.defaults.headers.common['X-User-Token'] = "";
          window.alert("logout com success");
        }).
        error(function(error){
          console.log("erro ");
        });
    };

  };
})();