const n = document.querySelector("#nome");
const b = document.querySelector("#btn");

var nome = localStorage.getItem("nome");

b.addEventListener("click", ()=>{
    if(n.value){
        localStorage.setItem("nome", n.value);
        window.location.href = "http://localhost:3000";
        n.value = "";
    }
})