const express=require('express');
const sqlite3=require('sqlite3');
const db=new sqlite3.Database('./versenyzok.db');

const app=express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.listen(8000,()=>{console.log("Running")});

app.get('/',(req,res)=>{
    res.send("Backend vizsgafeladat");
});

app.get('/koridok/:versenyzoid',(err,versenyzoadatok)=>{
    const id=req.params.versenyzoid;

    db.serialize(()=>{
        //ebbe a blokkba tesszük a lekérdezéseket, ha több is van

        db.all(`select nev from versenyzo where id=?`
        ,[id]
        ,(err,versenyzoadatok)=>{
        if(err){
            res.status(500).json({message:err.message});
            return;
        }
            //itt futtatunk egy másik lekérdezést
            db.all(`select * from korido where versenyzoid=?`
            ,[id]
            ,(err,koridoadatok)=>{
                if(err){
                    res.status(500).json({message:err.message});
                    return;
                }
                if(versenyzoadatok.length>0){
                    res.status(200).json(Object.assign({versenyzo:versenyzoadatok[0]},{koridok:koridoadatok}));
                } else {
                    res.status(400).json({message:"Nincs ilyen versenyző"});
                }
            });

        });

    });

    

});


app.get('/koridok_v2/:versenyzoid',(err,versenyzoadatok)=>{
    const id=req.params.versenyzoid;

    db.serialize(()=>{
        //ebbe a blokkba tesszük a lekérdezéseket, ha több is van

        db.all(`select v.nev as versenyzonev,cs.nev as csapatnev from
                versenyzo as v,csapat as cs
                where cs.id=v.csapatid id=?`
        ,[id]
        ,(err,versenyzoadatok)=>{
        if(err){
            res.status(500).json({message:err.message});
            return;
        }
            //itt futtatunk egy másik lekérdezést
            db.all(`select k.id,k.korido,k.kor,p.nev as palyanev
                    from korido as k,palya as p
                    where k.palyaid=p.id versenyzoid=?`
            ,[id]
            ,(err,koridoadatok)=>{
                if(err){
                    res.status(500).json({message:err.message});
                    return;
                }
                if(versenyzoadatok.length>0){
                    res.status(200).json(Object.assign({versenyzo:versenyzoadatok[0]},{koridok:koridoadatok}));
                } else {
                    res.status(400).json({message:"Nincs ilyen versenyző"});
                }
            });

        });

    });

    

});
