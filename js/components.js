var app = angular.module('crwApp');

// Welcome message containing log data buttons
app.component('welcome', {
    templateUrl: 'components/welcome.component.html',
    controller: function() {
        this.inputDate = new Date;
    }
});

// Health/performance overview
app.component('overview', {
    templateUrl: 'components/overview.component.html',
    bindings: {
        'type': '@',
        'chartData': '<',
        'view': '<'
    },
    bindToController: true,
    controller: function() {
        this.timespan = 7;
   }
});
