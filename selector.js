const data = {
    "type": "question",
    "data": "Which type?",
    "next": [
        {
            "type": "option",
            "data": "Plugin",
            "next": [
                {
                    "type": "answer",
                    "data": "ViaVersion"
                },
                {
                    "type": "answer",
                    "data": "ViaBackwards"
                },
                {
                    "type": "answer",
                    "data": "ViaRewind"
                }
            ]
        },
        {
            "type": "option",
            "data": "Mod",
            "next": [
                {
                    "type": "question",
                    "data": "Client or Server?",
                    "next": [
                        {
                            "type": "option",
                            "data": "Server",
                            "next": [
                                {
                                    "type": "answer",
                                    "data": "ViaFabric"
                                }
                            ]
                        },
                        {
                            "type": "option",
                            "data": "Client",
                            "next": [
                                {
                                    "type": "answer",
                                    "data": "ViaFabric"
                                },
                                {
                                    "type": "answer",
                                    "data": "ViaFabricPlus"
                                },
                                {
                                    "type": "answer",
                                    "data": "ViaForge"
                                }
                            ]
                        }
                    ]
                }
            ]
        },
        {
            "type": "option",
            "data": "Platform/App",
            "next": [
                {
                    "type": "answer",
                    "data": "ViaAAS"
                }, {
                    "type": "answer",
                    "data": "ViaProxy"
                }
            ]
        }
    ]
};

let lasttype = null;
let content = document.getElementById("content");
let resetbtn = document.getElementById("resetbtn");

function create(obj) {

    let type = obj.type;
    let data = obj.data;
    let next = obj.next;

    if (type !== "option" && lasttype !== "answer") {
        content.innerHTML = "";
    }

    let q = createElement(type);
    q.innerText = data;
    content.appendChild(q);


    if (type === "question" || type === "option") {
        q.addEventListener('click', function () {
            resetbtn.style.display = "block";
            next.forEach((i) => {
                create(i);
            });
        });
    } else {
        document.getElementById(data).classList.add("glow");
        document.getElementById(data).scrollIntoView(false);
    }
    lasttype = type;

    if (type === "question") {
        next.forEach((i) => {
            create(i);
        });
    }
}

function createElement(type) {
    if (type === "option") {
        const b = document.createElement("button");
        b.classList = "btn btn-outline-primary selector";
        return b;
    } else {
        const p = document.createElement("p");
        p.classList = type;
        return p;
    }
}


function start() {
    document.getElementById("help").style.display = "none";
    create(data);
}

function reset() {
    content.innerHTML = "";
    resetbtn.style.display = "none";
    for (const e of Array.from(document.getElementsByClassName("glow"))) {
        e.classList.remove("glow");
    }
    start();
}