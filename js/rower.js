// Rower dashboard
angular.module('crwApp').component('rowerOverview', {
    templateUrl: 'templates/rower.template.html',
    controller: function($scope, rpc) {
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
            series: ["watt"],
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

        refresh_health_data = function() {
            rpc.get_health_data(7).then(function(response) {
                if ('result' in response) {
                    $scope.HRdata.labels = [];
                    $scope.HRdata.data = [ [], [] ]
                    for (var i = 0; i < response.result.length; i++) {
                        entry = response.result[i];
                        $scope.HRdata.labels.push(entry[0].day + ' - ' + entry[0].month)
                        $scope.HRdata.data[0].push(entry[1])
                        $scope.HRdata.data[1].push(entry[2])
                    }
                } else {
                    alert('Error: unable to retreive health data from the server. Response: ' +
                          JSON.stringify(response));
                }
            });
        }

        refresh_training_data = function() {
            rpc.get_training_data(7).then(function(response) {
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
                        $scope.Perfdata.data[0].push(entry[3][0][1])
                    }
                } else {
                    alert('Error: unable to retreive health data from the server. Response: ' +
                          JSON.stringify(response));
                }
            });
        }

        refresh_health_data();
        refresh_training_data();

        // Submit handlers
        $scope.submitHealth = function() {
            rpc.add_health_data($scope.healthDate, $scope.healthHR,
                                $scope.healthWeight, $scope.healthFeeling)
                .then(function(response) {
                    if('result' in response) {
                        refresh_health_data();
                    } else {
                        alert('Error in submitting health data: ' + JSON.stringify(response));
                    }
                });
        };
        $scope.submitInterval = function() {
            intervalObject = {"__type__" : "timedelta"};
            intervalObject.seconds = $scope.intervalRest;
            rpc.add_training(
                $scope.intervalDate, $scope.intervalType === 'ED',
                '' /* no comments yet */, [[$scope.intervalDurance, $scope.intervalWatt,
                                            $scope.intervalPace, $scope.intervalRest]])
                .then(function(response) {
                    if('result' in response) {
                        refresh_training_data();
                    } else {
                        alert('Error in submitting training data: ' + JSON.stringify(response));
                    }
                });
        };
    }
});
