const asyncHandler=require('express-async-handler');
const fs=require('fs');
const mongoose=require('mongoose');
const {dirname}=require('path');
const appDir=dirname(require.main.filename);
const Image=require('../models/Image');

const getImages=asyncHandler(async (req,res)=>{
    const images=await Image.find({userid:req.user._id});

    if(!images){
        throw new Error("Nincsenek feltöltött képek!");
    }

    res.json({path:"/files/"+req.user.username+"/",images:images});

});

const deleteImage=asyncHandler(async (req,res)=>{
    const {imageId}=req.body;
    
    const image=await Image.findById(imageId);
    
    
    if(!image){
        throw new Error("A kép nem törölhető!");
    } else {
        const path=appDir+"/files/"+req.user.username+"/";

        if(fs.existsSync(path+image.imageName)){
            try {
                
                console.log(path+image.imageName);
                await Image.findOneAndDelete({userid:req.user._id,_id:imageId});
                await fs.rm(path+image.imageName,()=>{console.log("Törlés:"+imageId)});
                res.json({message:"Fájl törlése"});
                
            } catch (error) {
                res.json({"error":error});
            } 
        }


    }

});

module.exports={getImages,deleteImage};