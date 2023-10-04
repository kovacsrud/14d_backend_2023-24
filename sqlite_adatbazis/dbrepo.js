const allAuto=(db)=>{
    return new Promise((reject,resolve)=>{
        db.all("select * from autok",(error,rows)=>{
            if(error){
                reject(error);
            } else {
                if(rows.length>0) {
                    resolve(rows);
                } else {
                    resolve({message:"Nincs ilyen adat!"});
                }
            }
    
        });
    });
}

const insertAdat=(db,adat)=>{
    const{rendszam,marka,tipus,szin,gyartasiev}=adat;
    return new Promise((reject,resolve)=>{
        db.run("insert into autok values(?,?,?,?,?)"
        ,[rendszam,marka,tipus,szin,gyartasiev]
        ,error=>{
            if(error){
                reject(error);
            } else {
                resolve({message:"Új adat beszúrva!"});
            }
        });
    });
}

const updateAdat=(db,adat)=>{
    const{rendszam,marka,tipus,szin,gyartasiev}=adat;
    return new Promise((reject,resolve)=>{
        db.run("update autok set marka=?,tipus=?,szin=?,gyartasiev=? where rendszam=?"
        ,[marka,tipus,szin,gyartasiev,rendszam]
        ,error=>{
            if(error){
                reject(error);
            } else {
                resolve({message:"Adat módosítva!"});
            }
        });
    });
}

const deleteAdat=(db,adat)=>{
    const{rendszam}=adat;

    return new Promise((reject,resolve)=>{
        db.run("delete from autok where rendszam=?"
        ,[rendszam]
        ,error=>{
            if(error){
                reject(error);
            } else {
                resolve({message:"Adat törölve!"});
            }
        });
    });

}

module.exports={
    allAuto,
    insertAdat,
    updateAdat,
    deleteAdat
}