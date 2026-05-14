"use strict";

// DEPENDENCIES --------------------------------------------

const express = require("express");
const app = express();
const path = require("path");
const env = require("dotenv");
const mongoose = require("mongoose");
const user = require("./userdb");

const bcrypt = require("bcrypt"); //time to hash baby, HelloWorld = $2b$04$85a7bY7JJLzHTVABoUCaE.Eimh7RUxN.yzO4T3u6TT4d2HhJB8vA6
let id, messageid;

env.config(); // NEVER LOG THIS, but always call this once. YOUR WHOLE ENV FILE IS PARSED WITH THIS FUNCTION (unencrypted)

//MIDDLEWARE -------------------------------------------------

app.use(express.json());                                        //JSON PARSING
app.use(express.static(path.join(__dirname, "../frontend")));   // load frontend webpages; => makes a super repo (backend + frontend in same host)

// Root function (optional) -----------------------------------------
app.get("/api/", async function(request,response){
        response.status(200);
        return response.send("How'd you end up here buddy?!");

})

//endpoint for newusers: Registration --------------------------------

app.post("/api/newUser", async function(req,res){
    
    try {
        const {name, email, password, age} = req.body;
        
        if(await user.findOne({email})){
            res.status(400);
            return res.send({message:"A user with this email already exists.!"}); 
        }
        
        const newUser = await user.create({id:id, name: name, email: email, age: age, password: await bcrypt.hash(password, 3)});
        res.send({message:"data gaya :)"});
        id = id + 1;
        return res.status(200);
    }
    
    catch(err){
        res.status(500);
        return res.send({message:"You suck at everything loserr, but specifically: \n\n" +  err.message});
    }
})

//Login logic -----------------------------------------------------

app.post("/api/loginUser", async function(req,res){
    
    try{
        const {email, password} = req.body;
        
        let correctEmail, correctPass;
        
        let foundUser = await user.findOne({email}); //find the user in DB using email.
        
        //can replace this with ternary operator. [line 52 => 59]
        if(foundUser){
            correctPass = foundUser.password;
            
        } else {
            
            return res.status(202).send({message:"User not found in DB, did you Register?"});
        }
        
        // DONT TRY THIS => [imp] every hash is NOT unique based on the number of salts..
        // const hashPass = await bcrypt.hash(password, 3); //hash the received pass to later compare w the one in DB;
        
        //email == correctEmail => no need to check this since obv u used the provided email to find in DB so obv its gonna return always true;
        if(await bcrypt.compare(password, correctPass)){
            
            return res.status(200).json({id: foundUser.id, name: foundUser.name});
        } else {
            
            return res.status(201).send({message:"Nice try diddy... but wrong password"});
        }
        
    }
    catch(err) {
        
        console.log("kuch toh hua hai..\n\n" + err.message + "\n\n" + err);
        
    }
})

//create Chats -------------------------------------------------------

const msg = require("./chatdb");

app.post("/api/newMsg", async function(req,res){
    const {message, id} = req.body; // will be replaced by JWT...

    //const {name} = await user.findOne({id}); NO NEED FOR THIS KYUKI IN MSG WE WANT TO STORE ONLY ID.
    try {
        const obj = {id: id, message, time: Date.now(), messageid}
        await msg.create(obj);
        messageid++;
        return res.status(200).json(obj);
    }
    catch (err){
        res.status(400);
        return res.send({message:"Skill issue... Message not sent.\n\n" + err}); // highly unlikely to happen;
    }
})

//get chats: last 5 chats as of rn ------------------------------------------------

// [FIXED POTENTIAL BUG]: will have to replace this name wala logic with id, kyuki later on when the user can change the name, db will still store the old name if logic remains unchanged;
app.get("/api/fetchMsgs", async function(req,res){

    try {

        let discreteObjects = await msg.find()
        .sort({$natural: -1})
        .limit(5);

        const sortedObjects = await Promise.all(

            discreteObjects.map(async function(object){

                const {id, time, message, messageid} = object;

                const foundUser = await user.findOne({id});

                return {

                    time,
                    message,
                    messageid,

                    name: foundUser
                    ? foundUser.name
                    : "Unknown User"

                };

            })

        );

        return res.status(200).json(sortedObjects.reverse());

    }

    catch(err){

        console.log(err);

        return res.status(400).send(err.message);

    }
});

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

//change name logic
app.get("/api/updateUser", async function(req,res){
    try {
        const {name, email, password, age, id} = req.body; //will be changed to JWT later...
        
        user.findOneAndUpdate({id})
    }
    catch (err){

    }
})

app.post("/api/deletePost", async function(req,res){
    try {
        const {messageid, userid} = req.body;
        const msgInQuestion = await msg.findOne({messageid});

        if(userid != msgInQuestion.id){
            return res.status(202).send("ERROR! You cannot delete smone else's msg!");
        }

        await msg.deleteOne({messageid});
        res.status(200).send("Message deleted successfully");
        
    } catch (err){
        console.log(err);
    }
})

app.post("/api/updateMsg", async function(req,res){
    try{
        const {messageid, userid, msgcontent} = req.body;
        const msgInQuestion = await msg.findOne({messageid});

        if(userid != msgInQuestion.id){
            return res.status(202).send("ERROR! You cannot update smone else's msg!");
        }

        if(msgcontent == msgInQuestion.message){
            return res.status(203).send("ERROR! Message content should be different");
        }

        await msg.findOneAndUpdate({messageid}, {
            message: msgcontent
        })

        return res.status(200).send("Success");

    } catch (err){
        console.log(err);
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
    } catch (err){
        console.log("last id fetch err");
        id = 1;
    }

    try{
        const lastmsg = await msg.find().sort({$natural: -1}).limit(1);
        const [{messageid:mid}] = lastmsg;
        messageid = mid;
    
    } catch(err) {
        console.log("last msg fetch err");
        messageid = 1;
    }

})
.catch(function(err){
    console.log("You suck at connections...\n\n" + err.message);
})