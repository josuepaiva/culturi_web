// Author - Laércio S Bezerra | laerciosouza@lavid.ufpb.br

/* recommended */

// main.js

var app =
angular
  .module('culturi', ['ngRoute', 'ngMaterial','ngMessages','ngMap','ngFileUpload'])
  .run(['$http', add_required_header])
  .constant('culturiURL', {
      //PLACE_ID: '57233651938533059caaee8e/',
      PLACE_ID: '57840161e3c5073e9a7a4841/',
      //EVENT_ID: '57233652938533059caaee8f/',
      EVENT_ID: '57840161e3c5073e9a7a4842/',
      API_URL: 'https://tochabeta.api.culturi.com.br/api/',
      CATEGORIE_URL: 'categories/',
      HERITAGE_URL:'heritages/',
      USERS_URL: 'ranking/users',
      CITIES_URL: 'ranking/cities',
      AUTH_URL: 'auth/',
      CALLBACK: 'callback/',
      FACEBOOK_URL: 'facebook/'
  })
  .config(config)


// Routes
function config($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl   : 'partials/index.html'
    })
    .when('/login', {
      templateUrl   : 'partials/login.html',
      controller    : 'authFacebook'
    })
    .when('/me', {
      templateUrl   : 'partials/users/show.html',
      controller    : 'userController',
      controllerAs  : 'vm'
      //resolve: { loggedin: checkLoggedin }
    })
    .when('/events', {
      templateUrl   : 'partials/events/list.html',
      controller    : 'eventsController', 
      controllerAs  : 'vm'
    })
    .when('/places', {
      templateUrl   : 'partials/places/list.html',
      controller    : 'eventsController',
      controllerAs  : 'vm'
    })
    .when('/ranking', {
      templateUrl   : 'partials/ranking.html',
      controller    : 'rankingController',
      controllerAs  : 'rank'
    })
    .when('/map', {
      templateUrl   : 'partials/map/map.html',
      controller    : 'filtroController'
    })
    .when('/torch', {
      templateUrl   : 'partials/torch/torch_olympic.html',
      controller    : 'tochaOlimpica',
      controllerAs  : 'tc'
    })
    .when('/form', {
      templateUrl   : 'partials/form.html',
      controller    : 'MyCtrl'
    })
    .when('/teste', {
      templateUrl   : 'partials/teste_page.html',
      controller    : 'controllerTeste'
    })
    .otherwise({redirectTo  : '/'});
  
};

window.fbAsyncInit = function() {
    FB.init({
      appId      : '1584598588467194',
      xfbml      : true,
      cookie     : true,
      version    : 'v2.3'
    });
  };

  (function(d, s, id){
     var js, fjs = d.getElementsByTagName(s)[0];
     if (d.getElementById(id)) {return;}
     js = d.createElement(s); js.id = id;
     js.src = "//connect.facebook.net/en_US/sdk.js";
     fjs.parentNode.insertBefore(js, fjs);
   }(document, 'script', 'facebook-jssdk'));

// Add header required to all requests
function add_required_header($http){
  //$http.defaults.headers.common['X-Tocha-Key'] = '7594fe2eef4d998649d83648256fccbecdb3fed6ef8ebcc66deafc7d62f155b8691c8a73462357d6c8a5ceb3b63a4c3603bdd39194773e761bed6b75e574eebc';
  $http.defaults.headers.common['X-Tocha-Key'] = 'TOCHABETA';
  $http.defaults.useXDomain = true;
};


// Verfify if user is logged in
function checkLoggedin(userService){
  return userService.getUserStatus()
    .then(function(response) {
      return response;
    });
};

function getCookieAccess(campo){
        var name = campo + "=";
        var ca = document.cookie.split(';');
        for(var i = 0; i <ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0)==' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
                return c.substring(name.length,c.length);
            }
        }
        return "";
};


function teste(campo){
  var name = campo + "=";
        var ca = document.cookie.split(';');
        for(var i = 0; i <ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0)==' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
                console.log(c.substring(name.length,c.length));
            }
        }
        console.log("nada");
        // return "";
};