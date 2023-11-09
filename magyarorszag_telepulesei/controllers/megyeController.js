const mysql=require('mysql');
const conn=mysql.createConnection({
    user:"root",
    password:"",
    database:"magyar_telepulesek_v2"

});

const megyelista=(req,res)=>{
    conn.query("SELECT nev AS megyenev FROM megyek ORDER BY megyenev"
    ,(err,rows)=>{
        if(err){
            res.status(400).json(err);
        } else {
            res.status(200).json(rows);
        }
    });
}

const megyetelepulesei=(req,res)=>{
    conn.query(
    `SELECT 
    t.nev as telepulesnev,
    AVG(t.lat)  as lat,
    AVG(t.long) as lng,
    t.kshkod,
    t.terulet,
    t.nepesseg,
    t.lakasok,
    m.nev AS megyenev,
    j.jogallas
    from telepulesek as t
    INNER JOIN jogallas as j ON j.suly=t.jogallas
    INNER JOIN megyek as m ON m.kod=t.megyekod
    WHERE m.nev=?
    GROUP BY t.nev
    `
    ,[req.params.megye]
    ,(err,rows)=>{
        if(err){
            res.status(400).json(err);
        } else {
            if(rows.length>0) {
                res.status(200).json(rows);
            } else {
                res.status(400).json({message:"Nincs ilyen megye!"});
            }
        }
    });

}

module.exports={
    megyelista,
    megyetelepulesei
}