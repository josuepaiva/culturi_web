// Author - Laércio S Bezerra | laerciosouza@lavid.ufpb.br

/* recommended */

// place.js
angular
  .module('culturi')
  .directive('placesList', placesList)
  .directive('placeShow', placeShow)
  .directive('placesListWithController', placesListWithController);

/* recommended */
// Controller it must have been loaded.
function placesList() {
  return {
    restrict: 'A',
    templateUrl: 'partials/places/place.html'
  };
};

// Controller it must have been loaded.
function placeShow() {
  return {
    restrict: 'A',
    templateUrl: 'partials/places/place.html'
  };
};

// Controller will be loaded during the call.
function placesListWithController() {
  return {
    restrict: 'A',
    controller: 'placesController',
    controllerAs: 'vm',
    templateUrl: 'partials/places/place.html'
  };
};