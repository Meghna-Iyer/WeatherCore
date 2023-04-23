const locationKeyCityJson = {
    "Dhaka": {
        "key": "28143",
        "regionName": "Asia",
        "country": "Bangladesh"
    },
    "Kinshasa": {
        "key": "113487",
        "regionName": "Africa",
        "country": "Democratic Republic of the Congo"
    },
    "Santiago": {
        "key": "60449",
        "regionName": "South America",
        "country": "Chile"
    },
    "Beijing": {
        "key": "101924",
        "regionName": "Asia",
        "country": "China"
    },
    "Bogota": {
        "key": "107487",
        "regionName": "South America",
        "country": "Colombia"
    },
    "Berlin": {
        "key": "178087",
        "regionName": "Europe",
        "country": "Germany"
    },
    "Cairo": {
        "key": "127164",
        "regionName": "Africa",
        "country": "Egypt"
    },
    "Madrid": {
        "key": "308526",
        "regionName": "Europe",
        "country": "Spain"
    },
    "London": {
        "key": "328328",
        "regionName": "Europe",
        "country": "United Kingdom"
    },
    "Athens": {
        "key": "182536",
        "regionName": "Europe",
        "country": "Greece"
    },
    "Hong Kong": {
        "key": "1123655",
        "regionName": "Asia",
        "country": "Hong Kong"
    },
    "Jakarta": {
        "key": "208971",
        "regionName": "Asia",
        "country": "Indonesia"
    },
    "Baghdad": {
        "key": "207375",
        "regionName": "Middle East",
        "country": "Iraq"
    },
    "Tokyo": {
        "key": "226396",
        "regionName": "Asia",
        "country": "Japan"
    },
    "Seoul": {
        "key": "226081",
        "regionName": "Asia",
        "country": "South Korea"
    },
    "Mexico City": {
        "key": "242560",
        "regionName": "North America",
        "country": "Mexico"
    },
    "Lima": {
        "key": "264120",
        "regionName": "South America",
        "country": "Peru"
    },
    "Moscow": {
        "key": "294021",
        "regionName": "Asia",
        "country": "Russia"
    },
    "Riyadh": {
        "key": "297030",
        "regionName": "Middle East",
        "country": "Saudi Arabia"
    },
    "Singapore": {
        "key": "300597",
        "regionName": "Asia",
        "country": "Singapore"
    },
    "Bangkok": {
        "key": "318849",
        "regionName": "Asia",
        "country": "Thailand"
    },
    "Hanoi": {
        "key": "353412",
        "regionName": "Asia",
        "country": "Vietnam"
    },
    "Sydney": {
        "key": "22889",
        "regionName": "Oceania",
        "country": "Australia"
    },
    "Shanghai": {
        "key": "106577",
        "regionName": "Asia",
        "country": "China"
    },
    "Delhi": {
        "key": "202396",
        "regionName": "Asia",
        "country": "India"
    },
    "Bengaluru": {
        "key": "204108",
        "regionName": "Asia",
        "country": "India"
    },
    "Mumbai": {
        "key": "204842",
        "regionName": "Asia",
        "country": "India"
    },
    "Kolkata": {
        "key": "206690",
        "regionName": "Asia",
        "country": "India"
    },
    "Karachi": {
        "key": "261158",
        "regionName": "Asia",
        "country": "Pakistan"
    },
    "Istanbul": {
        "key": "318251",
        "regionName": "Middle East",
        "country": "Türkiye"
    },
    "Los Angeles": {
        "key": "347625",
        "regionName": "North America",
        "country": "United States"
    },
    "New York": {
        "key": "349727",
        "regionName": "North America",
        "country": "United States"
    },
    "Kabul": {
        "key": "4361",
        "regionName": "Asia",
        "country": "Afghanistan"
    },
    "Buenos Aires": {
        "key": "7894",
        "regionName": "South America",
        "country": "Argentina"
    },
    "Havana": {
        "key": "122438",
        "regionName": "Central America",
        "country": "Cuba"
    },
    "Paris": {
        "key": "623",
        "regionName": "Europe",
        "country": "France"
    },
    "Tehran": {
        "key": "210841",
        "regionName": "Middle East",
        "country": "Iran"
    },
    "Manila": {
        "key": "264885",
        "regionName": "Asia",
        "country": "Philippines"
    },
    "Belgrade": {
        "key": "298198",
        "regionName": "Europe",
        "country": "Serbia"
    },
    "Dakar": {
        "key": "297442",
        "regionName": "Africa",
        "country": "Senegal"
    },
    "Taipei City": {
        "key": "315078",
        "regionName": "Asia",
        "country": "Taiwan"
    },
    "Cape Town": {
        "key": "306633",
        "regionName": "Africa",
        "country": "South Africa"
    },
    "São Paulo": {
        "key": "45881",
        "regionName": "South America",
        "country": "Brazil"
    },
    "Toronto": {
        "key": "55488",
        "regionName": "North America",
        "country": "Canada"
    },
    "Osaka-shi": {
        "key": "225007",
        "regionName": "Asia",
        "country": "Japan"
    },
    "Jerusalem": {
        "key": "213225",
        "regionName": "Middle East",
        "country": "Israel"
    },
    "Amsterdam": {
        "key": "249758",
        "regionName": "Europe",
        "country": "Netherlands"
    },
    "Stockholm": {
        "key": "314929",
        "regionName": "Europe",
        "country": "Sweden"
    },
    "Honolulu": {
        "key": "348211",
        "regionName": "North America",
        "country": "United States"
    },
    "Reykjavik": {
        "key": "190390",
        "regionName": "Arctic",
        "country": "Iceland"
    }
}

function getLocationKeyCityMapping() {
    let locationKeyCityMapping = new Map();
    Object.keys(locationKeyCityJson).forEach(jsonKey => {  
        locationKeyCityMapping.set(`${locationKeyCityJson[jsonKey].key}`, `${jsonKey}`)
    })
    return locationKeyCityMapping;
}

function getLocationKeyForCities(cityList) {
    let locationKeys = [];
    cityList.forEach(function(city){
        locationKeys.push(locationKeyCityJson[city].key)
    })
    return locationKeys;
}

function getCitiesForLocationKeys(locationKeys) {
    let cities = [];
    let locationKeyCityMapping = getLocationKeyCityMapping();
    locationKeys.forEach(function(locationKey){
        cities.push(locationKeyCityMapping.get(locationKey))
    })
    return cities;
}


module.exports = {
    getLocationKeyForCities: getLocationKeyForCities,
    getCitiesForLocationKeys: getCitiesForLocationKeys
}