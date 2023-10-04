const sqlite3=require('sqlite3');
const db=new sqlite3.Database('./kutyak.db');

const getKutyanevek=(req,res)=>{
    db.all("select * from kutyanevek",(error,rows)=>{
        if(error){
            res.send(error);
        } else {
            res.status(200).json(rows);
        }

    });
}

const postKutyanev=(req,res)=>{
    const{kutyanev}=req.body;
    db.run("insert into kutyanevek (kutyanev) values(?)"
    ,[kutyanev]
    ,error=>{
        if(error){
            res.status(500).send(error);
        } else {
            res.status(201).json({message:"Új név beillesztve!"})
        }
    });
}

const patchKutyanev=(req,res)=>{
    const {kutyanev,Id}=req.body;
    db.run("update kutyanevek set kutyanev=? where Id=?"
    ,[kutyanev,Id]
    ,error=>{
        if(error){
            res.status(500).send(error);
        } else {
            res.status(200).json({message:"Név módosítva!"})
        }
    });

}
const deleteKutyanev=(req,res)=>{
    const {Id}=req.body;
    db.run("delete from kutyanevek where Id=?"
    ,[Id]
    ,error=>{
        if(error){
            res.status(500).send(error);
        } else {
            res.status(200).json({message:"Név törölve!"})
        }
    });
}


module.exports={
    getKutyanevek,
    postKutyanev,
    patchKutyanev,
    deleteKutyanev
}