// Bootstrap alert directive
angular.module('crwApp').directive('alert', function() {
    return {
        templateUrl: 'components/alert.component.html',
        scope: {
            type: '@'
        },
        transclude: true,
        restrict: 'E',
        link: function(scope, el, attrs) {
            // Bold header to be shown based on alert type
            scope.strong = {
                danger: 'Error:',
                warning: 'Warning:',
                success: 'Success!',
                info: ''
            };
        }
    };
});
