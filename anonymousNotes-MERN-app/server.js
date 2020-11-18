const express = require("express");
const mongoose = require("mongoose");
const path = require("path")
const app = express();

app.use(
    express.urlencoded({
      extended: true
    })
  )
  
app.use(express.json())

if (process.env.NODE_ENV === 'production') {
	app.use(express.static('client/build'));
}

// enable cors
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000"); 
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
  
// create and connect to db and autoIncrement
mongoose.connect("", {useNewUrlParser: true, useUnifiedTopology: true});

// listen for mongoose connection
mongoose.connection.on('connected', function(){
    console.log("mongoose connected to db")
}); 

// create the note schema 
const noteSchema = {
    title: String,
    content: String,
    cid: String
  }

// create mongoose model based on note schema
const Note = mongoose.model("Note", noteSchema);

app.use(express.static(path.join("client", "build"))) 
app.use(express.static(__dirname + '/public'));

app.use((req, res, next) => {
  res.sendFile(path.resolve(__dirname, "client", "build")) 
}) 

// get grab root, start by checking db
app.get("/grab", (req, res) => {
    console.log("/ get received by server")

    Note.find({}, function(err, foundNotes){
        console.log('finding notes on db')
        res.send(foundNotes)
    })

    })

// create note
app.post("/", (req, res) => {
    console.log("/ post received by server")

    const noteTitle = req.body.title;
    const noteContent = req.body.content;
    const noteCid = req.body.cid;
    
    console.log(noteTitle + ' ' + noteContent + 'noteCid');
    
    // post the new note to database
    const note = new Note ({
        title: noteTitle,
        content: noteContent,
        cid: noteCid
      })

    note.save()
    res.send(res.data);
    console.log('note saved')
  })

// delete note
app.post("/delete", (req, res) => {
    console.log("/delete post received by server")
    const cidOfNoteToDelete = req.body.noteToDelete;
    console.log(cidOfNoteToDelete)
    // delete the note with the title that was hit
    Note.findOneAndDelete({cid: cidOfNoteToDelete}, function(err){
        if (err) {
          console.log("could not find item with matching cid to remove")
        } else {
          console.log("successfully removed item with matching cid")
        }
      })
      
    res.send('/delete says hi from server')
  })

// test route
app.get('/test', (req, res) => {
    console.log('/test get received by server')
    res.send('/test says hi from server')
})

app.get('*', (request, response) => {
	response.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});

// let host set port otherwise set to local 5000
let port = process.env.PORT;
if (port == null || port == "") {
  port = 5000;
}

// listen for connection to port
app.listen(port, function(){
  console.log("server started successfully on port " + port)
})
