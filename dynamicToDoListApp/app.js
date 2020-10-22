const express = require("express")
// install mongoose
const mongoose = require("mongoose")

const bodyParser = require('body-parser');

const _ = require('lodash')

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

// use ejs as the view engine
app.set("view engine", "ejs")

// serve the public folder assets
app.use(express.static("public"))

// create the db
mongoose.connect("mongodb+srv://***mongodb.net/todolistDB", {useNewUrlParser: true, useUnifiedTopology: true});

// create the items schema
const itemsSchema = {
  name: String
}

// create mongoose model based on schema

const Item = mongoose.model("Item", itemsSchema);

// create 3 new documents using mongoose

const item1 = new Item ({
  name: "Welcome to your todo list"
})

const item2 = new Item ({
  name: "Hit the + button to add a new item"
})

const item3 = new Item ({
  name: "<-- Hit this to delete an item"
})

const defaultItems = [item1, item2, item3]

app.get("/", function(req,res) {

  // check the db
  Item.find({}, function(err, foundItems){
    // if array is empty
    if (foundItems.length === 0 ) {
      // add defaults to array
      Item.insertMany(defaultItems, function(err){
        if (err) {
          console.log(err)
        } else {
          console.log("successfully saved items to db")
        }
      })
      res.redirect("/")
    } else {
        res.render("list", {listTitle: "Today", newListItems: foundItems})
    }

  })

})

const listSchema = {
  name: String,
  items: [itemsSchema]
}

const List = mongoose.model("List", listSchema)

// adding dynamic list functionalities
app.get("/:customListName", function(req, res){

  const customListName = _.capitalize(req.params.customListName);

  List.findOne({name: customListName}, function(err, foundList){
    if (!err) {
      if (!foundList) {
        // create a custom list
        const list = new List({
          name: customListName,
          items: defaultItems
        })
        list.save();
        res.redirect("/" + customListName)
      } else {
        // show existing list
        res.render("list", {listTitle: foundList.name, newListItems: foundList.items})
      }
    }
  })

})

// posting data to the todo list
app.post('/' , function(req, res){

  const itemName = req.body.newItem
  // grab the list the user is trying to add to
  const listName = req.body.list

  // create a new item document based on above itemName
  const item = new Item({
    name: itemName
  })

  if (listName === "Today") {
      // add to db
      item.save();
      // when a post request is triggered in home route which will trigger the app.get
      res.redirect("/")
  } else {
      List.findOne({name: listName}, function(err, foundList){
        foundList.items.push(item)
        foundList.save();
        res.redirect("/" + listName)
      })
  }

})

app.post("/delete", function(req, res){
  const checkedItemId = req.body.checkbox
  // check value of listname through hidden input in list.ejs
  const listName = req.body.listName

  if (listName === "Today") {
    Item.findByIdAndRemove(checkedItemId, function(err){
      if (err) {
        console.log("could not find item with matching id to remove")
      } else {
        console.log("successfully removed item with matching id")
      }
    })
    res.redirect("/")
  } else {
    // if not default lst
    List.findOneAndUpdate(
      // find document that corresponds to custom list
      {name: listName},
      // mongodb pull operator, to find name of array within list that we found
      {$pull: {items: {_id: checkedItemId}}},
      function(err, foundList) {
        if (!err) {
          res.redirect("/" + listName)
        }
      }
    )
  }


})

let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}

app.listen(port, function(){
  console.log("Server started successfully")
})
