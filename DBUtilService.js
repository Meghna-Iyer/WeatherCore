const mysql = require('mysql2')
const dotenv = require('dotenv')

dotenv.config({ path: './.env'})

initNewConnection = () => {
    let connection = mysql.createConnection({
        host: process.env.DATABASE_HOST,
        user: process.env.DATABASE_USER,
        password: process.env.DATABASE_PASSWORD,
        database: process.env.DATABASE,
        port: process.env.DATABASE_PORT
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
            if (results.length > 0)
                results[0]['location_keys'] = JSON.parse(results[0]['location_keys'])
            return callback(null, results);
        });
    }

}

