const express = require("express")
// native node https module
const https = require("https")
// to get html body parsed
const bodyParser = require("body-parser")

const app = express();

// required to use html body parser
app.use(bodyParser.urlencoded({extended: true}))

app.get("/", function(req,res){
  res.sendFile(__dirname + "/z.html");
})

app.post("/", function(req,res){
  console.log(req.body.cityName)

  const query = req.body.cityName
  const apiKey = "832692d985015c0d31b7a9219168aa2e"
  const unit = "imperial"
  const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiKey + "&units=" + unit

  https.get(url, function(response){
    console.log(response.statusCode)

    response.on("data", function(data){
      // data is hexadecimal so JSON parse will make to json object
      const weatherData = JSON.parse(data)
      const temp = weatherData.main.temp
      const description = weatherData.weather[0].description
      const icon = weatherData.weather[0].icon

      //response to the browser
      //can only have one res.send
      // can have multiple res.write
      res.write("<h1>the temperature in " + query + " is " + temp + " degrees fahrenheit</h1>")
      res.write("<h3>the weather is currently " + description + "</h3>")
      res.write("<img src=http://openweathermap.org/img/wn/" + icon + "@2x.png />")
      res.send()
    });
  });

})

// GET REQUEST
// app.get("/", function(req,res){
//
//   const query = "London"
//   const apiKey = "832692d985015c0d31b7a9219168aa2e"
//   const units = "imperial"
//   const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiKey "&units=" + units
//
//   https.get(url, function(response){
//     console.log(response.statusCode)
//
//     response.on("data", function(data){
//       // data is hexadecimal so JSON parse will make to json object
//       const weatherData = JSON.parse(data)
//       const temp = weatherData.main.temp
//       const description = weatherData.weather[0].description
//       const icon = weatherData.weather[0].icon
//
//       //response to the browser
//       //can only have one res.send
//       // can have multiple res.write
//       res.write("<h1>the temperature in glendale is " + temp + " degrees fahrenheit</h1>")
//       res.write("<h3>the weather is currently " + description + "</h3>")
//       res.write("<img src=http://openweathermap.org/img/wn/" + icon + "@2x.png />")
//       res.send()
//     })
//   })
// })

app.listen(3000, function(){
  console.log("server is running on port 3000")
})
