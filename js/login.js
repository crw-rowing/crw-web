angular.module('crwApp').controller('loginController', function($scope, rpc) {
    $scope.loginError = {
        show: false,
        text: ''
    };
    $scope.registerStatus = {
        show: false,
        clazz: 'danger',
        text: ''
    };
    $scope.loginHandler = function() {
        $scope.loginError.show = false;
        rpc('login', [$scope.user, $scope.login_pass]).then(function(response) {
            if('result' in response) {
                localStorage.session = response.result;
                window.location = "#!/rower";
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
        rpc('create_account', [$scope.user, $scope.register_pass1]).then(function(response) {
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
    if(localStorage.session)
        window.location = "#!/rower";
});


