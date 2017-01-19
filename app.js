$("document").ready(function() {

$("#menu-toggle").click(function(e) {
    e.preventDefault();
    $("#wrapper").toggleClass("toggled");
});
var HRdata = {
    labels: ["8-12", "9-12", "10-12", "11-12", "12-12", "13-12", "14-12"],
    datasets: [
        {
            label: "heartrate",
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
            data: [45, 59, 53, 51, 56, 55, 48],
            spanGaps: false,
        },
        {
            label: "weight",
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
            label: "heartrate average",
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
            data: [56, 54, 53, 55, 56, 52, 59],
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
var weightData = {
	labels: ["8-12", "9-12", "10-12", "11-12", "12-12", "13-12", "14-12"],
	datasets:[
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
});
$('.nav-tabs a').click(function(){
    $(this).tab('show');
});


$('.nav-tabs a[href="#healthtable"]').on('shown.bs.tab', function(){
        document.getElementById('healthgraph').style.display = 'none';
    });
	
$('.nav-tabs a[href="#healthgraph"]').on('shown.bs.tab', function(){
		document.getElementById('healthgraph').style.display = 'block';
});

$('.nav-tabs a[href="#perftable"]').on('shown.bs.tab', function(){
        document.getElementById('perfgraph').style.display = 'none';
    });
	
$('.nav-tabs a[href="#perfgraph"]').on('shown.bs.tab', function(){
		document.getElementById('perfgraph').style.display = 'block';
});

$('.nav-tabs a[href="#healthtablecoach"]').on('shown.bs.tab', function(){
        document.getElementById('healthgraphcoach').style.display = 'none';
    });
	
$('.nav-tabs a[href="#healthgraphcoach"]').on('shown.bs.tab', function(){
		document.getElementById('healthgraphcoach').style.display = 'block';
});

$('.nav-tabs a[href="#perftablecoach"]').on('shown.bs.tab', function(){
        document.getElementById('perfgraphcoach').style.display = 'none';
    });
	
$('.nav-tabs a[href="#perfgraphcoach"]').on('shown.bs.tab', function(){
		document.getElementById('perfgraphcoach').style.display = 'block';
});

	
	$('#htablerower').dataTable();
	$('#ptablerower').dataTable();	
	$('#htablecoach').dataTable();
	$('#ptablecoach').dataTable();	
	
	$("input:checkbox:not(:checked)").each(function() {
    var column = "table ." + $(this).attr("name");
    $(column).hide();
});

$("input:checkbox").click(function(){
    var column = "table ." + $(this).attr("name");
    $(column).toggle();

	
	});

});
