"use strict";

// DEPENDENCIES --------------------------------------------

const express = require("express");
const app = express();
const path = require("path");
const env = require("dotenv");
const mongoose = require("mongoose");
const user = require("./userdb");

const bcrypt = require("bcrypt"); //time to hash baby, HelloWorld = $2b$04$85a7bY7JJLzHTVABoUCaE.Eimh7RUxN.yzO4T3u6TT4d2HhJB8vA6
let id;

env.config(); // NEVER LOG THIS, but always call this once. YOUR WHOLE ENV FILE IS PARSED WITH THIS FUNCTION (unencrypted)

//MIDDLEWARE -------------------------------------------------

app.use(express.json());                                        //JSON PARSING
app.use(express.static(path.join(__dirname, "../frontend")));   // load frontend webpages; => makes a super repo (backend + frontend in same host)

// Root function (optional) -----------------------------------------
app.get("/api/", async function(request,response){
        return response.send("How'd you end up here buddy?!");

})

//endpoint for newusers: Registration --------------------------------

app.post("api/newUser", async function(req,res){
    
    try {
        const {name, email, password, age} = req.body;
        
        if(await user.findOne({age})){
            res.status(400);
            return res.send("A user with this age already exists.!"); //lol, email krdunga baadme
        }
        
        const newUser = await user.create({id:id, name: name, email: email, age: age, password: await bcrypt.hash(password, 3)});
        res.send("data gaya :)");
        id = id + 1;
        return res.status(200);
    }
    
    catch(err){
        res.status(500);
        return res.send("You suck at everything loserr, but specifically: \n\n" +  err.message);
    }
})

//Login logic -----------------------------------------------------

app.post("api/loginUser", async function(req,res){
    
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
        
        // DONT TRY THIS => [imp] every hash is NOT unique based on the number of salts..
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

//create Chats -------------------------------------------------------

const msg = require("./chatdb");

app.post("api/newMsg", async function(req,res){
    const {message, id} = req.body; // will be replaced by JWT...

    //const {name} = await user.findOne({id}); NO NEED FOR THIS KYUKI IN MSG WE WANT TO STORE ONLY ID.
    try {
        msg.create({id: id, message, time: Date.now()});
        return res.send("Message sent successfully.\n" + message);
    }
    catch (err){
        res.status(400);
        return res.send("Skill issue... Message not sent.\n\n" + err); // highly unlikely to happen;
    }
})

//get chats: last 5 chats as of rn ------------------------------------------------

// [FIXED POTENTIAL BUG]: will have to replace this name wala logic with id, kyuki later on when the user can change the name, db will still store the old name if logic remains unchanged;
app.get("api/fetchMsgs", async function(req,res){
    let sortedObjects = [];

    try{

        let discreteObjects = await msg.find().sort({$natural: -1}).limit(5);

        sortedObjects = await Promise.all(
            discreteObjects.map (async function(object){
                const {id, time, message} = object;

                const{name} = await user.findOne({id});

                return {time, message, name};
            })

        );
        return res.send(sortedObjects.reverse()); // sends the array in the order (5th last msg, 4th last...);

        // let discreteObjects = await msg.find().sort({$natural: -1}).limit(5);


        //         discreteObjects.forEach(async function(object){
        //             const {id, message, time} = object; // msgObject se jo id nikali woh user DB me search krke return user ka Naam.

        //             const {name} = await user.findOne({id}); // didnt extract from DB kyuki the user can anytime change name, would result in name conflict if names are stored;


        //             const so = {name:name, message:message, time:time};

        //             //console.log(name, sortedObject)
        //             //console.log(sortedObject);

        //             console.log(so);
        //             //sortedObjects.push({name: "Udhay", message: "Hello World"});
        //             sortedObjects = [...sortedObjects, so];// WILL WORK ANY OF THE GIVEN WAYS.

        // )
        
        // console.log(sortedObjects)// [] WHYYYY???????? => Cuz of event loop dummy!!! [WORKING OF ASYNC FUNCTIONS BRUH]
        // return res.send(sortedObjects);
    }

    catch(err){
        res.status(400);
        return res.send("ERROR, shayad msgs exist hi nahi krte DB m...\n\n"  + err);
    }
    // finally {
        
    //     return res.send({sortedObjects}); //lemme see if this works.
    // }
})

//change name logic
app.get("api/updateUser", async function(req,res){
    try {
        const {name, email, password, age, id} = req.body; //will be changed to JWT later...
        
        user.findOneAndUpdate({id})
    }
    catch (err){

    }
})

//industry practise: always keep app.listen and db/external connections at last;

//  init ----------------------------------------------------

app.listen(9090, function(){
    console.log("Server listening to port 9090");
})

mongoose.connect(process.env.DATABASE_SECRET)
.then(async function(){
    console.log("WE CONNECTED BABY");
    try {
        const fetch =  await user.find().sort({$natural: -1}).limit(1);
        let [{id:val}] = fetch;
        id = val;
    }
    catch(err) {console.log("last id fetch err"); id = 1;}

})
.catch(function(err){
    console.log("You suck at connections...\n\n" + err.message);
})