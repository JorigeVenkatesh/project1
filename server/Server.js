const express = require("express");
const mongoose = require("mongoose")
const cors = require("cors");
const multer = require("multer");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
dotenv.config();
const storage = multer.diskStorage({
  destination:  (req, file, cb) => {
    cb(null, 'uploads')
  },
  filename:  (req, file, cb) => {
    
    cb(null, `${Date.now()}_${file.originalname}`)
  }
})

const upload = multer({ storage: storage })

const app = express();
app.use(cors());
app.use('/uploads', express.static('uploads'))


let connectedToMDB = ()=>{
    try{
        mongoose.connect(process.env.dbpath);
        console.log ("successfully connected to MDB")
    } catch (err) {
        console.log(err);
        console.log("unable to connect MDB")
    };

};

app.post("/signup",upload.array("profilePic"), async (req,res)=>{
        console.log(req.body);
        console.log(req.files);

        let userArray = await User.find().and({email:req.body.email});
        
        if(userArray.length > 0){
            res.json({status:"failure",msg:"user already exist"})
        }else{
            let hashedPassword = await bcrypt.hash(req.body.password,10);
            try{
     let newUser = new User({
    firstName:req.body.firstName,
    lastName:req.body.lastName,
    age:parseInt(req.body.age),
    email:req.body.email,
    password:hashedPassword,
    profilePic:req.files[0].path,
        });
        await newUser.save();
        res.json({status:"success",msg:"User Successfully Created"})
    
    } catch (err) {
        res.json({status:"failed",err:err})
    }
   };
    
    
   });


app.post("/login",upload.none(), async (req,res)=>{
    console.log (req.body);
   
     let fetchedData = await User.find().and({email:req.body.email});

    if(fetchedData.length > 0){

      let passwordResult = await bcrypt.compare(req.body.password,fetchedData[0].password)

     if(passwordResult === true){

        let token = jwt.sign({email:req.body.email,password:req.body.password},"secretKey");

     let dataToSend = {
    firstName:fetchedData[0].firstName,
    lastName:fetchedData[0].lastName,
    age:fetchedData[0].age,
    email:fetchedData[0].email,
    profilePic:fetchedData[0].profilePic,
    token: token,
        };

        res.json({status:"success",data:dataToSend});
     }else{
        res.json({status:"failure",msg:"Invalid Password"})
     }
    }else{
        res.json({status:"failure",msg:"User Does Not Exist"})
    }
});

app.put("/updateProfile",upload.single("profilePic"), async (req,res) =>{
    console.log(req.body);
    console.log(req.file)
    try{
        if(req.body.firstName.length > 0){
            await User.updateMany({email:req.body.email},{firstName:req.body.firstName})
        };

        if(req.body.lastName.length > 0 ){
            await User.updateMany({email:req.body.email},{lastName:req.body.lastName})
        };

        if(req.body.age > 0 ){
            await User.updateMany({email:req.body.email},{age:req.body.age})
        };

        if(req.body.password.length > 0){
            await User.updateMany({email:req.body.email},{password:req.body.password})
        };
        if(req.file & req.file.path){
            await User.updateMany({email:req.body.email},{profilePic:req.file.path})
        };

        res.json({status:"success",msg:"User Details Updated Successfully"})
    } catch (err) {
        res.json({status:"failure",msg:"Somthing Went Wrong",err:err})

    }
});

app.delete("/deleteProfile", async (req,res)=>{
    console.log(req.query.email)
    try{
        await User.deleteMany({email:req.query.email});
        res.json({status:"success",msg:"User Deleted Successfully"})
    } catch (err){
        res.json({status:"failure",msg:"Unable To Delete User",err:err})
    };
});

app.post("/validateToken",upload.none(),async (req,res)=>{

    console.log(req.body.token);
     try{
         let decryptedObj = jwt.verify(req.body.token,"secretKey");
    console.log(decryptedObj);

    let fetchedData = await User.find().and({email:decryptedObj.email});

    if(fetchedData.length > 0){

     let passwordResult = await bcrypt.compare(decryptedObj.password,fetchedData[0].password)

     if(passwordResult === true){
    
    let dataToSend = {
    firstName:fetchedData[0].firstName,
    lastName:fetchedData[0].lastName,
    age:fetchedData[0].age,
    email:fetchedData[0].email,
    profilePic:fetchedData[0].profilePic,
   
        };

        res.json({status:"success",data:dataToSend});
     }else{
        res.json({status:"failure",msg:"Invalid Password"})
     }
    }else{
        res.json({status:"failure",msg:"User Does Not Exist"})
    }
     } catch(err) {
        res.json({status:"failure",msg:"Invalid Token",err:err})
     }
   
    
});

let userSchema = new mongoose.Schema({
    firstName:String,
    lastName:String,
    age:Number,
    email:String,
    password:String,
    profilePic:String,
});

let User = new mongoose.model("user",userSchema);

app.listen(process.env.port,()=>{
    console.log(`listenimg to port ${process.env.port}`)
});

connectedToMDB();