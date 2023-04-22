const express = require('express')
const DBUtilService = require('./DBUtilService')
const cityToLocationKeyService = require('./LocationKeyService')
const app = express()
const port = 3000
const bodyParser = require('body-parser')
var jsonParser = bodyParser.json()

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

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
