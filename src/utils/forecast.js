const { response } = require("express")
const request = require("request")

  const forecast = (longitude,lattitude, callback )=>{
      const url1 = "http://api.weatherstack.com/current?access_key=a411b6a6dfb28845967259fb481be876&query="+encodeURI(longitude)+","+encodeURI(lattitude)+"&units=m"
        
      request({url: url1, json : true},(error,response)=>{     //can use body instead of response (destructing) and shortname in url directly
          if(error){
              callback("pls try again later", undefined)
            }
          else if (response.body.error){
              callback("pls enter valid data",undefined)
            }
           else{
               const data = response.body.current.weather_descriptions[0] +" "+ response.body.current.temperature
                  callback(undefined,"It is "+response.body.current.weather_descriptions[0] +" And the temperature is "+ response.body.current.temperature +" degrees C, It feels like "+response.body.current.feelslike +" Degrees C and Humidity is "+ response.body.current.humidity+ " %",
                  message=response.body.current.weather_descriptions[0])
                  
            
                 }    
           })
     }

     module.exports= forecast