// Author - Laércio S Bezerra | laerciosouza@lavid.ufpb.br

/* recommended */

// event.js
(function() {
  //'use strict';
  
  angular
    .module('culturi')
    .controller('eventsController', eventsController)
    .controller('eventController', eventController);

  // Add Services requireds
  eventsController.$inject = ['eventService', '$scope', '$mdDialog'];
  eventController.$inject = ['eventService', '$scope', '$mdDialog', 'eventID'];


  /* recommended */
  function eventsController(eventService, $scope, $mdDialog) {

    /* jshint validthis: true */
    var vm = this;
    vm.events = [];

    if(location.hash == "#/"){
      var c_toolbar = document.getElementsByClassName("toolbar-bar-collor");
      var c_menu = document.getElementsByClassName("sidenavtoolbar");

      c_toolbar[0].style.background = "rgb(63,81,181)";
      c_menu[0].style.background = "rgb(63,81,181)";

    }else if(location.hash == "#/events"){
      var c_toolbar = document.getElementsByClassName("toolbar-bar-collor");
      var c_menu = document.getElementsByClassName("sidenavtoolbar");

      c_toolbar[0].style.background = "#4F9004";
      c_menu[0].style.background = "#4F9004";
    }
    // calling others submit function.
    $scope.showTabDialog = showTabDialog;
    
    // load automatically listEvents.
    activate();
    //activateuser();

    
    ////////////

    function activate() {
      return listEvents()
        .then(function() {
          console.log('Activated Events View');
        });
    };


    function listEvents() {
      return eventService.getEvents()
        .then(function(response) {
          angular.forEach(response, function(value){
            vm.events.push( { event :  value } );
          });
          
          return vm.events;
        });
    };

    function showTabDialog(ev, id) {
      return $mdDialog.show({
        controller: eventController,
        controllerAs: 'vm',
        templateUrl: 'partials/events/show.html',
        parent: angular.element(document.body),
        targetEvent: ev,
        locals : {
          eventID : id
        },
        clickOutsideToClose:true
      });
    };

  };

 
  function eventController(eventService, $scope, $mdDialog, eventID) {

    /* jshint validthis: true */
    var vm = this;
    vm.event;
    
    // calling others submit function.
    $scope.hide = hide;
    $scope.cancel = cancel;
    $scope.answer = answer;

    // load automatically showEvent.
    activate();

    ////////////

    function activate() {
      return showEvent()
        .then(function() {
          console.log('Activated Event View');
        });
    }

    function showEvent() {
      return eventService.getEvent(eventID)
        .then(function(response) {
          return vm.event = response;
        });
    };

    function hide() {
      return $mdDialog.hide();
    };

    function cancel() {
      return $mdDialog.cancel();
    };

    function answer(answer) {
      return $mdDialog.hide(answer);
    };

  };

})();