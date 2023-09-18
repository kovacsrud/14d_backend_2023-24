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

app.patch('/termekmodositas',(req,res)=>{
    let adat=req.body;
    let modositando=adatok.findIndex(x=>x.id==adat.id);
    if(modositando>-1){
        adatok[modositando]=adat;
        res.status(200).json({message:"Adat módosítva!"});
    } else {
        res.status(404).json({message:"Az adat nem található"});
    }
});

app.delete('/termektorles/:id',(req,res)=>{

    let id=req.params.id;
    adatok=adatok.filter(x=>x.id!=id);
    res.status(200).json({message:"A termék törölve!"});

});

app.get('/marka/:marka',(req,res)=>{
    let marka=req.params.marka;
    console.log(marka);
    let result=adatok.filter(x=>x.marka.toLowerCase()==marka.toLowerCase());
    if(result.length>0) {
        res.status(200).json(result);
    } else {
        res.status(404).json({message:"Nincs ilyen márka!"});
    };

});

app.get('/termeknev/:termeknev',(req,res)=>{
    let termeknev=req.params.termeknev;
    let result=adatok.filter(x=>x.termeknev.toLowerCase()==termeknev.toLowerCase());
    if(result.length>0) {
        res.status(200).json(result);
    } else {
        res.status(404).json({message:"Nincs ilyen nevű termék!"});
    };

});