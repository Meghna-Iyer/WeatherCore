const request = require('request')


module.exports = {
    makeExtRequest: (url, body, method, callback) => {
        console.log(url)
        request ({
            method: method,
            uri: url,
            json: true,
            body: body
        }, (err, response, body) => {
            if(err){
                return callback(err);
            }
            
            return callback(err,body)
        })
    }
}