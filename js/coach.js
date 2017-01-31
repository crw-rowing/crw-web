angular.module('crwApp').controller('coachController', function($scope, rpc) {
    // Helper function to create a sorted date list from all rower data
    function mergeAndSortDateList(dates) {
        var isDateTime = false; // TODO dates[0].__type__ === 'datetime',
            // Convert all dicts to Date instances to allow sorting
            a = dates.map(d => {
                if(isDateTime)
                    return new Date(d.year, d.month - 1, d.day, d.hour, d.minute, d.second);
                else
                    return new Date(d.year, d.month - 1, d.day);
            });

        a = a.sort((a, b) => a - b);

        // Filter out uniques
        var out = [];
        for(var d of a) {
            var inc = false;
            for(var c of out)
                if(d.getTime() === c.getTime())
                    inc = true;
            if(!inc)
                out.push(d);
        }

        // Convert back to dicts
        return out.map(d => {
            if(isDateTime)
                return {
                    __type__: 'datetime',
                    year: d.getYear() + 1900,
                    month: d.getMonth() + 1,
                    day: d.getDate(),
                    hour: d.getHours(),
                    minute: d.getMinutes(),
                    second: d.getSeconds()
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

    // Base series styling
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
        pointHoverBackgroundColor: '#fff',
        pointRadius: 1,
        pointHitRadius: 10,
        spanGaps: true,
    };

    // Base graph data to be copied to the graphs
    $scope.baseGraphData = {
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

    // Table data
    $scope.hrTableColumns = [];
    $scope.hrTableRows = [];

    $scope.weightTableColumns = [];
    $scope.weightTableRows = [];

    // Timespans
    $scope.hrTimespan = 7;
    $scope.weightTimespan = 7;
    $scope.performanceTimespan = 7;
    $scope.performanceView = 'watt';

    $scope.crew = [];

    // Returns all graph data for the specified tracked variable
    function createGraphData(rowers, getVal) {
        var out = angular.copy($scope.baseGraphData);

        var crew = rowers.map(r => r[0]);
        $scope.crew = angular.copy(crew);
        crew.push('average');

        out.series = crew;

        // Accumulate dates and order them correctly
        var dates = [];
        for(var rower of rowers)
            for(var d of rower[1])
                dates.push(d[0]);

        dates = mergeAndSortDateList(dates);
        out.labels = dates.map(d => d.day + '-' + d.month);

        // Initialize average counters
        var avg = [];
        for(var i in dates)
            avg.push({
                total: 0,
                count: 0
            });

        out.data = [];

        // Counter used for HSL coloring
        var c = 0;
        for(var rower of rowers) {
            var series = [];

            for(var d of dates)
                series.push(null);

            // Add all health data in the right places
            for(var h of rower[1]) {
                var date = h[0],
                    val = getVal(h);

                // Find the right column index
                for(var i = 0; i < dates.length; ++i) {
                    if(dates[i].year === date.year &&
                            dates[i].month === date.month &&
                            dates[i].day === date.day) {
                        series[i] = val;
                        avg[i].count++;
                        avg[i].total += val;
                        break;
                    }
                }
            }

            out.data.push(series);
            
            // color the series
            var hue = ((c++) * 220) % 360,
                hsl = 'hsl(' + hue + ', 100%, 70%)',
                dOverride = angular.copy($scope.datasetOverride);

            dOverride.borderColor = hsl;
            dOverride.backgroundColor = hsl;
            dOverride.pointBorderColor = hsl;
            dOverride.pointHoverBorderColor = hsl;

            out.datasetOverride.push(dOverride);
        }

        // calculate the averages and fill them in
        var dOverride = angular.copy($scope.datasetOverride),
            bc = 'rgba(0,0,0,0.8)';

        dOverride.borderColor = bc;
        dOverride.backgroundColor = bc;
        dOverride.pointBorderColor = bc;
        dOverride.pointHoverBorderColor = bc; 
        dOverride.borderDash = [10, 10];
        
        avg = avg.map(x => x.count > 0 ? x.total / x.count : null);
        out.data.push(avg);
        out.datasetOverride.push(dOverride);

        return out;
    }

    // Graph data
    $scope.refreshHRData = function() {
        rpc.get_team_health_data($scope.hrTimespan).then(function(response) {
            $scope.HRdata = createGraphData(response.result, h => h[1]);
        });
    };

    $scope.refreshWeightData = function() {
        rpc.get_team_health_data($scope.weightTimespan).then(function(response) {
            $scope.weightData = createGraphData(response.result, h => h[2]);
        });
    };

    $scope.refreshPerformanceData = function(update) {
        function convert() {
            if($scope.performanceView === 'split')
                $scope.performanceData.data = $scope.performanceData.data.map(
                    d => d.map(x => Math.pow(3.5e9/x, 1/3)));
        }

        if(update)
            rpc.get_team_training_data($scope.performanceTimespan).then(function(response) {
                $scope.performanceData = createGraphData(response.result, h => h[3][0][1]);
                convert();
            });
        else convert();
    };

    $scope.refreshHealthData = function() {
        $scope.refreshHRData();
        $scope.refreshWeightData();
        $scope.refreshPerformanceData(true);

        // Table data
        // TODO
        rpc.get_team_health_data(365).then(function(response) {
            var crew = response.result.map(r => r[0]);

            $scope.hrTableColumns = ['date'];
            $scope.hrTableColumns.push('average');
            Array.prototype.push.apply($scope.hrTableColumns, crew);

            $scope.weightTableColumns = $scope.hrTableColumns;

            var hrData = {}, weightData = {};

            $scope.hrTableRows = [];
            $scope.weightTableRows = [];
            for(var rower of response.result)
                for(var h of rower[1]) {
                    $scope.hrTableRows.push(h[0]);
                    $scope.weightTableRows.push(h[0]);

                    var date = h[0].day + '-' + h[0].month;
                    if(date in hrData) {
                        hrData[date][rower[0]] = h[1];
                        hrData[date].__count__++;
                        hrData[date].__total__ += h[1];
                    } else
                        hrData[date] = {
                            [rower[0]]: h[1],
                            __count__: 1,
                            __total__: h[1]
                        };
                    
                    if(date in weightData) {
                        weightData[date][rower[0]] = h[2];
                        weightData[date].__count__++;
                        weightData[date].__total__ += h[2];
                    } else
                        weightData[date] = {
                            [rower[0]]: h[2],
                            __count__: 1,
                            __total__: h[2]
                        };
                }

            $scope.hrTableRows = mergeAndSortDateList($scope.hrTableRows).map(d => [d.day + '-' + d.month]).reverse();
            $scope.weightTableRows = mergeAndSortDateList($scope.weightTableRows).map(d => [d.day + '-' + d.month]).reverse();

            function fill(rows, data) {
                for(var r of rows) {
                    d = r[0];

                    if(d in data)
                        r.push(data[d].__total__ / data[d].__count__);
                    else
                        r.push(null);

                    for(var c of crew) {
                        if(d in data && c in data[d])
                            r.push(data[d][c]);
                        else
                            r.push(null);
                    }
                }
            }

            fill($scope.hrTableRows, hrData);
            fill($scope.weightTableRows, weightData);
        });
    };

    $scope.refreshHealthData(true, true);

    $scope.updateHRView = function(timespan, view) {
        $scope.hrTimespan = timespan;
        $scope.refreshHRData();
    };

    $scope.updateWeightView = function(timespan, view) {
        $scope.weightTimespan = timespan;
        $scope.refreshWeightData();
    };

    $scope.updatePerformanceView = function(timespan, view) {
        if(timespan) $scope.performanceTimespan = timespan;
        if(view) $scope.performanceView = view;
        $scope.refreshPerformanceData(!view || view === 'watt');
    };

    $scope.updatePerformanceFilter = function(filter) {
    };
});
