require("dotenv").config();
const express=require("express");
const app=express();
app.use(express.json());
const connectDB=require("./connection");
//model
const userModel = require("./user");

app.get('/',async (req,res)=>{

    const user = await userModel.find();
    return res.json({user});
});
app.post("/user/new",async (req,res) =>{
    const { newUser } = req.body;
    await userModel.create(newUser);
    return res.json({message :"created"});
});
app.get('/user/type/:type',async (req,res)=>{
    const { type } = req.params;
    const user = await userModel.find({userType : type});
    if(!user){
        return res.json({message:"No User Found"});
    }

    return res.json({ user });
});
app.put("/user/update/:id",async (req,res)=>{
 const { _id} = req.params;
 const { userData } = req.body;

 const updateUser= await userModel.findByIdAndUpdate(_id,{$set : {userData}},{new : true});
return res.json({ user: updateUser});
});
app.delete("/user/delete/:_id", async(req,res)=>{
    const {_id} = req.params;
    await userModel.findByIdAndDelete(_id);
    return res.json({ message:"Message Deleted :)"});

});
app.delete("/user/delete/type/:userType", async(req,res)=>{
    const {userType} = req.params;
    await userModel.findOneAndDelete({userType});
    return res.json({ message:"Message Deleted :)"});

});
app.listen(3000,()=>{
connectDB().then(()=>console.log("connected"))
.catch((error)=>console.log("error"))}
);