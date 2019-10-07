const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?access_token=pk.eyJ1IjoicHVuZWV0cGFudCIsImEiOiJjand5anJiM2ExZmRyNDFtb2w0MWF2NzRlIn0.OMTzqZW7bkO2mXC9CIGIag&limit=1'
    console.log("url: ",url);
    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to location services!', undefined)
        } 
        // else if (body.features.length === 0) {
        //     callback('Unable to find location. Try another search.', undefined)
        // } 
        else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode