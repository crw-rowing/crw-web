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
    $scope.onlogin = function(session) {
        // Check if user is logged in
        localStorage.session = session;
        rpc.user_status().then(function(response) {
            if(response.result[0]) {
                $scope.loggedIn = true;

                if(response.result[1]) {
                    if(response.result[2])
                        window.location = '#!/coach';
                    else
                        window.location = '#!/rower';
                } else
                    window.location = '#!/createteam';
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
});

// TODO don't use jquery for this
$(document).ready(function() {
    $('#toggleMenu').click(function() {
        $('#wrapper').toggleClass('toggled');
    });
});
