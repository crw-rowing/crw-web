var crwApp = angular.module('crwApp', ['chart.js']);

crwApp.controller('crwController', function($scope) {
});

$("document").ready(function() {
var HRdata = {
    labels: ["8-12", "9-12", "10-12", "11-12", "12-12", "13-12", "14-12"],
    datasets: [
        {
            label: "heartrate",
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
            data: [45, 59, 53, 51, 56, 55, 48],
            spanGaps: false,
        },
        {
            label: "weight",
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
            data: [56.3, 55, 55.6, 54, 55.9, 55.3, 55],
            spanGaps: false,
        }
    ]
};
        
var Perfdata = {
    labels: ["8-12", "9-12", "10-12", "11-12", "12-12", "13-12", "14-12"],
    datasets: [
        {
            label: "watt",
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
            data: [210, 200, 215, 212, 208, 216, 211],
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

});
