var crwApp = angular.module('crwApp', ['chart.js', 'ngRoute']);

// Routing
crwApp.config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
    $locationProvider.hashPrefix('!');
    $routeProvider.when('/home', {
        // TODO make this a normal template, no need for component (?)
        template: '<login-page onlogin="onlogin(session)"></login-page>',
    }).when('/rower', {
        // TODO make this a normal template, no need for component
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

// Main controller
crwApp.controller('mainController', function($scope, rpc) {
    $scope.loggedIn = false;
    $scope.hasTeam = false;
    $scope.isCoach = false;

    $scope.onlogin = function(session) {
        // Check if user is logged in
        localStorage.session = session;
        rpc.user_status().then(function(response) {
            if(response.result[0]) {
                $scope.loggedIn = true;
                $scope.hasTeam = response.result[1];
                $scope.isCoach = response.result[2];

                if(response.result[2])
                    window.location = '#!/coach';
                else
                    window.location = '#!/rower';
            } else {
                localStorage.removeItem('session');
                $scope.loggedIn = false;
                window.location = '#!/home';
            }
        });
    };

    if('session' in localStorage)
        $scope.onlogin(localStorage.session);

    // Logout button handler
    $scope.logout = function() {
        rpc.logout().then(function(result) {
            $scope.loggedIn = false;
            localStorage.removeItem('session');
            window.location = '#!/home';
        });
    };

    $scope.menuToggled = false;
    $scope.toggleMenu = function() {
        $scope.menuToggled = !$scope.menuToggled;
    };
});
