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

        this.changePower = function(i) {
            if(this.intervals[i].power) {
                this.intervals[i].splitTime = null;
                this.intervals[i].duration = null;
                this.intervals[i].distance = null;
            }
        };

        this.changeSplitTime = function(i) {
            var t = this.intervals[i].splitTime;
            if(t) {
                var s = t/500;
                this.intervals[i].power = Math.round(2.8 / (s*s*s));
                this.intervals[i].duration = null;
                this.intervals[i].distance = null;
            }
        };

        this.changeSplitData = function(i) {
            var duration = this.intervals[i].duration,
                distance = this.intervals[i].distance;

            if(duration && distance) {
                var t = duration / distance;
                this.intervals[i].splitTime = Math.round(500 * t);
                this.intervals[i].power = Math.round(2.8 / (t*t*t));
            }
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

// Health/performance overview
app.directive('overview', function() {
    return {
        templateUrl: 'components/overview.component.html',
        scope: {
            type: '@',
            chartData: '<',
            view: '<',
            updateView: '&onUpdateView'
        },
        restrict: 'E',
        link: function(scope, el, attrs) {
            scope.pane = 0;
            scope.tabClick = function(index) {
                scope.pane = index;
            };
        }
    }
});
