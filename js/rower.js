// Rower dashboard
angular.module('crwApp').component('rowerOverview', {
    templateUrl: 'templates/rower.template.html',
    controller: function($scope, rpc) {
        // Error message
        $scope.error = {
            show: false,
            msg: ''
        };

        $scope.showError = function(msg) {
            $scope.error.show = true;
            $scope.error.msg = msg;
        };

        $scope.hideError = function() {
            $scope.error.show = false;
        };

        // Set date to today on forms
        $scope.healthDate = new Date;
        $scope.intervalDate = new Date;

        // Chart settings and data
        $scope.HRdata = {
            labels: [],
            series: ["heart rate", "weight"],
            data: [
                [],
                []
            ],
            datasetOverride: [
                {
                    yAxisID: 'y-axis-1',
                    fill: false,
                    lineTension: 0.3,
                    backgroundColor: "rgba(75,192,192,0.4)",
                    borderColor: "rgba(75,192,192,1)",
                    borderCapStyle: 'butt',
                    borderDash: [],
                    borderDashOffset: 0.0,
                    borderJoinStyle: 'miter',
                    pointBorderColor: "rgba(75,192,192,.4)",
                    pointBackgroundColor: "#fff",
                    pointBorderWidth: 1,
                    pointHoverRadius: 5,
                    pointHoverBackgroundColor: "rgba(75,192,192,.4)",
                    pointHoverBorderColor: "rgba(220,220,220,.4)",
                    pointHoverBorderWidth: 2,
                    pointRadius: 1,
                    pointHitRadius: 10,
                    spanGaps: false,
                },
                {
                    yAxisID: 'y-axis-1',
                    fill: false,
                    lineTension: 0.3,
                    backgroundColor: "rgba(192,57,57,0.15)",
                    borderColor: "rgba(192,57,57,1)",
                    borderCapStyle: 'butt',
                    borderDash: [],
                    borderDashOffset: 0.0,
                    borderJoinStyle: 'miter',
                    pointBorderColor: "rgba(192,57,57,0.4)",
                    pointBackgroundColor: "#fff",
                    pointBorderWidth: 1,
                    pointHoverRadius: 5,
                    pointHoverBackgroundColor: "rgba(192,57,57,.4)",
                    pointHoverBorderColor: "rgba(220,220,220,.4)",
                    pointHoverBorderWidth: 2,
                    pointRadius: 1,
                    pointHitRadius: 10,
                    spanGaps: false
                }
            ],
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

        $scope.Perfdata = {
            labels: [],
            series: ["power"],
            data: [
                [],
            ],
            datasetOverride: [
                {
                    yAxisID: 'y-axis-1',
                    fill: false,
                    lineTension: 0.3,
                    backgroundColor: "rgba(75,192,192,1)",
                    borderColor: "rgba(75,192,192,1)",
                    borderCapStyle: 'butt',
                    borderDash: [],
                    borderDashOffset: 0.0,
                    borderJoinStyle: 'miter',
                    pointBorderColor: "rgba(75,192,192,1)",
                    pointBackgroundColor: "#fff",
                    pointBorderWidth: 1,
                    pointHoverRadius: 5,
                    pointHoverBackgroundColor: "rgba(75,192,192,.4)",
                    pointHoverBorderColor: "rgba(220,220,220,.4)",
                    pointHoverBorderWidth: 2,
                    pointRadius: 1,
                    pointHitRadius: 10,
                    spanGaps: false,
                },
                {
                    yAxisID: 'y-axis-1',
                    fill: false,
                    lineTension: 0.3,
                    backgroundColor: "rgba(75,192,50,0.4)",
                    borderColor: "rgba(75,192,50,1)",
                    borderCapStyle: 'butt',
                    borderDash: [],
                    borderDashOffset: 0.0,
                    borderJoinStyle: 'miter',
                    pointBorderColor: "rgba(75,192,192,1)",
                    pointBackgroundColor: "#fff",
                    pointBorderWidth: 1,
                    pointHoverRadius: 5,
                    pointHoverBackgroundColor: "rgba(75,192,192,1)",
                    pointHoverBorderColor: "rgba(220,220,220,1)",
                    pointHoverBorderWidth: 2,
                    pointRadius: 1,
                    pointHitRadius: 10,
                    spanGaps: false,
                }
            ],
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

        $scope.health_data = [];
        $scope.health_timespan = 7;

        $scope.performance_timespan = 7;
        $scope.performanceView = 'watt';
        $scope.performanceData = [];
        $scope.performance_table_data = [];

        convert_datetime = function(d) {
            if(d.__type__ === 'date')
                return d.day + '-' + d.month;
            else if(d.__type__ === 'datetime')
                return d.day + '-' + d.month + ' ' + d.hour + ':'
                             + (d.second < 10 ? '0' : '') + d.second;
            else return d;
        };

        refresh_health_data = function() {
            $scope.hideError();
            rpc.get_health_data($scope.health_timespan).then(function(response) {
                if('result' in response) {
                    $scope.HRdata.labels = [];
                    $scope.HRdata.data = [ [], [] ]
                    for (var i = 0; i < response.result.length; i++) {
                        entry = response.result[i];
                        $scope.HRdata.labels.push(convert_datetime(entry[0]));
                        $scope.HRdata.data[0].push(entry[1]);
                        $scope.HRdata.data[1].push(entry[2]);
                    }
                } else
                    $scope.showError(response.error.message);
            });
            // TODO maybe both in one request
            rpc.get_health_data(365).then(function(response) {
                if('result' in response) {
                    $scope.health_data = response.result.reverse().map(function(h) {
                        h[0] = convert_datetime(h[0]);
                        return h;
                    });
                }
            });
        };

        $scope.updateHealthTimespan = function(n, v) {
            if(n)
                $scope.health_timespan = n;
            refresh_health_data();
        };

        convert_performance_data = function() {
            if($scope.Perfdata.data[0].length !== $scope.performanceData.length)
                $scope.Perfdata.data[0] = new Array($scope.performanceData.length);
            for(var i=0; i<$scope.Perfdata.data[0].length; ++i) {
                if($scope.performanceView === 'watt')
                    $scope.Perfdata.data[0][i] = $scope.performanceData[i];
                else
                    $scope.Perfdata.data[0][i] = Math.pow(3.5e9/$scope.performanceData[i], 1/3);
            }
        };

        format_time = function(s) {
            var m = s % 60;
            return Math.floor(s / 60) + ':' + (m < 10 ? '0' : '') + m;
        };

        refresh_training_data = function() {
            $scope.hideError();
            rpc.get_training_data($scope.performance_timespan).then(function(response) {
                if('result' in response) {
                    $scope.Perfdata.labels = [];
                    $scope.Perfdata.data = [[]];
                    for(var j in response.result) {
                        var training = response.result[j],
                             date = convert_datetime(training[0]);
                        for(var i in training[3]) {
                            var interval = training[3][i];
                            $scope.Perfdata.labels.push(date);
                            $scope.Perfdata.data[0].push(interval[1]);
                            $scope.performanceData.push(interval[1]);
                        }
                    }
                    convert_performance_data();
                } else
                    $scope.showError(response.error.message);
            });

            //TODO
            rpc.get_training_data(365).then(function(response) {
                if('result' in response) {
                    $scope.performance_table_data = [];
                    for(var t of response.result) {
                        for(var i of t[3]) {
                            $scope.performance_table_data.push([
                                convert_datetime(t[0]),
                                t[1] ? 'ED' : 'AT',
                                format_time(i[0]),
                                i[1],
                                Math.round(Math.pow(3.5e9 / i[1], 1/3)),
                                i[2],
                                format_time(i[3].seconds)
                            ]);
                        }
                    }
                }
            });
        };

        $scope.updatePerformanceView = function(n, v) {
            if(v) {
                $scope.performanceView = v;
                if(!n)
                    convert_performance_data();
            }
            if(n) {
                $scope.performance_timespan = n;
                refresh_training_data();
            }
        };

        refresh_health_data();
        refresh_training_data();

        // Submit handlers
        $scope.submitHealth = function(date, hr, weight, feeling) {
            $scope.hideError();
            rpc.add_health_data(date, hr, weight, feeling).then(function(response) {
                if('result' in response) {
                    refresh_health_data();
                } else
                    $scope.showError(response.error.message);
            });
        };

        $scope.submitPerformance = function(date, type, comment, intervals) {
            $scope.hideError();
            rpc.add_training(date, type, comment, intervals).then(function(response) {
                if('result' in response)
                    refresh_training_data();
                else
                    $scope.showError(response.error.message);
            });
        };
    }
});
