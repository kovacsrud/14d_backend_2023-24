const express=require("express");
const cors=require("cors");
const fetch=require("cross-fetch");
const csvtojson=require("csvtojson");

async function run(){

    //Így már használhatjuk az await-et
    const app=express();
    app.use(cors());
    app.use(express.json());
    app.use(express.urlencoded({extended:false}));

    const pokeResponse=await fetch('https://raw.githubusercontent.com/Biuni/PokemonGO-Pokedex/master/pokedex.json');
    const pokeData=await pokeResponse.json();

    const catalogResponse=await fetch('https://datacatalog.tusla.ie/dataset/fb8309fa-e48f-4747-a5b9-58d7120549f5/resource/f3ad45b4-5145-46db-b007-a933ed5386c6/download/no-of-children-active-on-the-cpns-0-to-6-months-2022.csv');
    const catalogData=await catalogResponse.text();

    const jsonCatalogData=await csvtojson().fromString(catalogData);

    app.listen(8000,()=>{console.log("Running")});

    app.get('/',(req,res)=>{
        res.send("Kiszolgálás fájlokból");
    });

    app.get('/pokedata',(req,res)=>{
        res.status(200).json(pokeData);
    });

}

run();