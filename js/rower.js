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

        $scope.health_timespan = 7;

        $scope.performance_timespan = 7;
        $scope.performanceView = 'watt';
        $scope.performanceData = [];

        refresh_health_data = function() {
            $scope.hideError();
            rpc.get_health_data($scope.health_timespan).then(function(response) {
                if ('result' in response) {
                    $scope.HRdata.labels = [];
                    $scope.HRdata.data = [ [], [] ]
                    for (var i = 0; i < response.result.length; i++) {
                        entry = response.result[i];
                        $scope.HRdata.labels.push(entry[0].day + ' - ' + entry[0].month)
                        $scope.HRdata.data[0].push(entry[1])
                        $scope.HRdata.data[1].push(entry[2])
                    }
                } else
                    $scope.showError(response.error.message);
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
                    $scope.Perfdata.data[0][i] = Math.pow(3.5*1e9/$scope.performanceData[i], 1/3);
            }
        };

        refresh_training_data = function() {
            $scope.hideError();
            rpc.get_training_data($scope.performance_timespan).then(function(response) {
                if ('result' in response) {
                    $scope.Perfdata.labels = [];
                    $scope.Perfdata.data = [ [], ];
                    for (var i = 0; i < response.result.length; i++) {
                        entry = response.result[i];
                        $scope.Perfdata.labels.push(entry[0].day + ' - ' +
                                                    entry[0].month + ' ' +
                                                    entry[0].hour + ':' +
                                                    (entry[0].second < 10 ? '0' : '') +
                                                    entry[0].second)
                        $scope.performanceData.push(entry[3][0][1])
                        $scope.Perfdata.data[0].push(entry[3][0][1])
                    }
                    convert_performance_data();
                } else
                    $scope.showError(response.error.message);
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
