angular.module('crwApp').controller('coachController', function($scope, rpc) {
    function mergeAndSortDateList(dates) {
        var isDateTime = dates[0].__type__ === 'datetime',
            a = dates.map(d => {
                if(isDateTime)
                    return new Date(d.year, d.month - 1, d.day, d.hours, d.minutes, d.seconds);
                else
                    return new Date(d.year, d.month - 1, d.day);
            });

        a = a.sort((a, b) => a - b);
        var out = [];
        for(var d of a) {
            var inc = false;
            for(var c of out)
                if(d.getTime() === c.getTime())
                    inc = true;
            if(!inc)
                out.push(d);
        }

        return out.map(d => {
            if(isDateTime)
                return {
                    __type__: 'datetime',
                    year: d.getYear() + 1900,
                    month: d.getMonth() + 1,
                    day: d.getDate(),
                    hours: d.getHours(),
                    minutes: d.getMinutes(),
                    seconds: d.getSeconds()
                };
            else
                return {
                    __type__: 'date',
                    year: d.getYear() + 1900,
                    month: d.getMonth() + 1,
                    day: d.getDate()
                };
        });
    }

    $scope.datasetOverride = {
        yAxisID: 'y-axis-1',
        fill: false,
        lineTension: 0.3,
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBackgroundColor: "#fff",
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        spanGaps: false,
    };

    $scope.HRdata = {
        labels: [],
        series: [],
        data: [],
        datasetOverride: [],
        options: {
            legend: {
                display: true
            },
            scales: {
                yAxes: [
                    {
                        id: 'y-axis-1',
                        type: 'linear',
                        display: true,
                        position: 'left',
                    }
                ]
            }
        }
    };

    $scope.crew = [];
    $scope.healthRows = [];

    $scope.hrTimespan = 7;
    $scope.weightTimespan = 7;

    $scope.refreshHealthData = function() {
        rpc.get_team_health_data(Math.max($scope.hrTimespan, $scope.weightTimespan)).then(function(response) {
            $scope.crew = response.result.map(r => r[0]);
            $scope.healthRows = response.result;

            $scope.updateHealthData();
        });
    };

    $scope.updateHealthData = function() {
        $scope.crew.push('average');
        $scope.HRdata.series = $scope.crew;

        var dates = [];
        for(var rower of $scope.healthRows) {
            for(var d of rower[1])
                dates.push(d[0]);
        }

        dates = mergeAndSortDateList(dates);
        $scope.HRdata.labels = dates.map(d => d.day + '-' + d.month);

        var avgs = [];
        for(var i in dates)
            avgs.push({
                total: 0,
                count: 0
            });

        $scope.HRdata.data = [];
        $scope.HRdata.datasetOverride = [];

        var c = 0;
        for(var rower of $scope.healthRows) {
            var row = [];

            for(var d of dates)
                row.push(null);

            for(var h of rower[1]) {
                var date = h[0],
                    hr = h[1];

                for(var i = 0; i < row.length; ++i) {
                    if(dates[i].year === date.year &&
                       dates[i].month === date.month &&
                       dates[i].day === date.day) {
                        row[i] = hr;
                        avgs[i].count++;
                        avgs[i].total += hr;
                    }
                }
            }
            $scope.HRdata.data.push(row);
            
            var dOverride = angular.copy($scope.datasetOverride);

            var hue = ((c++) * 220) % 360;
            dOverride.borderColor = 'hsl(' + hue + ', 100%, 70%)';
            dOverride.backgroundColor = 'hsl(' + hue + ', 100%, 70%)';
            dOverride.pointBorderColor = 'hsla(' + hue + ', 100%, 70%, 0.4)';
            dOverride.pointHoverBorderColor = 'hsla(' + hue + ', 100%, 70%, 0.4)';
            dOverride.pointHoverBackgroundColor = 'hsla(' + hue + ', 100%, 70%, 0.4)';
            $scope.HRdata.datasetOverride.push(dOverride);
        }

        avgs = avgs.map(x => x.count > 0 ? x.total / x.count : null);
        $scope.HRdata.data.push(avgs);
        var dOverride = angular.copy($scope.datasetOverride);
        dOverride.borderColor = 'rgba(0,0,0,0.8)';
        dOverride.backgroundColor = 'rgba(0,0,0,0.8)';
        dOverride.pointBorderColor = 'rgba(0,0,0,0.4)';
        dOverride.pointHoverBorderColor = 'rgba(0,0,0,0.4)';
        dOverride.pointHoverBackgroundColor = 'rgba(0,0,0,0.4)';
        dOverride.borderDash = [10, 10];
        $scope.HRdata.datasetOverride.push(dOverride);
    };

    $scope.refreshHealthData();

    $scope.updateHRView = function(timespan, view) {
        $scope.hrTimespan = timespan;
        $scope.refreshHealthData();
    };
});
