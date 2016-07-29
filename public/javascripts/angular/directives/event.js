// Author - Laércio S Bezerra | laerciosouza@lavid.ufpb.br

/* recommended */

// event.js
angular
  .module('culturi')
  .directive('eventsList', eventsList)
  .directive('eventShow', eventShow)
  .directive('eventsListWithController', eventsListWithController);

/* recommended */
// Controller it must have been loaded.
function eventsList() {
  return {
    restrict: 'A',
    templateUrl: 'partials/events/event.html'
  };
};

// Controller it must have been loaded.
function eventShow() {
  return {
    restrict: 'A',
    templateUrl: 'partials/events/event.html'
  };
};


// Controller will be loaded during the call.
function eventsListWithController() {
  return {
    restrict: 'A',
    controller: 'eventsController',
    controllerAs: 'vm',
    templateUrl: 'partials/events/event.html'
  };
};