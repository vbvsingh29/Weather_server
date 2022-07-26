const request = require("request");
const geocode= (address,callback)=>{
    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/"+encodeURIComponent(address)+ ".json?access_token=pk.eyJ1IjoidnZrc2luZ2giLCJhIjoiY2txM24wMjV2MGFjeDJvbWwyM3Z1dDYyYSJ9.Xh6etv9Dxe-E-GR9clqOng&limit=1"
    
    request({url : url, json : true},(error,response)=>{
        if (error){
            callback("plss try again later", undefined)
        }
        else if(response.body.features.length==0){
            callback("pls enter valid address",undefined)
        }
        else{
            callback(undefined,{
                'lattitude': response.body.features[0].center[1],
                'longitude': response.body.features[0].center[0],
                'location': response.body.features[0].place_name
            })
        }
    })
}

module.exports = geocode