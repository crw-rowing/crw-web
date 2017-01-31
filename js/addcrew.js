angular.module('crwApp').controller('addcrewController', function($scope, rpc) {
	$scope.error = {
        show: false,
        text: ''
    };

    $scope.members = [];

	function refreshTeamInfo() {
		rpc.team_info().then(function(response) {
			if('result' in response) {
                $scope.members = response.result.slice(2).map(x => Object({
                    email: x[1],
                    coach: x[2]
                }));
            } else {
                $scope.error = {
                    show: true,
                    text: response.error.message
                };
            }
		});
	};
	refreshTeamInfo();
	
    $scope.newRowerEmail = '';
    $scope.newRowerCoach = false;
    $scope.newRowerSubmitting = false;
    $scope.toggleNewRowerCoach = function() {
        $scope.newRowerCoach = !$scope.newRowerCoach;
    };

    $scope.addUser = function() {
        $scope.error.show = false;
        $scope.newRowerSubmitting = true;
        rpc.add_to_team($scope.newRowerEmail).then(function(response) {
            function resume() {
                $scope.newRowerSubmitting = false;
                $scope.newRowerEmail = '';
                refreshTeamInfo();
            }

            if('result' in response) {
                if($scope.newRowerCoach)
                    rpc.set_coach_status($scope.newRowerEmail, true).then(resume);
                else resume();
            } else {
                $scope.error = {
                    show: true,
                    text: response.error.message
                };
                resume();
            }
        });
    };

    $scope.toggleCoach = function(x) {
        $scope.error.show = false;
        rpc.set_coach_status(x.email, !x.coach).then(function(response) {
            if('result' in response)
                refreshTeamInfo();
            else $scope.error = {
                show: true,
                text: response.error.message
            };
        });
    };

    $scope.removeUser = function(x) {
        rpc.remove_from_team(x.email).then(function(response) {
            if('result' in response)
                refreshTeamInfo();
            else $scope.error = {
                show: true,
                text: response.error.message
            };
        });
    };
});
