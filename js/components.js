var app = angular.module('crwApp');

// Welcome message containing log data buttons
app.component('welcome', {
    templateUrl: 'components/welcome.component.html',
    // Event handlers
    bindings: {
        onSubmitHealth: '&',
        onSubmitPerformance: '&'
    },
    controller: function() {
        // Set date inputs to today
        this.inputDate = new Date;

        // Interval selection on training form
        this.intervals = [];
        this.selectedInterval = 0;

        this.addInterval = function() {
            var count = this.intervals.length;
            this.intervals.push({
                id: count,
                duration: 0,
                rest: 0,
                pace: 0,
                power: 0
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

        // One interval by default
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
                    type: this.inputTrainingType === 'ED',
                    comment: '',
                    intervals: this.intervals.map(i => [i.duration, i.power, i.pace, i.rest])
                });
            $('#logtraining').modal('toggle');
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
