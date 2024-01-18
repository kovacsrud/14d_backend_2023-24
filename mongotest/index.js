const mongoose=require('mongoose');

mongoose.connect('mongodb+srv://kovacsrudolf:kovacsrud_12@cluster0.lbcffly.mongodb.net/mongotest')
.then(()=>console.log("Connected"))
.catch(err=>console.log(err));

const telefonSchema=mongoose.Schema({
    marka:{type:String,required:[true,"Adja meg a telefon márkáját!"]},
    tipus:{type:String,required:[true,"Adja meg a telefon típusát!"]},
    ram:{type:Number,required:[true,"Adja meg a ram méretét!"]},
    tarhely:{type:Number,required:[true,"Adja meg a tárhely méretét!"]},
    oprendszer:{type:String,required:[true,"Adja meg az operációs rendszert"]}
});

const telefonModel=mongoose.model('telefon',telefonSchema);

const addphone=async ()=>{
    await telefonModel.create({marka:"iPhone",tipus:"12",ram:4000,tarhely:18000,oprendszer:"IOS"});
}

const getphone=async ()=>{
    const telefon=await telefonModel.find({oprendszer:"Android11"});
    console.log(telefon);
}

//addphone();
getphone();



//mongoose.connection.close();