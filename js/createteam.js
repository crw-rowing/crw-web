angular.module('crwApp').controller('createteamController', function($scope, rpc) {
    $scope.createteamStatus = {
        show: false,
        type: 'danger',
        text: ''
    };

	//Submit handler
	$scope.createteamHandler = function() {
		$scope.createteamStatus.show = false;
		rpc.create_team($scope.teamname).then(function(response) {
			if('result' in response) {
				$scope.createteamStatus = {
                    show: true,
                    type: 'success',
                    strong: 'Success!',
                    text: 'Your team has been created.'
				};
			} else {
                $scope.createteamStatus = {
                    show: true,
                    type: 'danger',
                    strong: 'Error:',
                    text: response.error.message
                };
            }
		});
	};
});
