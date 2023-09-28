const express=require("express");
const cors=require("cors");
const sqlite3=require("sqlite3");
const {allAuto}=require('./dbrepo');
const db=new sqlite3.Database('./autok.db');

const app=express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.listen(8000,()=>{console.log("Running")});

app.get('/',(req,res)=>{
    res.send("Autók adatbázis");
});

app.get('/allcars',(req,res)=>{
    db.all("select * from autok",(error,rows)=>{
        if(error){
            res.send(error);
        } else {
            if(rows.length>0) {
                res.status(200).json(rows);
            } else {
                res.status(404).json({message:"Nincs ilyen adat!"});
            }
        }

    });
});

app.get('/allcars2',(req,res)=>{
    allAuto(db)
    .then(res=>res.json())
    .then(adatok=>res.json(adatok))
    .catch(err=>res.send(err));
});

app.get('/allcars3',async (req,res)=>{

    try {
        const request=await allAuto(db);
        const response=await request.json();
        res.json(response);
        
    } catch (error) {
        res.send(error);
    }
    

});