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
        // Add average series
        $scope.crew.push('average');
        $scope.HRdata.series = $scope.crew;

        // Accumulate dates and order them correctly
        var dates = [];
        for(var rower of $scope.healthRows) {
            for(var d of rower[1])
                dates.push(d[0]);
        }

        dates = mergeAndSortDateList(dates);
        $scope.HRdata.labels = dates.map(d => d.day + '-' + d.month);

        // Initialize average counters
        var hrAvg = [];
        for(var i in dates)
            hrAvg.push({
                total: 0,
                count: 0
            });

        // Clear graph data
        $scope.HRdata.data = [];
        $scope.HRdata.datasetOverride = [];

        // Counter used for HSL coloring
        var c = 0;
        for(var rower of $scope.healthRows) {
            var row = [];

            for(var d of dates)
                row.push(null);

            // Add all health data in the right places
            for(var h of rower[1]) {
                var date = h[0],
                    hr = h[1];

                // Find the right column index
                for(var i = 0; i < row.length; ++i) {
                    if(dates[i].year === date.year &&
                            dates[i].month === date.month &&
                            dates[i].day === date.day) {
                        row[i] = hr;
                        hrAvg[i].count++;
                        hrAvg[i].total += hr;
                    }
                }
            }
            $scope.HRdata.data.push(row);
            
            // color the series
            var hue = ((c++) * 220) % 360,
                hsl = 'hsl(' + hue + ', 100%, 70%)',
                hsla = 'hsla(' + hue + ', 100%, 70%, 0.4)',
                dOverride = angular.copy($scope.datasetOverride);

            dOverride.borderColor = hsl;
            dOverride.backgroundColor = hsl;
            dOverride.pointBorderColor = hsla;
            dOverride.pointHoverBorderColor = hsla;
            dOverride.pointHoverBackgroundColor = hsla;

            $scope.HRdata.datasetOverride.push(dOverride);
        }

        // calculate the averages and fill them in
        hrAvg = hrAvg.map(x => x.count > 0 ? x.total / x.count : null);
        $scope.HRdata.data.push(hrAvg);

        var dOverride = angular.copy($scope.datasetOverride),
            bc = 'rgba(0,0,0,0.8)',
            pbc = 'rgba(0,0,0,0.4)';

        dOverride.borderColor = bc;
        dOverride.backgroundColor = bc;
        dOverride.pointBorderColor = pbc;
        dOverride.pointHoverBorderColor = pbc; 
        dOverride.pointHoverBackgroundColor = pbc;
        dOverride.borderDash = [10, 10];
        $scope.HRdata.datasetOverride.push(dOverride);
    };

    $scope.refreshHealthData();

    $scope.updateHRView = function(timespan, view) {
        $scope.hrTimespan = timespan;
        $scope.refreshHealthData();
    };
});
