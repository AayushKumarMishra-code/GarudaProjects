let messageData = [
    {
        userName: "Aayush",
        userId: "23456",
        messageId: "9009",
        message: " hi we are here"
    },
    {cd
        userName: "kkkkkk",
        userId: "09999",
        messageId: "9010",
        message: " hi we are here"
    }
];

let usersId = ["2345", "23456", "09999"];

let currentUserId = usersId[usersId.length - 1];

let msg = 100000;

let count = 0;

let updateWalaUserName;

let updateWalaUserId;

let ExistingmessageId = null;



let currentUser = messageData.filter(function (messageData) {

    return messageData.userId == currentUserId;

});



// render logic here

function render() {

    const messageBox = document.getElementById("message");

    messageBox.innerHTML = "";



    messageData.forEach(function (messageData) {

        let div = document.createElement("div");



        div.innerHTML = `

        <div class="pixar-card" role="article" aria-labelledby="card-username">

            <div class="card-header">

                <div class="card-avatar"></div>

                <p class="card-username" id="card-username">

                    ${messageData.userName}

                </p>

            </div>



            <div class="card-image-area">

                ${
                    messageData.image
                    ?
                    `
                    <div class="card-image-placeholder">

                        <img 
                            src="${messageData.image}" 
                            width="100%"
                            height="80rem"
                            class="imageSmall"
                        >

                    </div>
                    `
                    :
                    ""
                }



                <p class="card-caption">

                    ${messageData.message}

                </p>

            </div>



            <div class="card-actions">

                <button class="action-button like-button">

                    <sup>0</sup>

                    <svg class="action-button-icon-1" viewBox="0 0 24 24">

                        <path
                            d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z">

                        </path>

                    </svg>

                </button>



                <button class="action-button comment-button">

                    <label>Options</label>

                    <select class="action-button-icon">

                        <option value="default">default</option>

                        <option value="update">update</option>

                        <option value="delete">delete</option>

                    </select>

                </button>

            </div>

        </div>

        `;



        messageBox.append(div);

    });





    document.querySelectorAll(".pixar-card").forEach(function (element) {

        element.style.cssText = `
            position: relative;
            overflow-wrap: break-word;
            width: 19em;
            background-color: #f5f1e8;
            border: 0.2em solid #4d4c4a;
            border-radius: 1.5em;
            padding: 1.2em;
            box-shadow: 0.6em 0.6em 0 #4d4c4a;
            display: flex;
            flex-direction: column;
            transition: 0.2s;
            margin-bottom: 2rem;
        `;

    });





    document.querySelectorAll(".pixar-card").forEach(function (element) {

        element.addEventListener("mouseenter", function () {

            element.style.transform = "translateY(-0.5em)";

            element.style.boxShadow = "0.8em 0.8em 0 #4d4c4a";

        });



        element.addEventListener("mouseleave", function () {

            element.style.transform = "translateY(0em)";

            element.style.boxShadow = "0.6em 0.6em 0 #4d4c4a";

        });

    });





    document.querySelectorAll(".card-header").forEach(function (element) {

        element.style.cssText = `
            display: flex;
            align-items: center;
            margin-bottom: 1em;
        `;

    });





    document.querySelectorAll(".card-avatar").forEach(function (element) {

        element.style.cssText = `
            width: 3.5em;
            height: 3.5em;
            border-radius: 50%;
            background: linear-gradient(45deg, #f9a86d, #f48a58);
            border: 0.2em solid #4d4c4a;
            box-shadow: 0.2em 0.2em 0 #4d4c4a;
            flex-shrink: 0;
            transition: 0.3s;
        `;

    });





    document.querySelectorAll(".card-username").forEach(function (element) {

        element.style.cssText = `
            margin-left: 0.8em;
            font-size: 1.2em;
            font-weight: bold;
            color: #4d4c4a;
        `;

    });





    document.querySelectorAll(".card-image-area").forEach(function (element) {

        element.style.cssText = `
            background-color: #d8d2c6;
            border-radius: 1em;
            padding: 0.8em;
            border: 0.2em solid #4d4c4a;
            box-shadow: inset 0.2em 0.2em 0 #b3ac9f;
        `;

    });





    document.querySelectorAll(".card-image-placeholder").forEach(function (element) {

        element.style.cssText = `
            width: 100%;
            border-radius: 0.6em;
            background: linear-gradient(135deg, #5c99e2, #8cb9e8);
            border: 0.2em solid #4d4c4a;
            overflow: hidden;
        `;

    });





    document.querySelectorAll(".imageSmall").forEach(function (img) {

        img.style.cssText = `
            width: 100%;
            height: 25rem;
            object-fit: cover;
            cursor: pointer;
        `;



        img.addEventListener("click", function () {

            const preview = document.createElement("div");



            preview.style.cssText = `
                display:flex;
                position:fixed;
                z-index:1000;
                width:100%;
                height:100%;
                top:0;
                left:0;
                justify-content:center;
                align-items:center;
                background-color:rgba(0,0,0,0.8);
            `;



            preview.innerHTML = `

                <span 
                    class="closePreview"
                    style="
                        position:absolute;
                        top:2rem;
                        right:4rem;
                        font-size:5rem;
                        color:white;
                        cursor:pointer;
                    "
                >
                    &times;
                </span>



                <img 
                    src="${img.src}" 
                    style="
                        width:55rem;
                        height:47rem;
                        border-radius:2rem;
                    "
                >
            `;



            document.body.append(preview);



            preview
                .querySelector(".closePreview")
                .addEventListener("click", function () {

                    preview.remove();

                });

        });

    });





    document.querySelectorAll(".card-caption").forEach(function (element) {

        element.style.cssText = `
            margin-top: 1em;
            font-size: 0.9em;
            line-height: 1.4;
            font-weight: 600;
            color: #4d4c4a;
        `;

    });





    document.querySelectorAll(".card-actions").forEach(function (element) {

        element.style.cssText = `
            display: flex;
            justify-content: space-around;
            margin-top: 1.5em;
        `;

    });





    document.querySelectorAll(".action-button").forEach(function (element) {

        element.style.cssText = `
            background-color: #61c470;
            border: 0.2em solid #4d4c4a;
            border-radius: 1em;
            padding: 0.5em;
            cursor: pointer;
            box-shadow:
                0 0.15em 0 #45a253,
                0 0.4em 0 #4d4c4a;
        `;

    });





    document.querySelectorAll(".like-button").forEach(function (element) {

        element.style.cssText = `
            background-color: #e65e5e;
            box-shadow:
                0 0.15em 0 #c14242,
                0 0.4em 0 #4d4c4a;
        `;

    });

}

render();









document.querySelector("#send").addEventListener("click", function () {

    ++msg;

    const { value: recentMessage } = document.getElementById("inp");

    if (recentMessage.trim() == "") {

        return;

    }

    const { userName: currentUserName } = currentUser[currentUser.length - 1];



    if (ExistingmessageId != currentUserId) {

        messageData = [
            ...messageData,
            {
                userName: currentUserName,
                userId: currentUserId,
                messageId: msg,
                message: recentMessage
            }
        ];

    }

    else {

        messageData = [
            ...messageData,
            {
                userName: updateWalaUserName,
                userId: updateWalaUserId,
                messageId: ExistingmessageId,
                message: recentMessage
            }
        ];

        ExistingmessageId = null;

    }

    document.querySelector("#inp").value = "";

    render();

});





function deletemsg(messageId) {

    messageData = messageData.filter(function (messageData) {

        return messageData.messageId != messageId;

    });

    render();

}





function update(messageId) {

    const {
        userName,
        userId,
        messageId: msgId,
        message
    } = messageData.find(function (messageData) {

        return messageData.messageId == messageId;

    });

    document.querySelector("#inp").value = message;

    updateWalaUserName = userName;

    updateWalaUserId = userId;

    ExistingmessageId = msgId;

}