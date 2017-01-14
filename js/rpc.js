// RPC service
angular.module('crwApp').factory('rpc', function($http) {
    var session = localStorage.getItem('session'),
        user_id = null,
        req_id = 1;

    var rpc = {
        call(method, params) {
            var obj;
            req_id++;
            if(user_id == null && session == null) // TODO && to ||
                obj = {
                    "jsonrpc": "2.0",
                    "method": method,
                    "params": params,
                    "id": req_id
                };
            else
                obj = {
                    "jsonrpc": "2.0",
                    "method": method,
                    "params": params,
                    "user_id" : user_id,
                    "session" : session,
                    "id": req_id
                };

            return $http.post('/rpc', JSON.stringify(obj)).then(function(response) {
                // Only pass the actual response to the next .then()
                return response.data;
            });
        },

        // Auth methods
        login: (user, pass) => rpc.call('login', [user, pass]),
        create_account: (user, pass) => rpc.call('create_account', [user, pass]),
        logged_in: () => rpc.call('logged_in', []),

        // Team management methods
        create_team: (team_name) => rpc.call('create_team', [team_name]),
        add_to_team: (user) => rpc.call('add_to_team', [user]),
        remove_from_team: (user) => rpc.call('remove_from_team', [user]),
        set_coach_status: (user, coach) => rpc.call('set_coach_status', [user, coach]),
        team_info: () => rpc.call('my_team_info', []),

        // Health methods
        add_health_data: (date, hr, weight, comment) => rpc.call('add_health_data', [date, hr, weight, comment]),
        get_health_data: (days) => rpc.call('get_my_health_data', [days]),
        get_team_health_data: (days) => rpc.call('get_team_health_data', [days]),

        // Training methods
        add_training: (time, type_is_ed, comment, intervals) => rpc.call('add_training', [time, type_is_ed, comment, intervals]),
        get_training_data: (days) => rpc.call('get_my_training_data', [days]),
    };
    return rpc;
});


