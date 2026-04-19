const arr = [];
document.querySelector("#send").addEventListener("click" , function(e){
    let data = document.getElementById("info").value
    arr.push(data);
    let dl = document.querySelector("#message-dl");
    dl.textContent = " "

    arr.forEach(function(alpha){
        
        let dt = document.createElement("dt");
        dt.innerHTML=`<br>Aayush <dd>${alpha}</dd>`
        dl.append(dt);

    })
    
    

})
