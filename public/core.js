
/* Create Angular App Instance */
App = angular.module('deltaApp', ['ui.bootstrap', 'ngRoute','ngAnimate','ui.checkbox']);

/**
 * Angular Routes
 */
App.config(function($routeProvider) {
    $routeProvider

        // route for the home page
        .when('/', {
            templateUrl : '/partials/main.html',
            controller  : 'mainCtrl',
            css: 'styles/main.css'
        })

        // route for the flights page


        .when('/flightDetails',{
            templateUrl : '/partials/FlightDetails.html',
            controller : 'controllerFlightDetails'
          })
           // route for the search result
        .when('/searchResults', {
            templateUrl : '/partials/searchResults.html',
            controller  : 'searchResultsCtrl',
            css:'styles/searchResultsStyle.css'
        })

        // route for search by reservation page
        .when('/reservationSearch', {
            templateUrl : '/partials/reservationSearch.html',
            controller  : 'reservationSearchCtrl',
            css : 'styles/reservationSearch.css'

        })

        .when('/information', {
            templateUrl : '/partials/info.html',
            controller : 'infoCtrl',
            css : 'styles/info.css'
        });
});


App.directive('head', ['$rootScope','$compile',
    function($rootScope, $compile){
        return {
            restrict: 'E',
            link: function(scope, elem){
                var html = '<link rel="stylesheet" ng-repeat="(routeCtrl, cssUrl) in routeStyles" ng-href="{{cssUrl}}" />';
                elem.append($compile(html)(scope));
                scope.routeStyles = {};
                $rootScope.$on('$routeChangeStart', function (e, next, current) {
                    if(current && current.$$route && current.$$route.css){
                        if(!angular.isArray(current.$$route.css)){
                            current.$$route.css = [current.$$route.css];
                        }
                        angular.forEach(current.$$route.css, function(sheet){
                            delete scope.routeStyles[sheet];
                        });
                    }
                    if(next && next.$$route && next.$$route.css){
                        if(!angular.isArray(next.$$route.css)){
                            next.$$route.css = [next.$$route.css];
                        }
                        angular.forEach(next.$$route.css, function(sheet){
                            scope.routeStyles[sheet] = sheet;
                        });
                    }
                });
            }
        };
    }
]);
