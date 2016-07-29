// Author - Laércio S Bezerra | laerciosouza@lavid.ufpb.br

/* recommended */

// user.js
(function() {
  //'use strict';

  angular
    .module('culturi')
    .controller('userController', userController);

  // Add Services requireds
  userController.$inject = ['userService'];

  /* recommended */
  function userController(userService) {

    /* jshint validthis: true */
    var vm = this;
    vm.user;
    
    // calling others submit function.
    // vm.checkLoggedin = checkLoggedin;

    // load automatically listHashtags.
    activate();
    
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