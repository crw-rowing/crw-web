// Login & registration forms
angular.module('crwApp').directive('loginPage', function(rpc) {
    return {
        templateUrl: 'components/login.component.html',
        scope: {
            'onlogin': '&onlogin'
        },
        restrict: 'E',
        link: function(scope, el, attrs) {
            // Error message data
            scope.loginError = {
                show: false,
                text: ''
            };
            scope.registerStatus = {
                show: false,
                type: 'danger',
                text: ''
            };

            // Submit handlers
            scope.loginHandler = function() {
                scope.loginError.show = false;
                rpc.login(scope.user, scope.login_pass).then(function(response) {
                    if('result' in response) {
                        // Success - let the app controller know our new session key
                        scope.onlogin({session: response.result});
                    } else {
                        scope.loginError = {
                            show: true,
                            text: response.error.message
                        };
                    }
                });
            };

            scope.registerHandler = function() {
                scope.registerStatus.show = false;
                rpc.create_account(scope.user, scope.register_pass1).then(function(response) {
                    if('result' in response) {
                        scope.registerStatus = {
                            show: true,
                            type: 'success',
                            strong: 'Success!',
                            text: 'You can now log in.'
                        };
                    } else {
                        scope.registerStatus = {
                            show: true,
                            type: 'danger',
                            strong: 'Error:',
                            text: response.error.message
                        };
                    }
                });
            };
        }
    };
});
