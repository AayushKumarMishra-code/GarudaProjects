const express = require("express");
const app = express();
const env = require("dotenv");
const mongoose = require("mongoose");
const user = require("./database");

const bcrypt = require("bcrypt"); //time to hash baby, HelloWorld = $2b$04$85a7bY7JJLzHTVABoUCaE.Eimh7RUxN.yzO4T3u6TT4d2HhJB8vA6

env.config(); // NEVER LOG THIS, but always call this once. YOUR WHOLE ENV FILE IS PARSED WITH THIS FUNCTION (unencrypted)

app.use(express.json()); //middleware (untuk) lol json parsing

app.get("/", async function(request,response){
    return response.send("How'd you end up here buddy?!");
})

//endpoint for newusers: Registration
app.post("/newUser", async function(req,res){
    
    try {
        const {name, email, password, age} = req.body;
        
        if(await user.findOne({age: age})){
            res.status(400);
            return res.send("A user with this age already exists.!"); //lol
        }
        
        const newUser = await user.create({name: name, email: email, age: age, password: await bcrypt.hash(password, 3)});
        res.send("data gaya :)");
        res.status(200);
    }
    
    catch(err){
        res.status(500);
        res.send("You suck at everything loserr, but specifically: \n\n" +  err.message);
    }
})

//Login logic
app.post("/loginUser", async function(req,res){
    const {email, pass} = req.body;

    try{

        if(await user.findOne({email: email}) && await user.findOne({password: await bcrypt.hash(pass, 3)})){
            res.status(200);
            return res.send("Login Successful");
        }

    }
    catch(err) {

        console.log("kuch toh hua hai..\n\n" + err.message + "\n\n" + err);

    }
})

//industry practise: always keep app.listen and db/external connections at last

//main server starts
app.listen(9090, function(){
    console.log("Server listening to port 9090");
})

mongoose.connect(process.env.DATABASE_SECRET)
    .then(function(){
        console.log("WE CONNECTED BABY");
    })
    .catch(function(err){
        console.log("You suck at connections...\n\n" + err.message);
    })

/*
import FastAPI from fastapi
app = FastAPI()

@app.get("/")
def read_root():
    return "Read root"
*/

