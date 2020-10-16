const express = require("express")
const bodyParser = require("body-parser")
const https = require("https")

const app = express()

app.use(bodyParser.urlencoded({extended: true}))
// need this to specify static folder for files like images css etc
app.use(express.static("public"))

app.get("/", function(req, res){
  res.sendFile(__dirname + "/signup.html")
})

app.post("/", function(req, res){

  const firstName = req.body.fname
  const lastName = req.body.lname
  const email = req.body.email

  console.log(firstName)
  // create javascript object that we will send to mailchimp
  var data = {
    members: [
      {
        email_address: email,
        status: "subscribed",
        merge_fields: {
          FNAME: firstName,
          LNAME: lastName
        }
      }
    ]
  };

  const jsonData = JSON.stringify(data);

  const url = "*"

  const options = {
    method: "POST",
    // authentication method from request, mailchimp wants anystring and apikey as pw
    auth: "*",
  }

  // create the request to post to mailchimp
  const request = https.request(url, options, function(response) {

    if (response.statusCode === 200) {
      res.sendFile(__dirname + "/success.html")
    } else {
      res.sendFile(__dirname + "/failure.html")
    }

    // whenever data comes back from mailchimp server
    response.on("data", function(data){
      console.log(JSON.parse(data))
    })
  })

  request.write(jsonData)
  request.end()

})

app.post("/failure", function(req, res){
  res.redirect("/")
})

app.listen(process.env.PORT || 3000, function(){
  console.log("server started on port 3000")
})
