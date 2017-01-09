$("document").ready(function() {
var login_form = document.getElementById("login_form");
	var register_form = document.getElementById("register_form");
	function session(response){
		var arr = JSON.parse(response);
		alert('ingelogd ofzo');
		if ("result" in arr){
			document.getElementById("login_status").innerHTML = "Sessionkey:" + arr.result;
		} else {
			document.getElementById("login_status").innerHTML = "Error: " + arr.error.message + " " + arr.error.code;
		}
	}
	
	function register(response){
		var arr = JSON.parse(response);
		if ("result" in arr){
			document.getElementById("register_status").innerHTML = "Account created";
		} else {
			document.getElementById("register_status").innerHTML = "Error: " + arr.error.message + " " + arr.error.code;
		}
	}

	document.getElementById('loginButton').addEventListener('click', function() {
		RPCcall('login', [login_form.elements[0].value, login_form.elements[1].value], null, null, session);
	});
	document.getElementById('registerButton').addEventListener('click', function() {
		RPCcall('create_account', [register_form.elements[0].value, register_form.elements[1].value], null, null, register);
	});
});