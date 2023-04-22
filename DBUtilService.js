const mysql = require('mysql')

initNewConnection = () => {
    let connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'weather_service'
    })
    connection.connect()
    return connection;
}

module.exports = {
    initNewConnection: initNewConnection,

    upsertForecastPreference: (userId, locationKeys, callback) => {
        locationKeys = JSON.stringify(locationKeys);
        let connection = initNewConnection();
        connection.query({
            sql: "REPLACE INTO forecast_preference(user_id, location_keys) VALUES(?,?) ",
            values: [userId, locationKeys]
        }, function (error, results) {
            if (error) return callback(error);
            return callback(null, results);
        });
    },

    getForecastPreference: (userId, callback) => {
        let connection = initNewConnection();
        connection.query({
            sql: "SELECT user_id, location_keys FROM forecast_preference WHERE user_id = ?",
            values: [userId]
        }, function (error, results) {
            if (error) return callback(error);
            results[0]['location_keys'] = JSON.parse(results[0]['location_keys'])
            return callback(null, results);
        });
    }

}

