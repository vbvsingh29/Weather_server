 const path = require("path")
 const express = require("express")
 const hbs = require("hbs")
 const geocode = require("./utils/geocode")
const forecast = require("./utils/forecast")
const port = process.env.PORT || 3000

 const app = express()

 //define path for express config
 const publicDirectoryPath= path.join(__dirname,"../public")
 const viewsPath= path.join(__dirname,"../templates/views")
 const partialsPath = path.join(__dirname,"../templates/partials")

 // set handlebar views and location
app.set("views",viewsPath)
 app.set("view engine",'hbs')
 hbs.registerPartials(partialsPath)

 //setyp express static
app.use(express.static(publicDirectoryPath))

app.get("",(req,res)=>{
    res.render("index",{
        title:"Weather App",
        name:"Vaibhav Singh"
    })
})

app.get("/about",(req,res)=>{
    res.render("about",{
        title:"About Me",
        name:"Vaibhav Singh"  
    })
})

app.get("/help",(req,res)=>{
    res.render("help",{
        title:"Help ",
        name:"Vaibhav Singh",
        helpText:'This is a Help Page'
    })
})

app.get("/weather",(req,res)=>{
    if(!req.query.address){
        return res.send({
            error:"PLs enter valid address"
        })
    }
    geocode(req.query.address,(error,data={})=>{    //(instead of data we can use destructing and remove data and directly put latitude and longitude , location and then below we can delte use of data)
    if(error){
        return res.send({error})
    }
        forecast(data.lattitude, data.longitude, (error, forecastedata='Pls Enter within INDIA as my My API supports only within INDIA') => {
          return  res.send({
                forecast:forecastedata,
                location: data.location,
                address:req.query.address
            })
           console.log(data.location)
           console.log(forecastedata)
         }) 
       })
       
    
})

app.get("/help/*",(req,res)=>{
    res.render('404',{
        title:'404',
        name: 'Vaibhav Singh',
        errorMessage:"Help Article not Found"
    })
})


app.get('*',(req,res)=>{
    res.render('404',{
        title:'404',
        name: 'Vaibhav Singh',
        errorMessage:"Page not found"
    })
})
app.listen(port,()=>{
    console.log("Server is up on port "+ port)
})