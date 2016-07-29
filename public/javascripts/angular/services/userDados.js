// Author - Laércio S Bezerra | laerciosouza@lavid.ufpb.br

/* recommended */

// event.js
(function() {
  'use strict';

  angular
    .module('culturi')
    .service('userDados', userDados);

  userDados.$inject = ['$http', '$q', '$location', 'culturiURL'];

  /* recommended */
  function userDados($http, $q, $location, culturiURL){

    /* jshint validthis: true */
    
    // return available functions for use in the controllers
    return ({
      getTeste: getTeste
    });

   function getTeste(){
   	console.log("AGora funcionou");
   };

  };

})();