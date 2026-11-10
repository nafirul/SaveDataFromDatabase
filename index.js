const express = require("express")
const mongoose = require('mongoose');
const bodyParser = require('body-parser')

const app = express();
const port= 30001;


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))


app.get("/",(req,res)=>{
    res.send("sucessfully running is server")
})

const mongoBD= async()=>{
    try {
    await mongoose.connect('mongodb://127.0.0.1:27017/test');
        console.log("sucessfully is running");
        
        
    } catch (error) {
        console.log("sucessfully is not running");
        
        
    }
}


const blogSchema = new mongoose.Schema({
  title:{
    type:String,
    required:true,
  },
  price:{
    type:Number,
    required:true,
  },
  description:{
    type:String,
    required:true,
  },
  createdAt:{
    type:Date,
    default:Date.now(),
  },
});

const Blog = mongoose.model('Blog', blogSchema);

app.post("/product",async(req,res)=>{
    try {
        //get  data form requst body
        // const title= req.body.title;
        // const price= req.body.price;
        // const description= req.body.description;

        //form to mongoBD/Database
        const newProduct= new Blog({
         title:req.body.title,
         price:req.body.price,
         description:req.body.description,
        })

        const databaseSave= await newProduct.save();

        res.send(databaseSave);
    } catch (error) {
        res.send({message:error.message})
    }
})

app.listen(port,async()=>{
    console.log(`server is sucessfully running http://localhost:${port}`);
  await mongoBD();
    
})