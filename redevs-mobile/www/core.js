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
    url: '/',
    templateUrl: 'templates/landingPage.html',
      controller : 'mainCtrl'
  });  //remove this semi column to add a new state......

  // Each tab has its own nav history stack:




  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/#');

});
