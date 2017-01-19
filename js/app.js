var crwApp = angular.module('crwApp', ['chart.js', 'ngRoute']);

// Routing
crwApp.config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
    $locationProvider.hashPrefix('!');
    $routeProvider.when('/home', {
        templateUrl: 'templates/login.template.html',
        controller: 'loginController'
    }).when('/rower', {
        template: '<rower-overview></rower-overview>'
    }).when('/coach', {
        templateUrl: 'templates/coach.template.html',
        controller: 'coachController'
	}).when('/createteam', {
		templateUrl: 'templates/createteam.template.html',
		controller: 'createteamController'
	}).when('/addcrew', {
		templateUrl: 'templates/addcrew.template.html',
		controller: 'addcrewController'
    }).otherwise('home');
}]);
