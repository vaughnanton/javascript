//jshint esversion:6

const express = require("express");
const ejs = require("ejs");
const mongoose = require("mongoose");
const _ = require('lodash');

const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const app = express();

app.set('view engine', 'ejs');

// create and connect to the db
mongoose.connect("mongodb+srv:***mongodb.net/blogDB", {useNewUrlParser: true, useUnifiedTopology: true});

// create teh blog schema

const blogSchema = {
  title: String,
  body: String
}

// create mongoose model based on blog schema

const Post = mongoose.model("Post", blogSchema)

app.use(express.urlencoded({extended:true}));
app.use(express.static("public"));

let posts = []

mongoose.connection.on('connected', function(){console.log("connected to db")});

app.get("/", function(req, res){
  // check the db
  Post.find({}, function(err, foundPosts) {
    res.render("home", { homeStartingContent: homeStartingContent, posts: foundPosts})
  })
})

app.get("/about", function(req, res){
  res.render("about", {aboutContent: aboutContent})
})

app.get("/contact", function(req, res){
  res.render("contact", {contactContent: contactContent})
})

app.get("/compose", function(req, res){
  res.render("compose")
})

app.post("/compose", function(req, res){
  const post = {
    title: req.body.postTitle,
    body: req.body.postBody
  }

  // create a document (blog post) using mongoose for test
  const blogPost = new Post ({
    title: post.title,
    body: post.body
  })

  blogPost.save(function(err){
    if(!err) {
      res.redirect("/")
    }
  });

})


app.get("/posts/:postId", function(req, res){

  const requestedPostId = req.params.postId

  Post.findOne({_id: requestedPostId}, function(err, post){
    res.render("post", {
      title: post.title,
      content: post.body
    });
  })

})

app.post("/delete", function(req, res){

  const hiddenInputTitle = req.body.blogTitle
  console.log(hiddenInputTitle)
  Post.findOneAndDelete({title: hiddenInputTitle}, function(err){
      if (err) {
        console.log("could not find item with matching title to remove")
      } else {
        console.log("successfully removed item with matching title")
      }
    })
    res.redirect("/")

})

app.listen(3000, function() {
  console.log("Server started on port 3000");
});
