const express = require("express");
const app = express();
const env = require("dotenv");
const mongoose = require("mongoose");
const user = require("./userdb");

const bcrypt = require("bcrypt"); //time to hash baby, HelloWorld = $2b$04$85a7bY7JJLzHTVABoUCaE.Eimh7RUxN.yzO4T3u6TT4d2HhJB8vA6
const id = 1;

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
        
        const newUser = await user.create({id: await bcrypt.hash(id++, 3), name: name, email: email, age: age, password: await bcrypt.hash(password, 3)});
        res.send("data gaya :)");
        return res.status(200);
    }
    
    catch(err){
        res.status(500);
        return res.send("You suck at everything loserr, but specifically: \n\n" +  err.message);
    }
})

//Login logic
app.post("/loginUser", async function(req,res){
    
    try{
        const {email, password} = req.body;
        
        let correctEmail, correctPass;
        
        let foundUser = await user.findOne({email}); //find the user in DB using email.
        
        //can replace this with ternary operator. [line 52 => 59]
        if(foundUser){
            correctPass = foundUser.password;
            
        } else {
            
            res.status = 404;
            return res.send("User not found in DB, did you Register?");
        }
        
        // DONT TRY THIS LOL, every hash is not unique based on the number of salts..
        // const hashPass = await bcrypt.hash(password, 3); //hash the received pass to later compare w the one in DB;
        
        //email == correctEmail => no need to check this since obv u used the provided email to find in DB so obv its gonna return always true;
        if(await bcrypt.compare(password, correctPass)){
            res.status(200);
            return res.send("Login Successful");
        } else {
            
            res.status(400);
            return res.send("Nice try diddy... but wrong password");
        }
        
    }
    catch(err) {
        
        console.log("kuch toh hua hai..\n\n" + err.message + "\n\n" + err);
        
    }
})

//create Chats
const msg = require("./chatdb");

app.post("/newMsg", async function(req,res){
    const {message, id} = req.body;
    try {
        msg.create({message, name, date: new Date.now()});
        return res.send("Message sent successfully.");
    }
    catch {
        return res.send("Skill issue... Message not sent.");
    }
})

//get chats: last 5 chats as of rn
app.get("/fetchMsgs", async function(req,res){
    msg.find
})

//industry practise: always keep app.listen and db/external connections at last

//main server starts
app.listen(9090, function(){
    console.log("Server listening to port 9090");
})

/*
import FastAPI from fastapi
app = FastAPI()

@app.get("/")
def read_root():
    return "Read root"
*/

mongoose.connect(process.env.DATABASE_SECRET)
.then(function(){
    console.log("WE CONNECTED BABY");
})
.catch(function(err){
    console.log("You suck at connections...\n\n" + err.message);
})