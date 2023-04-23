const express = require('express')
const dotenv = require('dotenv')
const DBUtilService = require('./DBUtilService')
const locationKeyService = require('./LocationKeyService')
const extReqService = require('./ExternalReqService')
const bodyParser = require('body-parser')
var jsonParser = bodyParser.json();

const app = express()

dotenv.config({ path: './.env'})
const port = process.env.WEATHER_CORE_PORT_NUMBER,
WEATHER_INTEGRATION_SERVICE_HOST = process.env.WEATHER_INTEGRATION_HOST_URL,
WEATHER_LOGIN_SERVICE_HOST = process.env.WEATHER_LOGIN_HOST_URL;

function getForeCasePreferenceData(result) {
  let cities = locationKeyService.getCitiesForLocationKeys(result[0]['location_keys'])
  let prefData = {}
  prefData.user_id = result[0]['user_id']
  prefData.cities = cities
  return prefData
}

app.put('/forecast_preference', jsonParser, (req, res) =>{
    let userId = req.body.user_id,
    cities = req.body.cities,
    locationKeys = locationKeyService.getLocationKeyForCities(cities);
    DBUtilService.upsertForecastPreference(userId,locationKeys, (err, result) => {
      if(err) {
        console.log(err)
        return res.send(500, {message: 'Err in updating preferences!'})
      }
      return res.send(200, {message: 'Your preference has been saved!'})
    })
})

app.get('/forecast_preference', (req, res) => {
    let userId = req.query['user_id'];
    
    DBUtilService.getForecastPreference(userId, (err, result) => {
      if(err) {
        console.log(err)
        return res.send(500, {message: 'Err in fetching preferences!'})
      }

      return res.send(200, getForeCasePreferenceData(result))
    })

})

app.post('/register', jsonParser, (req,res) => {
  let registerBody = req.body;
  extReqService.makeExtRequest(WEATHER_LOGIN_SERVICE_HOST+'/auth/register',registerBody,'POST', (err,body) =>{
    if(err){
      console.log(err)
      if(err.code = 'ECONNREFUSED') {
        return res.send(424, {message: 'Err in registration'});
      }
      return res.send(500, {message: 'Err in registration'});
    }
    return res.send(200, body);
  })
})

app.post('/login', jsonParser, (req,res) => {
  let loginBody = req.body;
  extReqService.makeExtRequest(WEATHER_LOGIN_SERVICE_HOST+'/auth/login',loginBody,'POST', (err,body) =>{
    if(err){
      console.log(err)
      if(err.code = 'ECONNREFUSED') {
        return res.send(424, {message: 'Err in login'});
      }
      return res.send(500, {message: 'Err in login'});
    }
    return res.send(200, body);
  })
})

app.get('/weather_forecast', jsonParser, (req,res) => {
  let getForeCastRequestBody = req.body;

  extReqService.makeExtRequest(WEATHER_INTEGRATION_SERVICE_HOST+'/get_forecast',getForeCastRequestBody,'GET', (err,body) =>{
    if(err){
      console.log(err)
      if(err.code = 'ECONNREFUSED') {
        return res.send(424, {message: 'Err in getting forecast'});
      }
      return res.send(500, {message: 'Err in getting forecast'});
    }
    return res.send(200, body);
  })
})

app.get('/', (req, res) => {
  res.send('Weather Core microservice')
})

app.listen(port, () => {
  console.log(`Weather Core app listening on port ${port}`)
})

