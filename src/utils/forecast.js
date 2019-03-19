const request = require('request')


const forecast = (latitude, longitude, callback)=> {
    const url = 'https://api.darksky.net/forecast/15e32ba879f113ef9da23b37d3ca1605/' + latitude + ',' + longitude
    request({
        url,
        json:true
    }, (error, {body}) => {
        if(error){

            callback('Unable to connect weather service', undefined)

        }else if(body.error){

            callback('Unable to find the location', undefined)
    
        }else {

        const cunrentlyDegrees = body.currently.temperature
        const cunrentlyPrecipIntensity = body.currently.precipIntensity
        callback(undefined, 'It is currently ' + cunrentlyDegrees + ' degrees out. There is a ' + cunrentlyPrecipIntensity +  '% chance of rain.')
        
    }
    })
}
module.exports = forecast