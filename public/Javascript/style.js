const menu = document.querySelector("#checkbox-menu");
const lateral = document.querySelector("#usuarios");
var n = 0;

menu.addEventListener("click", ()=>{
    if(n == 0){
        lateral.classList.add("ativo");
        n = 1;
    }else{
        lateral.classList.remove("ativo");
        n = 0;
    }
})