

let color1 = "#a68069";
let color2 = "#bf9780";
let color3 = "#d8af97";
let color4 = "#ecd6c0";
let color5 = "#ffffeb";

// async function optenerPosts(){
async function optenerPosts(){
    let data = await fetch('https://jsonplaceholder.typicode.com/posts',
    {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })    
    console.log("await", data); // imprime la promesa
    let posts = await data.json(); // convierte la respuesta en un json
    console.log(posts); // imprime el json

    // console.log("string", JSON.stringify(posts));
    // let new_json = JSON.parse(JSON.stringify(posts));
    // console.log("new_json", new_json);
    return posts;
}

function crearChat(texto, id){
    let nuevoChat = document.createElement("div");
    nuevoChat.className = "chat";
    nuevoChat.id = id;
    nuevoChat.innerText = texto;
    nuevoChat.style.backgroundColor = color1;
    nuevoChat.style.width = "100%";
    nuevoChat.style.minHeight = "60px";
    nuevoChat.style.borderRadius = "8px";
    nuevoChat.style.border = "1px solid black";
    nuevoChat.style.marginBottom = "8px";
    return nuevoChat;
}


// crear los chats (lado izquierdo de la pantalla)
async function crearListoDeChats(){
    // mando a traer los post dummys a una api con get
    let misPosts =  await optenerPosts()
    var cont = 0;   
    // mando a traer el div donde quiero poner los chats
    let divListados = document.getElementById("listado-chats");
    if(divListados != null){
        // transformamos los dicccionarios a un div de chat
        misPosts.map(post=>{
            let nuevoChat = crearChat(post.title, post.id);
            return nuevoChat
        })
        // recorremos los nuevos chats y los agremos al div de listados
        .forEach(element => {
            divListados.appendChild(element);
            cont++;
        });
    }
    console.log(cont);

}


function crearMensaje(texto, user){
    let nuevoChat = document.createElement("div");
    nuevoChat.className = "mensaje";
    nuevoChat.id = user;
    nuevoChat.innerText = texto;
    nuevoChat.style.backgroundColor = color1;
    nuevoChat.style.borderRadius = "5px";
    nuevoChat.style.padding = "5px";
    nuevoChat.style.width = "50%"; 
    nuevoChat.style.minHeight = "50px";
    nuevoChat.style.border = "1px solid black";
    nuevoChat.style.marginBottom = "5px";
    nuevoChat.style.display = "flex";
    nuevoChat.style.alignSelf = "end";

    return nuevoChat;
}




// crear los divs con js
function crearDiv(type,id,id_papa,contenido,className){
    let div = document.createElement(type);
    div.id = id;
    div.className = className == null ? '' : className; // si no hay className entonces es un string vacio
    div.innerHTML = contenido == null ? '' : contenido; // si no hay contenido entonces es un string vacio
    if(id_papa != null){
        let papa = document.getElementById(id_papa);
        papa.appendChild(div);
        //console.log("Creado papa");
    }
    // si id_papa == null entonces va al body si no va al id_papa
    else{
        document.body.appendChild(div);
        //console.log("Creado body");
    }

}

function mandarMensaje(){
    let text = document.getElementById("text-chat").value;
    // esta parte seria para agregar el chat a la api

    if(text != ""){
        document.getElementById("text-chat").value = ""; // borrar el contenido del textarea
        //console.log(text);
        let nuevo = crearMensaje(text, "yopis"); 
        // agregar los listados a la api y solo cargar de nuevo los chats
        let divMensaje = document.getElementById("mensaje");
        divMensaje.appendChild(nuevo);
        divMensaje.scrollTop = divMensaje.scrollHeight; // para que el scroll se vaya al final
    }

}


