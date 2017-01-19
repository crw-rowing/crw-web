angular.module('crwApp').controller('coachController', function($scope, rpc) {
	 
     // Chart settings and data
    $scope.HRdata = {
            labels: [],
            series: ["heartrate average"],
            data: [[]
            ],
            datasetOverride: [
                {
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
                }
            ],
            datasetDefault:
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
    
    refresh_health_data = function(days) {
            rpc.get_team_health_data(days).then(function(response) {
                if ('result' in response) {
                    //[(member_email, [(date, resting_heart_rate, weight, comment)])]
                    $scope.HRdata.labels = []
                    for (var i = (days - 1); i >= 0; i--) {
                        var date = new Date();
                        date.setDate(date.getDate() - i);
                        $scope.HRdata.labels.push(date.getDate() + ' - ' + (date.getMonth() + 1))
                    }
                    $scope.HRdata.data = []
                    $scope.HRdata.data.push([])
                    console.log($scope.HRdata.data);
                    $scope.HRdata.series = [$scope.HRdata.series[0]]
                    $scope.HRdata.datasetOverride = [$scope.HRdata.datasetOverride[0]]
                    for (var i = 0; i < response.result.length; i++) {
                        $scope.HRdata.data.push([])
                        console.log($scope.HRdata.data);
                        userentry = response.result[i];
                        $scope.HRdata.datasetOverride.push($scope.HRdata.datasetDefault)
                        $scope.HRdata.series.push(userentry[0])
                        for (var j = 0; j < userentry[1].length; j++) {
                            healthentry = userentry[1][j];
                            index = $scope.HRdata.labels.indexOf(healthentry[0].day + ' - ' + healthentry[0].month);
                            if (index != -1) {
                                $scope.HRdata.data[i+1][index] = healthentry[1]
                            }
                            else {
                                continue;
                            }
                        }
                    }
                    set_average(days)
                }
                else {
                    alert('Error: unable to retreive health data from the server. Response: ' +
                          JSON.stringify(response));
                          
                }
            });
    }
    
    set_average = function(days) {
        //[[],[],[]]
        for(var i = 0; i < days; i++) {
            var total = 0.0;
            for(var j = 0; j < ($scope.HRdata.data.length - 1); j++) {
                total += $scope.HRdata.data[j+1][i];
            }
            $scope.HRdata.data[0][i] = total / ($scope.HRdata.data.length - 1)
        }
    }

        
    refresh_health_data(7);
    
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