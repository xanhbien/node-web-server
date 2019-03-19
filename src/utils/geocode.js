const request = require('request')

const geocode = (location, callback)=> {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + location + '.json?access_token=pk.eyJ1IjoieGFuaGJpZW4iLCJhIjoiY2p0Y3F6eXNyMHpiejN5bnVpY3poeDUzdSJ9.tcY7nsV7oCoWwYaxEyUNhg'
    request({
        url,
        json: true
    }, (error, {body}) => {
        if(error){
            callback('Unable to connect to service geo', undefined)
        }else if(body.features.length === 0){
            callback('Unable to find the geo code', undefined)
        }else {
            callback(undefined, {
                latitude    : body.features[0].center[1],
                longitude   : body.features[0].center[0],
                placeName   : body.features[0].place_name
            })

        }
    })
}
module.exports = geocode