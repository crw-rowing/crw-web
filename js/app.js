var crwApp = angular.module('crwApp', ['chart.js', 'ngRoute']);

// Routing
crwApp.config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
    $locationProvider.hashPrefix('!');
    $routeProvider.when('/home', {
        templateUrl: 'templates/login.template.html',
        controller: 'loginController'
    }).when('/rower', {
        template: '<rower-overview></rower-overview>'
    }).otherwise('home');
}]);
