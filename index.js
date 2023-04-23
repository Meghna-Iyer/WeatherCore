const express = require('express')
const dotenv = require('dotenv')
const DBUtilService = require('./DBUtilService')
const cityToLocationKeyService = require('./LocationKeyService')
const extReqService = require('./ExternalReqService')
const bodyParser = require('body-parser')
var jsonParser = bodyParser.json();

const app = express()

dotenv.config({ path: './.env'})
const port = process.env.WEATHER_CORE_PORT,
WEATHER_INTEGRATION_HOST = process.env.WEATHER_INTEGRATION_HOST,
WEATHER_LOGIN_HOST = process.env.WEATHER_LOGIN_HOST;

app.put('/forecast_preference', jsonParser, (req, res) =>{
    //TODO: change to actual userId
    let userId = 1,
    cities = req.body.cities,
    locationKeys = cityToLocationKeyService.getLocationKeyForCities(cities);
    DBUtilService.upsertForecastPreference(userId,locationKeys, (err, result) => {
      if(err) {
        console.log(err)
        res.send(500, {message: 'Err in updating preferences!'})
      }
      res.send(200, {message: 'Your preference has been saved!'})
    })
})

app.get('/forecast_preference', (req, res) => {
    let userId = req.query['user_id'];
    DBUtilService.getForecastPreference(userId, (err, result) => {
      if(err) {
        console.log(err)
        res.send(500, {message: 'Err in fetching preferences!'})
      }

      res.send(200, result)
    })

})

app.post('/register', jsonParser, (req,res) => {
  let registerBody = req.body;
  extReqService.makeExtRequest(WEATHER_LOGIN_HOST+'/auth/register',registerBody,'POST', (err,body) =>{
    if(err){
      console.log(err)
      res.send(500, {message: 'Err in registration'});
    }
    res.send(200, body);
  })
})

app.post('/login', jsonParser, (req,res) => {
  let loginBody = req.body;
  extReqService.makeExtRequest(WEATHER_LOGIN_HOST+'/auth/login',loginBody,'POST', (err,body) =>{
    if(err){
      console.log(err)
      res.send(500, {message: 'Err in login'});
    }
    res.send(200, body);
  })
})

app.listen(port, () => {
  console.log(`Weather Core app listening on port ${port}`)
})
