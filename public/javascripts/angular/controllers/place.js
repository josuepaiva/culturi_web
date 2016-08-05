// Author - Laércio S Bezerra | laerciosouza@lavid.ufpb.br

/* recommended */

// place.js
(function() {
  'use strict';
  
  angular
    .module('culturi')
    .controller('placesController', placesController)
    .controller('placeController', placeController);

  // Add Services requireds
  placesController.$inject = ['placeService', '$scope', '$mdDialog'];
  placeController.$inject = ['placeService', '$scope', '$mdDialog', 'placeID'];

  /* recommended */
  function placesController(placeService, $scope, $mdDialog) {

    /* jshint validthis: true */
    var vm = this;
    vm.places = [];


    // calling others submit function.
    $scope.showTabDialog = showTabDialog;
    $scope.page = 0;
    
    // load automatically listplaces.
    activate();
    
    ////////////

    function activate() {
      return listplaces()
        .then(function() {
          console.log('Activated places View');
        });
    }

    function listplaces() {
      return placeService.getplaces()
        .then(function(response) {
          angular.forEach(response, function(value){
            vm.places.push( { place :  value } );
          });
          
          return vm.places;
        });
    };

    function showTabDialog(ev, id) {
      return $mdDialog.show({
        controller: placeController,
        controllerAs: 'vm',
        templateUrl: 'partials/places/show.html',
        parent: angular.element(document.body),
        targetplace: ev,
        locals : {
          placeID : id
        },
        clickOutsideToClose:true
      });
    };

    $scope.proximo = function(){
      $scope.page++;
      vm.places = [];
      placeService.getPlacesProx($scope.page).
        then(function(response){
          angular.forEach(response, function(value){
            vm.places.push({place: value});
          })
        });
    };

    $scope.anterior = function(){
      $scope.page--;
      vm.places = [];
      placeService.getPlacesProx($scope.page).
        then(function(response){
         angular.forEach(response, function(value){
          vm.places.push({place: value});
        })
      });
    }

  };

  function placeController(placeService, $scope, $mdDialog, placeID) {

    /* jshint validthis: true */
    var vm = this;
    vm.place;
    
    // calling others submit function.
    $scope.hide = hide;
    $scope.cancel = cancel;
    $scope.answer = answer;

    // load automatically showplace.
    activate();

    ////////////

    function activate() {
      return showplace()
        .then(function() {
          console.log('Activated place View');
        });
    }

    function showplace() {
      return placeService.getplace(placeID)
        .then(function(response) {
          return vm.place = response;
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