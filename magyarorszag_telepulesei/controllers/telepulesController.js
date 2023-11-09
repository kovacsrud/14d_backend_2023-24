const mysql=require('mysql');
const conn=mysql.createConnection({
    user:"root",
    password:"",
    database:"magyar_telepulesek_v2"
});

const telepulesek=(req,res)=>{
    conn.query("SELECT DISTINCT nev from telepulesek ORDER BY nev",(err,rows)=>{
        if(err){
            res.status(400).json(err);
        } else {
            res.status(200).json(rows);
        }
    })
}

const telepules=(req,res)=>{
    conn.query(
    `SELECT 
    t.nev as telepulesnev,
    AVG(t.lat) as lat,
    AVG(t.long) as lng,
    t.kshkod,
    t.terulet,
    t.nepesseg,
    t.lakasok,
    m.nev as megyenev,
    j.jogallas
    from telepulesek as t
    INNER JOIN jogallas as j ON j.suly=t.jogallas
    INNER JOIN megyek as m ON m.kod=t.megyekod
    WHERE t.nev=?
    `
    ,[req.params.telepulesnev]
    ,(err,rows)=>{
        if(err){
            res.status(400).json(err);
        } else {
            if(rows[0].telepulesnev!=null){
                res.status(200).json(rows[0]);
            } else {
                res.status(400).json({message:"Nincs ilyen település!"});
            }
        }
    })


}

module.exports={
    telepulesek,
    telepules
}