App=angular.module('deltaAppMobile', ['ionic'])

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
    .state('confirmation', {
    url: '/confirmation',

     templateUrl: 'templates/confirmation.html',
      controller:'mainCtrl'
  });





  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/landingPage');

});
