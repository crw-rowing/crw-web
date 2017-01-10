var crwApp = angular.module('crwApp', ['chart.js', 'ngRoute']);

var rpc = {
    req_id: 1,
    call: function($http, method, params, user_id, session) {
        var obj;
        rpc.req_id++;
        if (user_id == null && session == null)
            obj = {"jsonrpc": "2.0", "method": method, "params": params, "id": rpc.req_id};
        else
            obj = {"jsonrpc": "2.0", "method": method, "params": params, "user_id" : user_id, "session" : session, "id": rpc.req_id};
        
        return new Promise(function(resolve, reject) {
            $http.post('/rpc', JSON.stringify(obj)).then(function(response) {
                resolve(response.data);
            }).catch(reject);
        });
    }
};

crwApp.config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
    $locationProvider.hashPrefix('!');
    $routeProvider.when('/home', {
        templateUrl: 'templates/login.template.html',
        controller: 'loginController'
    }).when('/rower', {
        template: '<rower-overview></rower-overview>'
    }).otherwise('home');
}]);

crwApp.controller('loginController', function($scope, $http) {
    $scope.loginStatus = 'Not logged in';
    $scope.loginHandler = function() {
        rpc.call($http, 'login', [$scope.user, $scope.login_pass], null, null).then(function(response) {
            $scope.loginStatus = 'result' in response ? response.result : response.error.message;
        });
    };
    $scope.registerHandler = function() {
        rpc.call($http, 'create_account', [$scope.user, $scope.register_pass1], null, null).then(function(response) {
            $scope.registerStatus = 'result' in response ? response.result : response.error.message;
        });
    };
});

crwApp.controller('crwController', function() {});

crwApp.component('rowerOverview', {
    templateUrl: 'templates/rower.template.html',
    controller: function($scope) {
        $scope.healthDate = new Date;
        $scope.intervalDate = new Date;
        $scope.submitHealth = function() {
            var data = $scope.HRdata,
                date = $scope.healthDate;
            data.labels.push(date.getDate() + '-' + (date.getMonth() + 1));
            data.data[0].push($scope.healthHR);
            data.data[1].push($scope.healthWeight);
        };
        $scope.submitInterval = function() {
            var data = $scope.Perfdata,
                date = $scope.intervalDate;
            data.labels.push(date.getDate() + '-' + (date.getMonth() + 1));
            data.data[0].push($scope.intervalWatt);
        };
        $scope.HRdata = {
            labels: ["8-12", "9-12", "10-12", "11-12", "12-12", "13-12", "14-12"],
            series: ["heart rate", "weight"],
            data: [
                [45, 59, 53, 51, 56, 55, 48],
                [56.3, 55, 55.6, 54, 55.9, 55.3, 55]
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
