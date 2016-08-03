// Author - Laércio S Bezerra | laerciosouza@lavid.ufpb.br

/* recommended */

// user.js
(function() {
  //'use strict';

  angular
    .module('culturi')
    .controller('userController', userController);

  // Add Services requireds
  userController.$inject = ['userService','$http'];

  /* recommended */
  function userController(userService, $http) {

    /* jshint validthis: true */
    var vm = this;
    vm.user;
    
    // calling others submit function.
    // vm.checkLoggedin = checkLoggedin;

    // load automatically listHashtags.
    var token = userService.getAccessToken();
    var email = userService.getAccessEmail();

    console.log('userController',userService.getAccessToken());
    console.log('userController',userService.getAccessEmail());

    if((token != null) && (email != null)){
      $http.defaults.headers.common['X-User-Email'] = email;
      $http.defaults.headers.common['X-User-Token'] = token;
      activate();
    }

    console.log(vm.user);
   
    ////////////

    function activate() {
      return checkLoggedin()
        .then(function() {
          console.log('Activated User View');
        });
    }

    function checkLoggedin() {
      return userService.getUserStatus()
        .then(function(response) {
          console.log(response);
          return vm.user = response;
        });
    };
  };
})();