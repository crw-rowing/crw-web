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
