// Author - Laércio S Bezerra | laerciosouza@lavid.ufpb.br

/* recommended */

// place.js
(function() {
  'use strict';

  angular
    .module('culturi')
    .service('placeService', placeService);

  placeService.$inject = ['$http', '$q', '$location', 'culturiURL'];

  /* recommended */
  function placeService($http, $q, $location, culturiURL){

    /* jshint validthis: true */

    // return available functions for use in the controllers
    return ({
      getplaces: getplaces,
      getplace: getplace,
      getPlacesProx
    });

    ////////////

    // GET places on API
    function getplaces(){
      
      // create a new instance of deferred
      var deferred = $q.defer();
      // Make an AJAX call get places
      $http.get(culturiURL.API_URL + culturiURL.CATEGORIE_URL + culturiURL.PLACE_ID + culturiURL.HERITAGE_URL)
        .success(getplacesComplete)
        .error(getplacesFailed);

      return deferred.promise;

      ////////////

      function getplacesComplete(response) {
        deferred.resolve(response);
      };

      function getplacesFailed(error) {
        console.log('MSG: Error on placeService request - getplacesFailed - ERROR: '
         + error.statusText + ' - STATUS: ' + error.status);
      };
    };

    function getPlacesProx(valor){
      var data = {
       page: valor
      };

      var config = {
       params: data
      };

      // create a new instance of deferred
      var deferred = $q.defer();
      console.log(culturiURL.API_URL + culturiURL.CATEGORIE_URL + culturiURL.PLACE_ID + culturiURL.HERITAGE_URL);
      // Make an AJAX call get places
      $http.get(culturiURL.API_URL + culturiURL.CATEGORIE_URL + culturiURL.PLACE_ID + culturiURL.HERITAGE_URL,config)
        .success(getplacesComplete)
        .error(getplacesFailed);

      return deferred.promise;

      ////////////

      function getplacesComplete(response) {
        deferred.resolve(response);
      };

      function getplacesFailed(error) {
        console.log('MSG: Error on placeService request - getplacesFailed - ERROR: '
         + error.statusText + ' - STATUS: ' + error.status);
      };

    };

      // GET place on API
    function getplace(placeID){
      // create a new instance of deferred
      var deferred = $q.defer();

      // Make an AJAX call get place by placeID
      $http.get(culturiURL.API_URL + culturiURL.HERITAGE_URL + placeID)
        .success(getplaceComplete)
        .error(getplaceFailed);

      return deferred.promise;

      ////////////

      function getplaceComplete(response) {
        deferred.resolve(response);
      };

      function getplaceFailed(error) {
        console.log('MSG: Error on placeService request - getplaceFailed - ERROR: '
         + error.statusText + ' - STATUS: ' + error.status);
      };
    };

  };

})();