// Alert directive
angular.module('crwApp').directive('alert', function() {
    return {
        templateUrl: 'components/alert.component.html',
        scope: {
            type: '='
        },
        transclude: true,
        restrict: 'E',
        link: function(scope, el, attrs) {
            scope.strong = {
                danger: 'Error:',
                warning: 'Warning:',
                success: 'Success!',
                info: ''
            };
        }
    };
});
