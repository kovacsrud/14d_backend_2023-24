const fetch=require('cross-fetch');

let tanulo={
    "nev":"Judit",
    "kor":33
}

fetch('http://10.0.20.38:8000/tanulok',{
    method:'POST',
    headers:{'Content-type':'application/json'},
    body:JSON.stringify(tanulo)
})
.then(res=>res.json())
.then(valasz=>console.log(valasz))
.catch(err=>console.log(err));

async function kuld(){
    const request=await fetch('http://10.0.20.38:8000/tanulok',{
        method:'POST',
        headers:{'Content-type':'application/json'},
        body:JSON.stringify(tanulo)
    });

    const response=await request.json();
    console.log(response);
}

kuld();