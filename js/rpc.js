// RPC service
angular.module('crwApp').factory('rpc', function($http) {
    // Request ID is really not necessary, though it is required by the JSON-RPC spec.
    var req_id = 1,
        rpc = {
        call(method, params) {
            var obj = {
                "jsonrpc": "2.0",
                "method": method,
                "params": params,
                "id": req_id++
            };
            
            // Extension value. Used for authentication
            if('session' in localStorage)
                obj.session = localStorage.session;

            return $http.post('/rpc', JSON.stringify(obj)).then(function(response) {
                // Only pass the actual response to the next .then()
                return response.data;
            });
        },

        // RPC methods

        // Auth methods
        login: (user, pass) => rpc.call('login', [user, pass]),
        create_account: (user, pass) => rpc.call('create_account', [user, pass]),
        user_status: () => rpc.call('user_status', []),
        logout: () => rpc.call('logout', []),

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
        get_team_training_data: (days) => rpc.call('get_team_training_data', [days]),
    };
    return rpc;
});


