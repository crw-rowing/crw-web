// Rower dashboard
angular.module('crwApp').component('rowerOverview', {
    templateUrl: 'templates/rower.template.html',
    controller: function($scope, rpc) {
        // Set date to today on forms
        $scope.healthDate = new Date;
        $scope.intervalDate = new Date;

        // Submit handlers
        $scope.submitHealth = function() {
            var data = $scope.HRdata,
                date = $scope.healthDate;
            data.labels.push(date.getDate() + '-' + (date.getMonth() + 1));
            data.data[0].push($scope.healthHR);
            data.data[1].push($scope.healthWeight);

            rpc.add_health_data($scope.healthDate, $scope.healthHR,
                                $scope.healthWeight, $scope.healthFeeling)
                .then(function(response) {
                    if('result' in response) {
                        // Succes, TODO: update the graph
                    } else {
                        alert('Error in submitting health data: ' + JSON.stringify(response));
                    }
                });
        };
        $scope.submitInterval = function() {
            var data = $scope.Perfdata,
                date = $scope.intervalDate;
            data.labels.push(date.getDate() + '-' + (date.getMonth() + 1));
            data.data[0].push($scope.intervalWatt);

            rpc.add_training(
                $scope.intervalDate, $scope.intervalType === 'ED',
                '' /* no comments yet */, [[$scope.intervalDurance, $scope.intervalWatt,
                                            $scope.intervalPace, $scope.intervalRest]])
                .then(function(response) {
                    if('result' in response) {
                        // Succes, TODO: update the graph
                    } else {
                        alert('Error in submitting training data: ' + JSON.stringify(response));
                    }
                });
        };

        // Chart settings and data
        // TODO retrieve data from server
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
                    lineTension: 0.1,
                    backgroundColor: "rgba(75,192,192,0.4)",
                    borderColor: "rgba(75,192,192,1)",
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
                },
                {
                    yAxisID: 'y-axis-2',
                    fill: false,
                    lineTension: 0.1,
                    backgroundColor: "rgba(192,57,57,0.4)",
                    borderColor: "rgba(192,57,57,1)",
                    borderCapStyle: 'butt',
                    borderDash: [],
                    borderDashOffset: 0.0,
                    borderJoinStyle: 'miter',
                    pointBorderColor: "rgba(192,57,57,0.4)",
                    pointBackgroundColor: "#fff",
                    pointBorderWidth: 1,
                    pointHoverRadius: 5,
                    pointHoverBackgroundColor: "rgba(192,57,57,1)",
                    pointHoverBorderColor: "rgba(220,220,220,1)",
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
                        },
                        {
                            id: 'y-axis-2',
                            type: 'linear',
                            display: true,
                            position: 'right',
                        }
                    ]
                }
            }
        };

        rpc.get_health_data(7).then(function(response) {
            if ('result' in response) {
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

        $scope.Perfdata = {
            labels: ["8-12", "9-12", "10-12", "11-12", "12-12", "13-12", "14-12"],
            series: ["watt"],
            data: [
                [210, 200, 215, 212, 208, 216, 211],
            ],
            datasetOverride: [
                {
                    fill: false,
                    lineTension: 0.1,
                    backgroundColor: "rgba(75,192,192,0.4)",
                    borderColor: "rgba(75,192,192,1)",
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
                    yAxisID: 'y-axis-1'
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
    }
});
