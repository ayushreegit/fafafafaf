import express from "express";
const port =4000;
const app = express();
app.use(express.json());

import { connectDB } from "./database.js";
connectDB();

import { User } from "./userschema.js";
app.post("/register",async(req,res)=>{
    const {name,email,password} = req.body;
    if(!email||!password){
       res.json({
        message:"please add all fields"
       })
    }
    let user = await User.findOne({email});
    if(user){
        res.json( {
            message:"user already exists"
        })
    }
    user = await User.create({
        name,email,password
    })
    res.status(201).json({
        success:true,
        message:"registerd successfully",
        user
    })
})

app.post('/login', async (req, res) => {
    const { email, password } = req.body;
  
    try {
      // Find the user by email
      const user = await User.findOne({ email });
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      // Compare the provided password with the stored password
      if (password === user.password) {
        // Return a success message
        res.json({ message: `${user.name} Login successful`,user});
      } else {
        res.status(401).json({ message: 'Invalid password' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });


app.get("/user/:id",async(req,res)=>{
    const user = await User.findById(req.params.id);
    if(!user){
        res.json({
            message:"User not found"
        })
    }
    res.status(200).json({
        success:true,
        user
    })
})



app.get("/users" ,async(req,res)=>{
    const users = await User.find({})
    if(!users){
        res.json({
            message:"Users not found"
        })
    }
    res.status(200).json({
        success:true,
        users
    })
})


app.listen(port,()=>{
    console.log("server is listening on port" , port);
})