// editar los estilos de los divs
function editarEstilo(id, color, height, width, display, border, gridRow, gridColumn, padding, flexDirection, overflow, align, justify, margin, top, left, bottom, rigth, radius){
    let elemento = document.getElementById(id);
    if(elemento != null){
         // Aplicar estilos
        color != null ? elemento.style.backgroundColor = color : null;
        height != null ? elemento.style.height = height : null;
        width != null ? elemento.style.width = width : null;
        display != null ? elemento.style.display = display : null;
        border != null ? elemento.style.border = border : null;
        gridRow != null ? elemento.style["grid-template-columns"] = gridRow : null;
        gridColumn != null ? elemento.style["grid-template-rows"] = gridColumn : null;
        padding != null ? elemento.style.padding = padding : null;
        flexDirection != null ? elemento.style.flexDirection = flexDirection : null;
        overflow != null ? elemento.style.overflow = overflow : null;
        align != null ? elemento.style.alignItems = align : null;
        justify != null ? elemento.style.justifyContent = justify : null;
        margin != null ? elemento.style.margin = margin : null;
        top != null ? elemento.style.top = top : null;
        left != null ? elemento.style.left = left : null;
        bottom != null ? elemento.style.bottom = bottom : null;
        rigth != null ? elemento.style.rigth = rigth : null;
        radius != null ? elemento.style.borderRadius = radius : null;
    }
    else{
        console.log("No existe el id: ", id);
    }
}



crearDiv("div","contenedor");
crearDiv("div","listado-chats","contenedor");
crearDiv("div","mensaje","contenedor");
crearDiv("div","contenido-perfil","contenedor");
crearDiv("div","contenido-chat","contenedor");
crearDiv("textarea","text-chat","contenido-chat",null,"mensaje-chat");
crearDiv("button","enviar","contenido-chat","Enviar");
crearDiv("div","mensajes-info","listado-chats");
crearDiv("div","perfil-info","contenido-perfil");
crearDiv("img","foto-perfil","perfil-info",null,"foto-perfil");
crearDiv("div","nombre-perfil","perfil-info","Francis Aguilar");

const boton = document.getElementById("enviar");
boton.addEventListener("click", mandarMensaje);

crearListoDeChats();
// editarEstilo(id, color, height, width, display, border, gridRow, gridColumn, padding, flexDirection, overflow, align, justify, margin, top, left, bottom, rigth)
editarEstilo("contenedor", color4, "calc(100vh - 0px)","100%", "grid", "1px solid black", "20% 80%", "85% 15%");
editarEstilo("listado-chats", color4,"auto", "auto", "flex","1px solid black",null, null, "8px","column","scroll", "center", "center");
editarEstilo("contenido-perfil",color2,"auto","auto","flex",null,null,null,null,null,null,null,"center","auto","auto","auto");
editarEstilo("mensaje",color5,"auto","auto","flex",null,null,null,null,"column","scroll",null,null,null,null,null,null);
editarEstilo("contenido-perfil",color2,"100%","100%","flex",null,null,null,null,null,null,"center","space-around", null,null,null,null,null);
editarEstilo("contenido-chat",color4,"100%","100%","flex",null,null,null,null,null,null,"center","space-around", null,null,null,null,null);
editarEstilo("perfil-info",null,"100%","100%","flex",null,null,null,null,"row",null,"center","space-around", null,null,null,null,null);

// imagen
let foto = document.getElementById("foto-perfil");
foto.src = "foto_perfil.jpg";
foto.style.width = "30%";
foto.style.height = "40%";
foto.style.borderRadius = "50%";
foto.style.marginLeft = "10px";
foto.style.transition = "0.5s";
foto.addEventListener("mouseenter", function() {
    foto.style.height = "50%"; 
    foto.style.width = "40%"; 
    
});
foto.addEventListener("mouseleave", function() {
    foto.style.width = "30%";
    foto.style.height = "40%";
});


let perfil = document.getElementById("perfil-info");
perfil.style.marginRight = "30px";


// estilo del body
document.body.style.margin = "0px";
document.body.style.overflow = "hidden";


// // css con javascript



