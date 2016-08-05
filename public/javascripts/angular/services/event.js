// Author - Laércio S Bezerra | laerciosouza@lavid.ufpb.br

/* recommended */

// event.js
(function() {
  'use strict';

  angular
    .module('culturi')
    .service('eventService', eventService);

  eventService.$inject = ['$http', '$q', '$location', 'culturiURL'];

  /* recommended */
  function eventService($http, $q, $location, culturiURL){

    /* jshint validthis: true */
    
    // return available functions for use in the controllers
    return ({
      getEvents: getEvents,
      getEvent: getEvent,
      getRankingUsers: getRankingUsers,
      getRankingCities: getRankingCities,
      eventLike: eventLike,
      eventDislike: eventDislike,
      eventReport: eventReport,
      eventQrcode: eventQrcode,
      eventQrcod_png: eventQrcod_png,
      eventShare: eventShare,
      eventComments: eventComments,
      getEventsProx
    });

    function eventLike(){

    };

    function eventDislike(){

    };

    function eventReport(){

    };

    function eventQrcode(){

    };

    function eventQrcod_png(){

    };

    function eventShare(){

    };

    function eventComments(){

    };

    ////////////
    function getRankingUsers(){
      var deferred = $q.defer();

      $http.get(culturiURL.API_URL + culturiURL.USERS_URL).
        success(getUsersComplete)
        .error(getUsersFailed);

      return deferred.promise;

      function getUsersComplete(response) {
        deferred.resolve(response);
      };

      function getUsersFailed(error) {
        console.log('MSG: Error on eventService request - getUsersFailed - ERROR: ');
         // + error.statusText + ' - STATUS: ' + error.status);
      };
                
    };
    
    function getRankingCities(){
      var deferred = $q.defer();

      $http.get(culturiURL.API_URL + culturiURL.CITIES_URL).
        success(getUsersComplete)
        .error(getUsersFailed);

      return deferred.promise;

      function getUsersComplete(response) {
        deferred.resolve(response);
      };

      function getUsersFailed(error) {
        console.log('MSG: Error on eventService request - getUsersFailed - ERROR: ');
         // + error.statusText + ' - STATUS: ' + error.status);
      };
    };
    // GET events on API
    function getEvents(){
      
      var data = {
       today: true
      };

      var config = {
       params: data
      };

      // create a new instance of deferred
      var deferred = $q.defer();

      // Make an AJAX call get events
      $http.get(culturiURL.API_URL + culturiURL.CATEGORIE_URL + culturiURL.EVENT_ID + culturiURL.HERITAGE_URL,config)
        .success(getEventsComplete)
        .error(getEventsFailed);

      return deferred.promise;

      ////////////

      function getEventsComplete(response) {
        deferred.resolve(response);
      };

      function getEventsFailed(error) {
        console.log('MSG: Error on eventService request - getEventsFailed - ERROR: '
         + error.statusText + ' - STATUS: ' + error.status);
      };
    };



    function getEventsProx(valor){
      
      var data = {
       page: valor
      };

      var config = {
       params: data
      };

      // create a new instance of deferred
      var deferred = $q.defer();

      // Make an AJAX call get events
      $http.get(culturiURL.API_URL + culturiURL.CATEGORIE_URL + culturiURL.EVENT_ID + culturiURL.HERITAGE_URL,config)
        .success(getEventsComplete)
        .error(getEventsFailed);

      return deferred.promise;

      ////////////

      function getEventsComplete(response) {
        deferred.resolve(response);
      };

      function getEventsFailed(error) {
        console.log('MSG: Error on eventService request - getEventsFailed - ERROR: '
         + error.statusText + ' - STATUS: ' + error.status);
      };
    };

      // GET event on API
    function getEvent(eventID){
      // create a new instance of deferred
      var deferred = $q.defer();

      // Make an AJAX call get event by eventID
      $http.get(culturiURL.API_URL + culturiURL.HERITAGE_URL + eventID)
        .success(getEventComplete)
        .error(getEventFailed);

      return deferred.promise;

      ////////////

      function getEventComplete(response) {
        deferred.resolve(response);
      };

      function getEventFailed(error) {
        console.log('MSG: Error on eventService request - getEventFailed - ERROR: '
         + error.statusText + ' - STATUS: ' + error.status);
      };
    };

  };

})();