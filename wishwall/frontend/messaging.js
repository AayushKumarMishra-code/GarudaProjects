let messageData = [{userName: "Aayush",userId: "23456", messageId: "9009",message:" hi we are here"},{userName: "kkkkkk",userId: "09999", messageId: "9010", message:" hi we are here"}];
let usersId =["2345","23456","09999"];
let currentUserId = usersId[usersId.length-1] // from local storage/jwt
let msg = 100000;                               //todo 2: fetch from db...;
let updateWalaUserName;
let updateWalaUserId;
let ExistingmessageId =null;

let currentUser = messageData.filter(function(messageData){         //todo 1: fix bug;
    return messageData.userId == currentUserId;
})

//userId, userName == local storage. //fetch(..backend..)

//local storage: JWT (userId), pfp as blob link, userName

// createMessage, createUser, login, register, 

// currentuser ke liye ek arr chahiye........ => userName , id [FROM LOCAL STORAGE]
//





document.querySelector("#send").addEventListener("click", function(e){
    ++msg;
    const{value:recentMessage}= document.getElementById("inp");
    
    const{userName:currentUserName}= currentUser[currentUser.length -1]//reason for this line to access the current userName // todo 3: fetch userId from localStorage in global scope;
// check wheather a id is already present or not!!!!!!!
    if(ExistingmessageId==currentUserId){

        messageData = [...messageData,{userName:currentUserName,userId:currentUserId,messageId: msg, message :recentMessage }]
    }
    else{
        messageData = [...messageData,{userName:updateWalaUserName ,userId:updateWalaUserId ,messageId: ExistingmessageId , message :recentMessage }]
        ExistingmessageId = null;
    }
    render();
})




//delete message

function deletemsg(messageId){
    messageData= messageData.filter(function(messageData){
        return messageData.messageId != messageId

    })
    render();

}

//updation of message

function update(messageId){
    const{UserName ,userId ,messageId , message} = messageData.find(function(messageData){
        return messageData.messageId == messageId;
    })

    document.querySelector("#inp").value = message;
    updateWalaUserName=UserName;
    updateWalaUserId = userId;
    
    
    
}

function render(){
    messages.forEach(msg, function (msg){
        // if(img): square layout..  else {html element img placeholder => delete;}
    })
}

//Current Pending tasks.

// 1. jwt implementation
// 2. render logic: (fetch array from backend) + support for image as message. => HTML CARDS
// 3. query router for backend 
// ework is laid only implementation is left [second priority]
// 4.  