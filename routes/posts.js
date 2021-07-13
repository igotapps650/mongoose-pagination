
/** @format */
 
const express = require("express");
const router = express.Router();
//importing model
const Post = require("../models/Post");
 
  /**
   node-mongoose pagination
   example : 
   GET : htttp://localhost:3000/post?page=2&size=5
   GET : htttp://localhost:3000/post?size=5
   GET : htttp://localhost:3000/post?page=2
  **/
router.get("/", async (req, res) => {
  try {
    
    let { page , size } = req.query;
    if (!page){
      page=1;
    }
    if (!size){
      size = 10;
    }
    
    const limit = parseInt(size);
    
    //number of records to skip
    const skip = (page - 1) * size;
    
    
   const posts = await Post.find().limit(limit).skip(skip);
    res.json(posts);
    
  } catch (error) {
    res.json({ message: error });
  }
});
 
//adds new post to the post collection
router.post("/addPost", async (req, res) => {
  const title = req.body.title;
  const description = req.body.description;
  
  try {
    
    const post = new Post({
      title: title,
      description: description,
    });
 
    const savedPost = await post.save();
    res.json({ success: true, savedPost });
  } catch (error) {
    res.json({ success: false, msg: "couldn't save post to DB" });
  }
});
 


 
module.exports = router;