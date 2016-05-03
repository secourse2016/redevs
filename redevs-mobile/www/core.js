App=angular.module('deltaAppMobile', ['ionic', 'angularMoment','tabSlideBox','angular-stripe','ionic.contrib.ui.tinderCards'])

.config(function (stripeProvider) {
    stripeProvider.setPublishableKey('pk_test_lnXZPy220d1EMqYfHlOj1XOt');
  })

.config(function($httpProvider){
  $httpProvider.interceptors.push(function(){
    return {
      request: function(req){
        if(/^(\/api)|(\/db)/.test(req.url)){
          req.url = 'http://52.25.15.124' + req.url;
          req.withCredentials = false;
        }
        return req;
      }
    };
  });
})

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {

  $stateProvider


    .state('landingPage', {

      url: '/landingPage',
      templateUrl: 'templates/landingPage.html',
      controller:'mainCtrl',
      cache: false,
      abstract:true

    })

    .state ('landingPage.oneWayTrip',{
      url: '/oneway',
      views:{
        'tab-oneway':{
          templateUrl: 'templates/landingPage-oneWay.html',
          cache: false,
          controller : 'oneWayCtrl'
        }
      }
    })
    .state ('landingPage.twoWayTrip',{
      url: '/twoway',
      views: {
        'tab-twoway': {
          templateUrl: 'templates/landingPage-twoWayTrip.html',
          cache: false,
          controller: 'twoWayCtrl'
        }
      }
    })

    .state('confirmation', {
      url: '/confirmation',
      templateUrl: 'templates/confirmation.html',
      cache: false,
      controller:'paymentCtrl'
    })

    .state ('searchResults',{
      url: '/searchResults',
        templateUrl: 'templates/searchResults.html',
      cache: false,
        controller: 'searchResultsCtrl'
    })



    .state('information', {
      url: '/information',
      templateUrl: 'templates/information.html',
      cache: false,
      controller: 'infoCtrl'
    })
    .state('reservationSearch', {
        url: '/reservationSearch',
        templateUrl: 'templates/reservationSearch.html',
      cache: false,
        controller: 'reservationSearchCtrl'
    })

    .state('thankYou', {
        url: '/thankYou',
        templateUrl: 'templates/thankYou.html',
      cache: false,
        controller: 'thankYouCtrl'
    })

    .state('aboutUs', {
        url: '/aboutUs',
        templateUrl: 'templates/aboutUs.html',
        controller: 'aboutUsCtrl'

    })

    .state('flightConfirmation',{
      url: '/flightConfirmation',
      templateUrl: 'templates/flight-confirmation.html',
      cache: false,
      controller: 'confirmationCtrl'
    });




  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/landingPage/oneway');

});

/*
App.config(function($ionicConfigProvider) {

  $ionicConfigProvider.views.maxCache(1);
});
*/
