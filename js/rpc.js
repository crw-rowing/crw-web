angular.module('crwApp').factory('rpc', function($http) {
    var session = localStorage.getItem('session'),
        user_id = null,
        req_id = 1;

    return function(method, params) {
        var obj;
        req_id++;
        if(user_id == null && session == null) // TODO && to ||
            obj = {"jsonrpc": "2.0", "method": method, "params": params, "id": req_id};
        else
            obj = {"jsonrpc": "2.0", "method": method, "params": params, "user_id" : user_id, "session" : session, "id": req_id};

        return $http.post('/rpc', JSON.stringify(obj)).then(function(response) {
            return response.data;
        });
    };
});


