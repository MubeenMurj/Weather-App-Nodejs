const express = require('express')
const geoCode = require('./geocode')
const forecast = require('./forecast')

const app = express()

app.get('/about', (req, res) => {
    res.send('About Page')
})

app.get('/weather', (req, res) => {
    res.send('Weather Page')
})

app.listen(3000, () => {
    console.log('Server started')
})

const address = process.argv[2]

if (!address) {
    console.log('Please enter an address')
} else {
    geoCode(address, (error, {location, locationKey}) => {
        if (error) {
            return console.log('error ' + error)
        }

        console.log(location)
        forecast(locationKey, (error, {currentTemperature, rain}) => {
            if (error) {
                return console.log('error ' + error)
            }
            console.log('The temperature is ' + currentTemperature + ' out there. There are ' + rain + '% chances of rain.')
        })
    })
}
