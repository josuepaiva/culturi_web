// Author - Laércio S Bezerra | laerciosouza@lavid.ufpb.br

/* recommended */

// main.js

var app =
angular
  .module('culturi', ['ngRoute', 'ngMaterial','ngMessages','ngMap','ngFileUpload', 'ngCookies'])
  .run(['$http','$rootScope', '$location', 'userService', add_required_header])
  .constant('culturiURL', {
      PLACE_ID: '57233651938533059caaee8e/',
      //PLACE_ID: '57840161e3c5073e9a7a4841/',
      EVENT_ID: '57233652938533059caaee8f/',
      //EVENT_ID: '57840161e3c5073e9a7a4842/',
      API_URL: 'https://tocha.api.culturi.com.br/api/',
      CATEGORIE_URL: 'categories/',
      HERITAGE_URL:'heritages/',
      USERS_URL: 'ranking/users',
      CITIES_URL: 'ranking/cities',
      AUTH_URL: 'auth/',
      CALLBACK: 'callback/',
      FACEBOOK_URL: 'facebook/',
      GOOGLEPLUS_URL: 'googleplus/',
      EVENT_LIKE: 'like/',
      EVENT_DISLIKE: 'dislike/',
      EVENT_REPORT: 'report/',
      EVENT_QRCODE: 'qrcode/',
      EVENT_QRCODE_PNG: 'qrcode_png/',
      EVENT_SHARE: 'share/',
      EVENT_COMMENTS: 'comments/'
  })
  .config(config)

// Routes
function config($routeProvider,$mdThemingProvider) {
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
      controllerAs  : 'vm',
      authenticated  : true
      //resolve: { loggedin: checkLoggedin }
    })
    .when('/events', {
      templateUrl   : 'partials/events/list.html',
      controller    : 'eventsController', 
      controllerAs  : 'vm',
      resolve: {loggedin: checkLoggedin}
    })
    .when('/places', {
      templateUrl   : 'partials/places/list.html',
      controller    : 'placesController',
      controllerAs  : 'vm'
    })
    .when('/ranking', {
      templateUrl   : 'partials/ranking.html',
      controller    : 'rankingController',
      controllerAs  : 'rank',
      resolve: {loggedin: checkLoggedin}
    })
    .when('/map', {
      templateUrl   : 'partials/map/map.html',
      controller    : 'mapController',
      controllerAs  : 'vm'
    })
    .when('/form', {
      templateUrl   : 'partials/form.html',
      controller    : 'MyCtrl'
    })
    .when('/teste', {
      templateUrl   : 'partials/teste_page.html',
      controller    : 'controllerTeste'
    })
    .when('/logout', {
      resolve : { check: logout_user }
    })
    .otherwise({redirectTo  : '/'});
  
};

var convidado = false;
var buttom_sair;


function exibeButtomSair(){
  buttom_sair = false;
};

function naoExibeButtomSair(){
  buttom_sair = true;
};


function setConvidado(valor){
  console.log("convidado setado para ", valor);
  convidado = valor;
};

function getConvidado(){
  //console.log("get valor", valor);
  return convidado;
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
function add_required_header($http, $rootScope, $location, userService){
  $http.defaults.headers.common['X-Tocha-Key'] = '7594fe2eef4d998649d83648256fccbecdb3fed6ef8ebcc66deafc7d62f155b8691c8a73462357d6c8a5ceb3b63a4c3603bdd39194773e761bed6b75e574eebc';
  //$http.defaults.headers.common['X-Tocha-Key'] = 'TOCHABETA';
  $http.defaults.useXDomain = true;

  $rootScope.$on('$routeChangeStart', function(event, next, current){

    if(next.$$route.authenticated){
        var token = userService.getAccessToken();
        var email = userService.getAccessEmail();
        
       if(!token || !email){
        $location.path("/login");
       }
    }
  })
};

// Verfify if user is logged in
function checkLoggedin(userService, $http,$location){
  var token = userService.getAccessToken();
  var email = userService.getAccessEmail();
  var convidado = userService.getConvidado();

  if(convidado){
    setConvidado(true);
  }else if(!token || !email){
    $location.path("/login"); 
  }else{
    setConvidado(false);
    $http.defaults.headers.common['X-User-Email'] = email;
    $http.defaults.headers.common['X-User-Token'] = token;
  }
};

function logout_user(userService){
  return userService.logout();
};