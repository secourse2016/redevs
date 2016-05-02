App=angular.module('deltaAppMobile', ['ionic', 'angularMoment'])

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
      controller:'mainCtrl'
  })
    .state ('landingPage.oneWayTrip',{
      url: '/oneway',
      views:{
        'tab-oneway':{
          templateUrl: 'templates/landingPage-oneWay.html',
          controller : 'mainCtrl'
        }
      }
    })
    .state ('landingPage.twoWayTrip',{
      url: '/twoway',
      views: {
        'tab-twoway': {
          templateUrl: 'templates/landingPage-twoWayTrip.html',
          controller: 'mainCtrl'
        }
      }
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


    .state('confirmation', {
    url: '/confirmation',

     templateUrl: 'templates/confirmation.html',
      controller:'mainCtrl'
  })

.state ('searchResults',{
      url: '/searchResults',
       
        templateUrl: 'templates/searchResults.html',
        controller: 'searchResultsCtrl'
        
      });




  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/landingPage');

});
