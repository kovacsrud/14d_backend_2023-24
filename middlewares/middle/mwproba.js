const mwproba=(req,res,next)=>{
    console.log("Middleware próba");
    next();
}

module.exports={mwproba};