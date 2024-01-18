const express=require('express');
const asyncHandler=require('express-async-handler');
const mongoose=require('mongoose');
const bcrypt=require('bcryptjs');
const dotenv=require('dotenv').config();
const cors=require('cors');
const User=require('./model/User');
const {errorHandler}=require('./mwares/errorMiddleware');

const app=express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(errorHandler);


mongoose.connect(process.env.MONGO_DB_CONNECT)
.then(()=>console.log("Connected"))
.catch(err=>console.log(err));

app.listen(8000,()=>{console.log("Running")});

app.get('/',(req,res)=>{
    res.send("MongoDb");
});

app.get('/user/:username',asyncHandler(async (req,res)=>{
    const username=req.params.username;
    const user=await User.findOne({username:username});

    if(!user){
        res.status(404);
        throw new Error("Nincs ilyen felhasználó!");
    }
    res.json(user);
}));

app.post('/',asyncHandler(async (req,res)=>{
    const {username,password,email,age}=req.body;
    const user=await User.findOne({username:username});
    if(user){
        res.status(400);
        throw new Error("A felhasználónév foglalt!");
    }
    const e_mail=await User.findOne({email:email});
    if(e_mail){
        res.status(400);
        throw new Error("Az email cím foglalt!");
    }
    if(!username || !password || !email){
        res.status(400);
        throw new Error("Hiányos adatok!");
    }
    const hashedPassword=await bcrypt.hash(password,10);
    const ujUser=await User.create({
        username:username,
        password:hashedPassword,
        email:email,
        age:age
    });

    res.json(ujUser);

}));

app.post('/belepes',asyncHandler(async (req,res)=>{
    const{username,password}=req.body;
    const user=await User.findOne({username:username});
    if(!user){
        res.status(400);
        throw new Error('Nincs ilyen felhasználó!');
    }
    if(!await bcrypt.compare(password,user.password)){
        res.status(400);
        throw new Error("Hibás jelszó!");
    }

    res.status(200).json(user);
}));

app.patch('/modosit',asyncHandler(async (req,res)=>{
    const{_id,email,password,age}=req.body;

    if(!mongoose.Types.ObjectId.isValid(_id)){
        res.status(400);
        throw new Error("Hibás Id!");
    }
    const user=await User.findById(_id);
    if(!user){
        res.status(400);
        throw new Error("Nincs ilyen felhasználó");
    }

    if(!await bcrypt.compare(password,user.password)){
        res.status(400);
        throw new Error("Nem megfelelő jelszó");
    }

    await User.findByIdAndUpdate(_id,{age});

    res.status(200);
    res.json(await User.findById(_id));

}));