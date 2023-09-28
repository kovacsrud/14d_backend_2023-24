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

module.exports={
    allAuto
}