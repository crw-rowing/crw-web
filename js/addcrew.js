angular.module('crwApp').controller('addcrewController', function($scope, rpc) {
	$scope.addcrewStatus = {
        show: false,
        type: 'danger',
        text: ''
    };
	$scope.addcoachStatus = {
		show: false,
		type: 'danger',
		text: ''
	};
	$scope.deleterowerStatus = {
		show: false,
		type: 'danger',
		text: ''
	};
	
	//Submit handlers
	$scope.addcrewHandler = function() {
		$scope.addcrewStatus.show = false;
		rpc.add_to_team($scope.addroweremail).then(function(response) {
			if('result' in response) {
				$scope.addcrewStatus = {
                    show: true,
                    type: 'success',
                    strong: 'Success!',
                    text: 'The rower has been added to your crew.'
				};
			} else {
                $scope.addcrewStatus = {
                    show: true,
                    type: 'danger',
                    strong: 'Error:',
                    text: response.error.message
                };
            }
            refresh_team_info();
		});
	};
	$scope.addcoachHandler = function() {
		$scope.addcoachStatus.show = false;
		var coach = false;
		if (document.getElementById('rowerbtn').checked){
			coach = false;
		}else if(document.getElementById('coachbtn').checked){
			coach = true;
		}
		rpc.set_coach_status($scope.coachemail, coach).then(function(response) {
			if('result' in response) {
				$scope.addcoachStatus = {
                    show: true,
                    type: 'success',
                    strong: 'Success!',
                    text: 'The status of this member has been changed.'
				};
			} else {
                $scope.createteamStatus = {
                    show: true,
                    type: 'danger',
                    strong: 'Error:',
                    text: response.error.message
                };
            }
            refresh_team_info();
		});
	};
	
	$scope.deleterowerHandler = function() {
		$scope.deleterowerStatus.show = false;
		rpc.remove_from_team($scope.deleteroweremail).then(function(response) {
			if('result' in response) {
				$scope.deleterowerStatus = {
                    show: true,
                    type: 'success',
                    strong: 'Success!',
                    text: 'The rower has been removed from your crew.'
				};
			} else {
                $scope.deleterowerStatus = {
                    show: true,
                    type: 'danger',
                    strong: 'Error:',
                    text: response.error.message
                };
            }
            refresh_team_info();
		});
	};
	
	
	refresh_team_info = function() {
		rpc.team_info().then(function(response) {
			$scope.members = [];
			if('result' in response) {
				for(i = 2; i < response.result.length; i++){
					$scope.members.push({
                        "Email" : response.result[i][1],
                        "Coachstat": response.result[i][2]
					});
                }
            }
		});
	};
	refresh_team_info();
});
