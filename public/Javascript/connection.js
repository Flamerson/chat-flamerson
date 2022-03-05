var socket = io();

const btn = document.querySelector("#button");
const txt = document.querySelector("#text");
const msgtxt = document.querySelector("#messages");
const dslg = document.querySelector("#deslogar");
const nm = document.querySelector("#nome");
const users = document.querySelector("#user");

var nome = localStorage.getItem("nome");
nm.innerHTML = nome;

if(nome === null){
    window.location.href = "./chat.html";
}

socket.emit('name', nome);

socket.on('user', (id)=>{
    var obj = {
        id: id,
        nome: nome
    }
    socket.emit('nameoff', obj);
})

socket.on('name', (nome)=>{
    var item = document.createElement('p');
    item.textContent = nome + " entrou na conversa.";
    msgtxt.appendChild(item);
})

socket.on('users', saveNome =>{
    var verify = document.querySelector("#user").innerHTML;
    if(verify){
        for(let i = 0; i < saveNome.length; i++){
            var old = document.querySelector("#user").innerHTML;
            let item = `<p id="${saveNome[i].userId}">${saveNome[i].user}</p>` + old;
            let rem = document.getElementById(saveNome[i].userId);
            if(!rem){                
                users.innerHTML = item;
            }
        }
    }else{
        for(let i = 0; i < saveNome.length; i++){
            var old = document.querySelector("#user").innerHTML;
            let item = `<p id="${saveNome[i].userId}">${saveNome[i].user}</p>` + old;
            users.innerHTML = item;
        }
    }
})

socket.on('nameoff', (obj)=>{
    var item = document.createElement('p');
    item.textContent = obj.nome + " saiu da conversa.";
    let d = document.getElementById(`${obj.id}`);
    d.remove();
    msgtxt.appendChild(item);
})

btn.addEventListener('click', ()=>{
    if(txt.value){
        var msgObj = {
            name: nome,
            message: txt.value
        }

        socket.emit('message', msgObj);
        txt.value = '';
    }
})

dslg.addEventListener('click', ()=>{
    localStorage.removeItem('nome');
    document.location.reload(true);
})

socket.on('message', (msg)=>{
    let item = document.createElement('p');
    item.textContent = msg.name + " : " + msg.message;
    msgtxt.appendChild(item);
})

