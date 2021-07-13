/** @format */
 
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const PORT = 3000;
 
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
 
// parse application/json
app.use(bodyParser.json());
 
//connecting to db
const MONGO_URL = "mongodb+srv://igotapps650:conDom77@cluster0.siah9.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
try {
  mongoose.connect(
    MONGO_URL,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
    () => console.log("connected")
  );
} catch (error) {
  console.log("could not connect");
}
 

// importing routes
const postRoute = require("./routes/posts");
app.use("/post", postRoute);
 
app.get("/",(req,res)=>{
  res.send("Welcome")
})

 
// How to start listening to the sever
app.listen(3000, () => {
  console.log("sever is running on port: " + PORT);
});