// Login & registration forms
angular.module('crwApp').controller('loginController', function($scope, rpc) {
    // Error message data
    $scope.loginError = {
        show: false,
        text: ''
    };
    $scope.registerStatus = {
        show: false,
        clazz: 'danger',
        text: ''
    };

    // Submit handlers
    $scope.loginHandler = function() {
        $scope.loginError.show = false;
        rpc.login($scope.user, $scope.login_pass).then(function(response) {
            if('result' in response) {
                // Success - store the new session key and open dashboard
                localStorage.session = response.result;
                rpc.logged_in().then(function(response) {
                    if(response.result[1]) {
                        window.location = "#!/coach"
                    } else {
                        window.location = "#!/rower";
                    }
                });
                
            } else {
                $scope.loginError = {
                    show: true,
                    text: response.error.message
                };
            }
        });
    };
    $scope.registerHandler = function() {
        $scope.registerStatus.show = false;
        rpc.create_account($scope.user, $scope.register_pass1).then(function(response) {
            if('result' in response) {
                $scope.registerStatus = {
                    show: true,
                    clazz: 'success',
                    strong: 'Success!',
                    text: 'You can now log in.'
                };
            } else {
                $scope.registerStatus = {
                    show: true,
                    clazz: 'danger',
                    strong: 'Error:',
                    text: response.error.message
                };
            }
        });
    };

    // Navigate to /rower if already logged in.
    if(localStorage.session) {
        rpc.logged_in().then(function(response) {
            console.log(response);
            if(response.result[0] && response.result[1]) {
                window.location = "#!/coach";
            } else if(response.result[0]) {
                window.location = "#!/rower";
            } else {
                localStorage.clear();
            }
        });
    }
});
