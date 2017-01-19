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

        this.intervals = [];
        this.selectedInterval = 0;

        this.addInterval = function() {
            var count = this.intervals.length;
            this.intervals.push({
                id: count,
                duration: 0,
                rest: 0,
                pace: 0,
                watt: 0,
                split: 0,
                distance: 0
            });
            this.selectedInterval = count;
        };
        this.deleteInterval = function(index) {
            this.intervals.splice(index, 1);
            if(this.selectedInterval > 0)
                --this.selectedInterval;
            for(var i=0; i<this.intervals.length; ++i)
                this.intervals[i].id = i;
        };

        this.addInterval();

        this.submitHealth = function() {
            if(this.onSubmitHealth)
                this.onSubmitHealth({
                    date: this.inputDate,
                    hr: this.inputHR,
                    weight: this.inputWeight,
                    feeling: this.inputFeeling
                });
            $('#loghealth').modal('toggle');
        };
        this.submitPerformance = function() {
            if(this.onSubmitPerformance)
                this.onSubmitPerformance({
                    date: this.inputDate,
                    type: this.inputTrainingType,
                    intervals: this.intervals
                });
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
