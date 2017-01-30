angular.module('crwApp').controller('coachController', function($scope, rpc) {
	 
     // Chart settings and data
    $scope.healthData = {
            labels: [],
            series: ["average"],
            heartrateData: [],
            weightData: [],
            heartrateDatasetOverride: [],
            weightDatasetOverride: [],
            datasetOverride: [
                /* {
                    yAxisID: 'y-axis-1',
                    fill: true,
                    lineTension: 0.3,
                    lineDash: true,
                    backgroundColor: "rgba(75,192,192,.2)",
                    borderColor: "rgba(75,192,192,.2)",
                    borderCapStyle: 'butt',
                    borderDash: [],
                    borderDashOffset: 0.0,
                    borderJoinStyle: 'miter',
                    pointBorderColor: "rgba(75,192,192,.2)",
                    pointBackgroundColor: "#fff",
                    pointBorderWidth: 1,
                    pointHoverRadius: 5,
                    pointHoverBackgroundColor: "rgba(75,192,192,.2)",
                    pointHoverBorderColor: "rgba(220,220,220,.4)",
                    pointHoverBorderWidth: 2,
                    pointRadius: 1,
                    pointHitRadius: 10,
                    spanGaps: false,
                } */
            ],
            /* datasetDefault:
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
                } ,*/
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
                    ],
                     xAxes: [{
                        type: 'time',
                        unit: 'day',
                        unitStepSize: 1,
                        time: {
                            displayFormats: {
                            day: 'MMM DD'
                            }
                        }
                    }]
            }
        }
    };
    
    $scope.trainingData = {
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
                    ],
                     xAxes: [{
                        type: 'time',
                        unit: 'day',
                        unitStepSize: 1,
                            time: {
                                displayFormats: {
                                    day: 'MMM DD'
                                }
                            }
                    }]
            }
        }
    };
    
    $scope.colors = [{
        backgroundColor: "rgba(75,192,192,.2)",
        borderColor: "rgba(75,192,192,1)",
        pointBorderColor: "rgba(75,192,192,.2)",
        pointBackgroundColor: "#fff",
        pointHoverBackgroundColor: "rgba(75,192,192,.2)",
        pointHoverBorderColor: "rgba(220,220,220,.4)",
        }, '#00ADF9', '#FDB45C', 'deepPink'];
    
    
    refresh_health_data = function(days) {
        rpc.get_team_health_data(days).then(function(response) {
                if ('result' in response) {
                    //[(member_email, [(date, resting_heart_rate, weight, comment)])]
                    $scope.healthData.heartrateDatasetOverride = []
                    $scope.healthData.heartrateTable = []
                    $scope.healthData.weightDatasetOverride = []
                    $scope.healthData.weightTable = []
                    for (var i = 0; i < response.result.length; i++) {
                        var userEntry = response.result[i];
                        $scope.healthData.heartrateData.push([])
                        $scope.healthData.weightData.push([])
                        $scope.healthData.heartrateDatasetOverride.push(
                        {
                            yAxisID: 'y-axis-1',
                            lineTension: 0.3,
                            lineDash: true,
                            borderCapStyle: 'butt',
                            borderDash: [],
                            borderDashOffset: 0.0,
                            borderJoinStyle: 'miter',
                            pointBorderWidth: 1,
                            pointHoverRadius: 5,
                            pointHoverBorderWidth: 2,
                            pointRadius: 1,
                            pointHitRadius: 10,
                            spanGaps: false,
                            fill: false,
                        })
                        $scope.healthData.weightDatasetOverride.push(
                        {
                            yAxisID: 'y-axis-1',
                            lineTension: 0.3,
                            lineDash: true,
                            borderCapStyle: 'butt',
                            borderDash: [],
                            borderDashOffset: 0.0,
                            borderJoinStyle: 'miter',
                            pointBorderWidth: 1,
                            pointHoverRadius: 5,
                            pointHoverBorderWidth: 2,
                            pointRadius: 1,
                            pointHitRadius: 10,
                            spanGaps: false,
                            fill: false,
                        })
                        $scope.healthData.heartrateDatasetOverride[i].label = userEntry[0]
                        $scope.healthData.heartrateDatasetOverride[i].data = []
                        $scope.healthData.weightDatasetOverride[i].label = userEntry[0]
                        $scope.healthData.weightDatasetOverride[i].data = []
                        for (var j = 0; j < userEntry[1].length; j++) {
                            var healthEntry = userEntry[1][j];
                            date = new Date(healthEntry[0].year, healthEntry[0].month -1, healthEntry[0].day);
                            $scope.healthData.heartrateDatasetOverride[i].data.push({x: date, y: healthEntry[1]})
                            $scope.healthData.heartrateTable.push(
                                { "member" : userEntry[0],
                                  "date" : date,
                                  "hr" : healthEntry[1],
                                  "comment" : healthEntry[3]
                                })
                            $scope.healthData.weightDatasetOverride[i].data.push({x: date, y: healthEntry[2]})
                            $scope.healthData.weightTable.push(
                                    { "member" : userEntry[0],
                                      "date" : date,
                                      "weight" : healthEntry[2],
                                      "comment" : healthEntry[3]
                                    })
                        }
                    }
                }
                else {
                    alert('Error: unable to retreive health data from the server. Response: ' +
                          JSON.stringify(response));
                          
                }
            });
    }
    
    refresh_training_data = function(days) {
        rpc.get_team_training_data(days).then(function(response) {
                if ('result' in response) {
                /* [(member_email,
                     [(time, type_is_ed, comment,
                        [(duration, power, pace, rest)]
                     )] 
                   )] */
                   for(var i = 0; i < response.result.length; i++) {
                       var userEntry = response.result[i];
                       $scope.trainingData.data.push([])
                       $scope.trainingData.datasetOverride.push(
                       {
                             yAxisID: 'y-axis-1',
                             lineTension: 0.3,
                             lineDash: true,
                             borderCapStyle: 'butt',
                             borderDash: [],
                             borderDashOffset: 0.0,
                             borderJoinStyle: 'miter',
                             pointBorderWidth: 1,
                             pointHoverRadius: 5,
                             pointHoverBorderWidth: 2,
                             pointRadius: 1,
                             pointHitRadius: 10,
                             spanGaps: false,
                             fill: false,
                       })
                       $scope.trainingData.datasetOverride[i].label = userEntry[0]
                       $scope.trainingData.datasetOverride[i].data = []
                       for(var j = 0; j < userEntry[1].length; j++) {
                           var trainingEntry = userEntry[1][j];
                           var powerTotal = 0.0;
                           for(var k = 0; k < trainingEntry[3].length; k++) {
                               intervalEntry = trainingEntry[3][k];
                               powerTotal += intervalEntry[1];
                           }
                           var powerAverage = powerTotal / (trainingEntry[3].length);
                           var date = new Date(trainingEntry[0].year, trainingEntry[0].month -1, trainingEntry[0].day, trainingEntry[0].hour, trainingEntry[0].minute);
                           $scope.trainingData.datasetOverride[i].data.push({x: date, y: powerAverage})
						   $scope.trainingData.trainingTable.push(
                                    { "member" : userEntry[0],
                                      "date" : "x",
                                      "typetraining" : "x",
									  "duration" : "x",
									  "rest" : "x",
									  "pace" : "x",
									  "watt" : "x",
									  "split" : "x",
									  "distance" : "x"
                                    })
                       }
                   }
                }
        })
    }
   
        
    refresh_health_data(7);
    refresh_training_data(7);
    
});  
    /*$scope.Weightdata = {
            labels: [],
            series: ["heart rate", "weight", "heartrate average", "weight average"],
            data: [
                [],
                [],
                [],
                []
            ],
            datasetOverride: [
                {
                    label: "rower 1",
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
                    data: [56.3, 55, 55.6, 54, 55.9, 55.3, 55],
                    spanGaps: false,
                },
                {
                    label: "rower 2",
                    fill: false,
                    lineTension: 0.3,
                    backgroundColor: "rgba(57,192,57,0.15)",
                    borderColor: "rgba(57,192,57,1)",
                    borderCapStyle: 'butt',
                    borderDash: [],
                     borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: "rgba(57,192,57,0.4)",
            pointBackgroundColor: "#fff",
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: "rgba(57,192,57,.4)",
            pointHoverBorderColor: "rgba(220,220,220,.4)",
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: [58.5, 57.8, 57.9, 57.7, 58.1, 58.2, 58],
            spanGaps: false,
        },
		{
            label: "weight average",
            fill: true,
            lineTension: 0.3,
            backgroundColor: "rgba(150,70,30,0.15)",
            borderColor: "rgba(150,70,30,0.15)",
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: "rgba(150,70,30,0.15)",
            pointBackgroundColor: "#fff",
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: "rgba(150,70,30,0.15)",
            pointHoverBorderColor: "rgba(220,220,220,.4)",
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: [56.7, 56, 55.8, 57, 58.1, 57.9, 58],
            spanGaps: false,
        }
	]
};
        
var Perfdata = {
    labels: ["8-12", "9-12", "10-12", "11-12", "12-12", "13-12", "14-12"],
    datasets: [
        {
            label: "AT",
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
            data: [210, 200, 215, 212, 208, 216, 211],
            spanGaps: false,
        },
		{
            label: "ED",
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
            data: [180,170, 173, 170, 178, 181, 179],
            spanGaps: false,
        },
		{
            label: "AT average",
            fill: true,
            lineTension: 0.3,
            backgroundColor: "rgba(75,192,192,.15)",
            borderColor: "rgba(75,192,192,.15)",
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: "rgba(75,192,192,.15)",
            pointBackgroundColor: "#fff",
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: "rgba(75,192,192,.15)",
            pointHoverBorderColor: "rgba(220,220,220,.15)",
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: [215, 205, 212, 210, 211, 215, 213],
            spanGaps: false,
        },
			{
            label: "ED average",
            fill: true,
            lineTension: 0.3,
            backgroundColor: "rgba(75,192,50,0.20)",
            borderColor: "rgba(75,192,50,.20)",
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: "rgba(75,192,192,.20)",
            pointBackgroundColor: "#fff",
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: "rgba(75,192,192,.151)",
            pointHoverBorderColor: "rgba(220,220,220,.2)",
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: [185,173, 169, 171, 175, 183, 176],
            spanGaps: false,
        }
    ]
};
var HrGraph = new Chart(document.getElementById("HrGraph").getContext("2d"), {
    type: 'line',
    data: HRdata
});
var PerfGraph = new Chart(document.getElementById("PerfGraph").getContext("2d"), {
    type: 'line',
    data: Perfdata
});
var coachWeight = new Chart(document.getElementById("coachWeight").getContext("2d"), {
	type:'line',
	data: weightData
}); */ 