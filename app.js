const bodyParser = require('body-parser')
const express=require('express')
const ejs =require('ejs')
const _=require('lodash')
const mongoose=require('mongoose')
mongoose.connect('mongodb://127.0.0.1:27017/blogDB', {useNewUrlParser:true})
mongoose.set('strictQuery', false)

const postSchema=new mongoose.Schema({
    header:String,
    content:String
})

const Post=mongoose.model("Post", postSchema)



const app=express()
app.use(bodyParser.urlencoded({extended:true}))
app.set('view engine', 'ejs');
app.use(express.static('public'))


app.get('/' , function(req, res){
     
    Post.find({}, function(err, posts){
        res.render("index", {
          posts: posts
          });
      });
     
})

app.get('/about', function(req, res){
    res.render('aboutUs')
})

app.get("/posts/:postId", function(req, res){

    const requestedPostId = req.params.postId;
    
      Post.findOne({_id: requestedPostId}, function(err, post){
        res.render("readMore", {
          title: post.header,
          content: post.content
        });
      });
    
    });

    app.post("/posts/:postId", function(req, res){

        const requestedPostId = req.params.postId;
        
          Post.findOne({_id: requestedPostId}, function(err, post){
            res.render("readMore", {
              title: post.header,
              content: post.content
            });
          });
        
        });





app.get('/newpost', function(req , res){
    res.render('newPost')
})

app.get('/contact', function(req, res){
    res.render('aboutUs')
})

app.post('/newPost', function(req, res){
    const post = new Post({
        header: req.body.PostTitle,
        content: req.body.postContent
      });
    
    
      post.save(function(err){
        if (!err){
            res.redirect("/");
        }
      });
})

app.post('/contact', function(req, res){
    res.render('contactUs')
})

app.post('/about', function(req, res){
    res.render('aboutUs')
})




app.listen(3000, function(){
    console.log('Server started listening on port 3000')
})