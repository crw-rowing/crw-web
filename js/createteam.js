
angular.module('crwApp').controller('createteamController', function($scope, rpc) {
	 $scope.createteamStatus = {
        show: false,
        clazz: 'danger',
        text: ''
    };
	//Submit handler
	$scope.createteamHandler = function() {
		$scope.createteamStatus.show = false;
		rpc.create_team($scope.teamname).then(function(response) {
			if('result' in response) {
				$scope.createteamStatus = {
                    show: true,
                    clazz: 'success',
                    strong: 'Success!',
                    text: 'Your team has been created.'
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