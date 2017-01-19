var app = angular.module('crwApp');

// Welcome message containing log data buttons
app.component('welcome', {
    templateUrl: 'components/welcome.component.html',
    bindings: {
        onSubmitHealth: '&',
        onSubmitPerformance: '&'
    },
    controller: function() {
        this.inputDate = new Date;
        this.submitHealth = function() {
            if(this.onSubmitHealth)
                this.onSubmitHealth({
                    date:this.inputDate,
                    hr: this.inputHR,
                    weight: this.inputWeight,
                    feeling: this.inputFeeling
                });
        };
        this.submitPerformance = function() {
            if(this.onSubmitPerformance)
                this.onSubmitPerformance();
        };
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
        this.pane = 0;
        this.tabClick = function(index) {
            this.pane = index;
        };
   }
});
