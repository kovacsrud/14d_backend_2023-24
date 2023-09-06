const express=require('express');
const cors=require('cors');

const app=express();

app.use(cors());
app.use(express.urlencoded({extended:false}));
app.use(express.json());

let adatok=[
    {
        id:1,
        termeknev:"nyomtató",
        marka:"Canon"
    },
    {
        id:2,
        termeknev:"egér",
        marka:"Logitech"
    },
    {
        id:3,
        termeknev:"router",
        marka:"TpLink",
    },
    {
        id:4,
        termeknev:"nyomtató",
        marka:"Xerox"
    }

];

app.listen(8000,()=>{console.log("A szerver fut!")});

app.get('/',(req,res)=>{
    res.send("Backend demo");
});

app.get('/termekek',(req,res)=>{
    res.status(200).json(adatok);
});

//új adat felvitele
app.post('/ujtermek',(req,res)=>{
    //a küldött adat a req.body-ban található
    console.log(req.body);

    adatok.push(req.body);
    
    res.status(201).json({message:"Új adat beszúrva"})
});