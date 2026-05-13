// server stuff ---------------------------------

const API = "http://localhost:9090/api";

// dom stuff ------------------------------------

const sendbtn = document.querySelector("#send");
const inpbox = document.querySelector("#inp");
//const alertbox = document.querySelector("#")


// check server -----------------------------------

async function healthCheck(){
    try{
        const res = await fetch(`${API}/`)
    
        if(!res.ok){
            throw new Error("Server down...");
        }

    } catch(err){
        sendbtn.disabled = true;
        
    }
}

// bonus (input sound + keyboard shortcut) ------------------------------------------------
const tick = new Audio("tick.mp3");
inpbox.addEventListener("input", async function(e){
    tick.play();
})


inpbox.addEventListener("keyup", function(e){
    if(e.key === "Enter"){
        
        // send()
        console.log("send pressed via enter");
    }
})