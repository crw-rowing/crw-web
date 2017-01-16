angular.module('crwApp').controller('addcrewController', function($scope, rpc) {
	$scope.addcrewStatus = {
        show: false,
        clazz: 'danger',
        text: ''
    };
	$scope.addcoachStatus = {
		show: false,
		clazz: 'danger',
		text: ''
	};
	
	
	
	//Submit handlers
	$scope.addcrewHandler = function() {
		$scope.addcrewStatus.show = false;
		alert($scope.addroweremail);
		rpc.add_to_team($scope.addroweremail).then(function(response) {
			if('result' in response) {
				$scope.addcrewStatus = {
                    show: true,
                    clazz: 'success',
                    strong: 'Success!',
                    text: 'The rower has been added to your crew.'
				};
			} else {
                $scope.addcrewStatus = {
                    show: true,
                    clazz: 'danger',
                    strong: 'Error:',
                    text: response.error.message
                };
            }
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
                    clazz: 'success',
                    strong: 'Success!',
                    text: 'The status of this member has been changed.'
				};
			} else {
                $scope.createteamStatus = {
                    show: true,
                    clazz: 'danger',
                    strong: 'Error:',
                    text: response.error.message
                };
            }
		});
	};
});