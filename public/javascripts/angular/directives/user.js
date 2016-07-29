// Author - Laércio S Bezerra | laerciosouza@lavid.ufpb.br

/* recommended */

// user.js
angular
  .module('culturi')
  .directive('userShow', userDirective)

/* recommended */
function userDirective() {
  return {
    restrict: 'AE',
    // controller: 'userController',
    // controllerAs: 'vm',
    templateUrl: 'partials/users/user.html'
  }
};