(function () {
  //'use strict';

  angular
    .module('culturi')
    .controller('listVirtual', function($timeout,$scope,eventService, $http, culturiURL) {

      // In this example, we set up our model using a class.
      // Using a plain object works too. All that matters
      // is that we implement getItemAtIndex and getLength.
      var vm = this;
      vm.users = [];
      

      var DynamicItems = function() {
        /**
         * @type {!Object<?Array>} Data pages, keyed by page number (0-index).
         */
        this.loadedPages = {};

        /** @type {number} Total number of items. */
        this.numItems = 0;

        /** @const {number} Number of items to fetch per request. */
        this.PAGE_SIZE = 20;

        this.fetchNumItems_();
      };

      // Required.
      DynamicItems.prototype.getItemAtIndex = function(index) {
        var pageNumber = Math.floor(index / this.PAGE_SIZE);
        var page = this.loadedPages[pageNumber];

        if (page) {
          return page[index % this.PAGE_SIZE];
        } else if (page !== null) {
          this.fetchPage_(pageNumber);
        }
      };

      // Required.
      DynamicItems.prototype.getLength = function() {
        return this.numItems;
      };

      DynamicItems.prototype.fetchPage_ = function(pageNumber) {
        // Set the page to null so we know it is already being fetched.
        this.loadedPages[pageNumber] = null;
        

        eventService.getRankingUsers().
          then(function(response){
            angular.forEach(response, function(value){
            vm.users.push( { user :  value } );
          });
        });

        console.log("Users carregados",vm);

        $timeout(angular.noop, 1000).then(angular.bind(this, function() {
          this.loadedPages[pageNumber] = [];
          var pageOffset = pageNumber * this.PAGE_SIZE;
          for (var i = pageOffset; i < pageOffset + this.PAGE_SIZE; i++) {

            this.loadedPages[pageNumber].push(vm.users[i]);
          }
        }));
      };

      DynamicItems.prototype.fetchNumItems_ = function() {
        // For demo purposes, we simulate loading the item count with a timed
        // promise. In real code, this function would likely contain an
        // $http request.
        $timeout(angular.noop, 1000).then(angular.bind(this, function() {
          this.numItems = 25;

          }));
        };
      
      this.dynamicItems = new DynamicItems();
    });

})();


/**
Copyright 2016 Google Inc. All Rights Reserved. 
Use of this source code is governed by an MIT-style license that can be in foundin the LICENSE file at http://material.angularjs.org/license.
**/