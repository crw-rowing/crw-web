var app = angular.module('crwApp');

// Welcome message containing log data buttons and modals
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
        this.inputDate.setMilliseconds(0);
        this.inputDate.setSeconds(0);

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

        // Change event handlers on interval input, to automate calculation of some of the fields
        this.changePower = function(i) {
            if(this.intervals[i].power) {
                this.intervals[i].splitTime = Math.round(Math.pow(3.5e9/this.intervals[i].power, 1/3));
                this.intervals[i].duration = null;
                this.intervals[i].distance = null;
            }
        };

        this.changeSplitTime = function(i) {
            var t = this.intervals[i].splitTime,
                d = this.intervals[i].distance;
            if(t) {
                var s = t/500;
                this.intervals[i].power = Math.round(2.8 / (s*s*s));
                if(d)
                    this.intervals[i].duration = Math.round(t * d / 500);
            }
        };

        this.changeDistance = function(i) {
            var splitTime = this.intervals[i].splitTime;
                distance = this.intervals[i].distance;

            if(splitTime && distance)
                this.intervals[i].duration = Math.round(splitTime * distance / 500);
        };

        this.submitHealth = function() {
            if(this.onSubmitHealth)
                this.onSubmitHealth({
                    date: this.inputDate,
                    hr: this.inputHR,
                    weight: this.inputWeight,
                    feeling: this.inputFeeling
                });

            this.inputDate = new Date;
            this.inputHR = null;
            this.inputWeight = null;
            this.inputFeeling = null;

            $('#loghealth').modal('toggle');
        };
        this.submitPerformance = function() {
            this.intervals = this.intervals.map(function(i) {
                var power = i.power;
                if(!power) {
                    var splitTime = i.splitTime ? i.splitTime / 500
                        : splitTime = i.duration / i.distance;
                    power = Math.round(2.8 / (splitTime * splitTime * splitTime));
                }
                return [
                    i.duration,
                    power,
                    i.pace || null,
                    {
                        '__type__': 'timedelta',
                        seconds: i.rest
                    }
                ]; 
            });
            if(this.onSubmitPerformance)
                this.onSubmitPerformance({
                    date: this.inputDate,
                    type: this.inputTrainingType === 'ED',
                    comment: '',
                    intervals: this.intervals
                });

            this.intervals = [];
            this.addInterval();
            this.inputDate = new Date;
            this.inputTrainingType = null;

            $('#logtraining').modal('toggle');
        };
    }
});
