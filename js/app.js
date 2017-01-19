var crwApp = angular.module('crwApp', ['chart.js', 'ngRoute']);

// Routing
crwApp.config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
    $locationProvider.hashPrefix('!');
    $routeProvider.when('/home', {
        template: '<login-page onlogin="onlogin()"></login-page>',
    }).when('/rower', {
        template: '<rower-overview></rower-overview>'
	}).when('/createteam', {
		templateUrl: 'templates/createteam.template.html',
		controller: 'createteamController'
	}).when('/addcrew', {
		templateUrl: 'templates/addcrew.template.html',
		controller: 'addcrewController'
    }).otherwise('home');
}]);

// Main controller
crwApp.controller('mainController', function($scope, rpc) {
    $scope.loggedIn = false;
    $scope.onlogin = function() {
        $scope.loggedIn = true;
    };

    if('session' in localStorage)
        rpc.logged_in().then(function(result) {
            if(result.result) {
                $scope.loggedIn = true;
                window.location = '#!/rower'; // TODO select based on rower/coach
            } else
                localStorage.removeItem('session');
        });

    $scope.logout = function() {
        rpc.logout().then(function(result) {
            $scope.loggedIn = false;
            localStorage.removeItem('session');
            window.location = '#!/home';
        });
    };
});
