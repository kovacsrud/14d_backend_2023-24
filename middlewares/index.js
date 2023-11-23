const express=require('express');
const cors=require('cors');

const app=express();
const asyncHandler=require('express-async-handler');
const {mwproba}=require('./middle/mwproba');
const {log}=require('./middle/log');
const {sqllog}=require('./middle/sqllog');
const {errorHandler}=require('./middle/errorHandler');
const {check,body,validationResult}=require('express-validator');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(mwproba);
app.use(log);
app.use(sqllog);
app.use(errorHandler);


app.listen(8000,()=>{console.log("Running")});

app.get('/',(req,res)=>{
    res.send("Middlewares");
});

app.get('/lekerdezes',(req,res)=>{
    res.json({szam:123});
});

app.post('/adatkuldes',(req,res)=>{
    res.json({message:"Post ok"});
});

app.get('/szam/:szam',asyncHandler(async (req,res)=>{
    let szam=req.params.szam;

    if(szam>100){
        throw new Error("Nem megfelelő érték!");
    }
    res.json({szam:req.params.szam});
}));

app.post('/regisztracio',check('usernev').whitelist("abcdefghijklmnopqrstuvw1234567890").isLength({min:3,max:20}).withMessage("A hossz 3 és 20 között legyen").trim().escape(),
body('password').isLength({min:6,max:20}).withMessage("min 6 karakter, max 20 a jelszó!").trim().escape(),
body('teljesnev').isLength({min:7}).withMessage("min 7 karakter!").trim().escape(),
body('email').isEmail().withMessage("Ez nem e-mail cím!").trim().escape(),
body('szuldatum').isDate().withMessage("Dátumot kell megadni!").trim().escape()
,(req,res)=>{
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        res.status(400).json({Hibák:errors.array()})
    }else {
        console.log(req.body);
        res.json({message:"Sikeres regisztráció!"});
    }
    

})