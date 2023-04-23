const express = require('express')
const DBUtilService = require('./DBUtilService')
const cityToLocationKeyService = require('./LocationKeyService')
const extReqService = require('./ExternalReqService')
const app = express()
const port = 3005
const bodyParser = require('body-parser')
var jsonParser = bodyParser.json();
const WEATHER_INTEGRATION_HOST = 'http://localhost:5005',
  WEATHER_LOGIN_HOST = 'http://localhost:4005';

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.put('/forecast_preference', jsonParser, (req, res) =>{
    //TODO: change to actual userId
    let userId = 1,
    cities = req.body.cities,
    locationKeys = cityToLocationKeyService.getLocationKeyForCities(cities);
    DBUtilService.upsertForecastPreference(userId,locationKeys, (err, result) => {
      if(err)
        res.send(500, {message: 'Err in updating preferences!'})
      res.send(200, {message: 'Your preference has been saved!'})
    })
})

app.get('/forecast_preference', (req, res) => {
    let userId = req.query['user_id'];
    DBUtilService.getForecastPreference(userId, (err, result) => {
      if(err)
        res.send(500, {message: 'Err in updating preferences!'})

      res.send(200, result)
    })

})

app.post('/register', jsonParser, (req,res) => {
  let registerBody = req.body;
  extReqService.makeExtRequest(WEATHER_LOGIN_HOST+'/auth/register',registerBody,'POST', (err,body) =>{
    if(err){
      res.send(500, {message: 'Err in registration'});
    }
    res.send(200, body);
  })
})

app.post('/login', jsonParser, (req,res) => {
  let loginBody = req.body;
  extReqService.makeExtRequest(WEATHER_LOGIN_HOST+'/auth/login',loginBody,'POST', (err,body) =>{
    if(err){
      res.send(500, {message: 'Err in registration'});
    }
    res.send(200, body);
  })
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
