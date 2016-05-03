App=angular.module('deltaAppMobile', ['ionic', 'angularMoment','tabSlideBox','angular-stripe'])

.config(function (stripeProvider) {
    stripeProvider.setPublishableKey('pk_test_lnXZPy220d1EMqYfHlOj1XOt');
  })

.config(function($httpProvider){
  $httpProvider.interceptors.push(function(){
    return {
      request: function(req){
        if(/^(\/api)|(\/db)/.test(req.url)){
          req.url = 'http://localhost:3000' + req.url;
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
      abstract:true

    })

    .state ('landingPage.oneWayTrip',{
      url: '/oneway',
      views:{
        'tab-oneway':{
          templateUrl: 'templates/landingPage-oneWay.html',
          controller : 'oneWayCtrl'
        }
      }
    })
    .state ('landingPage.twoWayTrip',{
      url: '/twoway',
      views: {
        'tab-twoway': {
          templateUrl: 'templates/landingPage-twoWayTrip.html',
          controller: 'twoWayCtrl'
        }
      }
    })

    .state('confirmation', {
      url: '/confirmation',
      templateUrl: 'templates/confirmation.html',
      controller:'paymentCtrl'
    })

    .state ('searchResults',{
      url: '/searchResults',
        templateUrl: 'templates/searchResults.html',
        controller: 'searchResultsCtrl'
    })



    .state('information', {
      url: '/information',
      templateUrl: 'templates/information.html',
      controller: 'infoCtrl'
    })
    .state('reservationSearch', {
        url: '/reservationSearch',
        templateUrl: 'templates/reservationSearch.html',
        controller: 'reservationSearchCtrl'
    })

    .state('thankYou', {
        url: '/thankYou',
        templateUrl: 'templates/thankYou.html',
        controller: 'thankYouCtrl'
    })

    .state('aboutUs', {
        url: '/aboutUs',
        templateUrl: 'templates/aboutUs.html',
        controller: 'mainCtrl'
    })

    .state('flightConfirmation',{
      url: '/flightConfirmation',
      templateUrl: 'templates/flight-confirmation.html',
      controller: 'confirmationCtrl'
    });





  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/landingPage/oneway');

});
