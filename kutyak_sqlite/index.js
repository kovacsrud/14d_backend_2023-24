const express=require('express');
const cors=require('cors');

const app=express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use('/api/kutyanevek',require('./routes/kutyanevRoutes'));

app.listen(8000,()=>console.log("Running"));

app.get('/',(req,res)=>{
    res.send("Kutyák backend");
});
