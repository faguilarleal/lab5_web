
// Colores
let color1 = "#a68069";
let color2 = "#bf9780";
let color3 = "#d8af97";
let color4 = "#ecd6c0";
let color5 = "#ffffeb";



function crearChat(texto, id){
    let nuevoChat = document.createElement("div");
    nuevoChat.className = "chat";
    nuevoChat.id = id;
    nuevoChat.innerText = texto;
    nuevoChat.style.backgroundColor = color5;
    nuevoChat.style.width = "100%";
    nuevoChat.style.minHeight = "60px";
    nuevoChat.style.borderRadius = "8px";
    nuevoChat.style.border = "1px solid black";
    nuevoChat.style.marginBottom = "8px";
    // overflow-wrap: break-word
    nuevoChat.style.overflowWrap = "break-word";
    return nuevoChat;
}

// chats de la api

async function llamarChats(){
    let data = await fetch('https://apiweb.programmerscrew.com/public/messages',
    {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })    
    console.log("await", data); // imprime la promesa
    let posts = await data.json(); // convierte la respuesta en un json
    console.log(posts); // imprime el json

    return posts;
}


// cargar los chats de la api y mostrarlos en el container
async function cargarChats(){
    let response =  await llamarChats()
    let misPosts = response.data
    //let misPosts = await llamarChats()
    var cont = 0;   
    // mando a traer el div donde quiero poner los chats
    let divMensaje = document.getElementById("mensaje");
    divMensaje.innerHTML = "";
    if(divMensaje != null){
        // transformamos los dicccionarios a un div de chat
        misPosts.map(post=>{
            // console.log(post);
            // ----------------------------------------------------------------------------
            let nuevo = crearMensaje(post.message , post.username);   
            // ----------------------------------------------------------------------------
            return nuevo
        })
        // recorremos los nuevos chats y los agremos al div de listados
        .forEach(element => {
            // parte visual de los chats
            element.style.marginTop = "5px";
            element.style.backgroundColor = color1;
            element.style.marginLeft = "20px";
            element.style.alignSelf = "start";
            element.style.minWidth = "10px";
            element.style.overflowWrap = "break-word";
            element.style.width = "fit-content";
            element.style.height = "fit-content";
            element.style.overflowWrap = "break-word";
            if (element.id == "Francis"){
                element.style.alignSelf = "end";
                element.style.backgroundColor = color3;
                element.style.marginRight = "20px";
            }
            // console.log((element.innerText).split(" ")); 
            // console.log(validarURL(element.innerText)); 
            if(validarURL(element.innerText)){
                let mensajes = element.innerText.split(" ");
                console.log(mensajes);
                element.innerHTML = "";
                let nombre = document.createElement("p");
                nombre.innerText = mensajes[0];    
                nombre.style.fontWeight = "bold";  
                element.appendChild(nombre);
                // let div = document.createElement("div");
                // let mostrar = ""
                let img = document.createElement("img");
                mensajes.forEach(mensaje => {
                    // mostrar.concat(mensaje);
                    if(validarIMG(mensaje)){ // imagen 
                        img = (mostrarImagen(mensaje));
                        // div.innerText = mostrar;
                        element.appendChild(img)
                    }
                    else{
                        if(validarURL(mensaje)){ // link
                            console.log("Link",mensaje);
                            fetchData(mensaje).then(data => {   
                                console.log(data);
                                console.log("Descrip",data.description);
                                console.log("Imagen",data.image);
                                console.log("Titulo",data.title);
                                element.appendChild(mostrarLink(data.description, data.image, data.title, data.url));

                            })  
                        }
                        
                    }
                
                })
                
                
            }
            divMensaje.appendChild(element);
            divMensaje.scrollTop = divMensaje.scrollHeight; // para que el scroll se vaya al final
            cont++;
        });
    }
    console.log(cont);
};



// console.log(validarIMG('https://upload.wikimedia.org/wikipedia/commons/8/8c/Nissan_logo.png'));

// mostrar si es una url 
function mostrarLink(description, image,title, url){
    let containar = document.createElement("div");
    containar.style.display = 'flex';
    containar.style.flexDirection = 'column';
    containar.style.justifyContent = 'center';
    let header = document.createElement('a');
    header.style.fontFamily = 'sans-serif';
    header.innerText = title;
    header.src = url;
    header.target = "_blank";
    containar.appendChild(header);
    let containerImage = document.createElement("div");
    containerImage.style.display = 'flex';
    containerImage.style.flexDirection = 'row';
    let img = document.createElement('img');
    img.style.width = '20%';
    img.style.margin = "20px";
    img.src = image;
    let descrip = document.createElement('p');
    descrip.style.justifyContent = 'flex-end';
    descrip.innerText = description;
    containerImage.appendChild(img);
    containerImage.appendChild(descrip);
    containar.appendChild(containerImage);
    return containar;
}



// mostrar si es una imagen 

function mostrarImagen(url){
    let imagen = document.createElement("img");
    imagen.src = url;
    imagen.style.width = "150px";
    imagen.style.height = "120px";
    imagen.alignSelf = "center";
    imagen.style.marginTop = "10px";
    return imagen;
}

async function fetchData(siteUrl){
    const requestURL = `https://api.linkpreview.net/?fields=image_x,icon_type,locale&q=${siteUrl}`
    const webPage = await fetch(requestURL, {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json', 
        'X-Linkpreview-Api-Key': "c7fb8dc552a6915a20399baf1dc26481"}
    }) 
    const urlInfo = await webPage.json()
    console.log(urlInfo)
    return urlInfo

}


// para validar si es una url valida 
function validarURL(str) {
    const patron = new RegExp("/(:http(s)?:\\/\\/)?[\\w.-]+(?:\\.[\\w\\.-]+)+[\\w\\-\\._~:/?#[\\]@!\\$&'\\(\\)\\*\\+,;=.]+$");
    return patron.test(str);
}

function validarIMG(str) {
    const extensionesImagen = /\.(png|jpg|jpeg|gif)$/i;
    return extensionesImagen.test(str);
}




// -------------- se manda a llamar la funcion que muestra los chats ------------------
cargarChats()
setInterval(cargarChats, 5000);
// ------------------------------------------------------------------------------------
// crear los chats (lado izquierdo de la pantalla)
async function crearListoDeUsers(){
    // mando a traer los post dummys a una api con get
    let response =  await llamarChats()
    let misPosts = response.data
    //let misPosts = await llamarChats()
    let users = new Set()
    misPosts.map(post=>{
        // console.log(post);
        users.add(post.username)
    })


    // mando a traer el div donde quiero poner los chats
    let divListados = document.getElementById("listado-chats");
    divListados.innerHTML = "";
    if(divListados != null){
        // transformamos los dicccionarios a un div de chat
        // recorremos los nuevos chats y los agremos al div de listados
        users.forEach(element => {
            let nuevoChat = crearChat(element);
            divListados.appendChild(nuevoChat);
        })
    }

}

// crea un mensaje como el que se recibe de la api
function crearMensaje(texto, user){
    let nuevoChat = document.createElement("div");
    nuevoChat.className = "mensaje";
    nuevoChat.id = user;
    let nombre = document.createElement("p");
    nombre.innerText = user;    
    nombre.style.fontWeight = "bold";  
    nuevoChat.appendChild(nombre); 
    let tex = document.createElement("p");
    tex.innerText = texto;
    nuevoChat.appendChild(tex); 
    nuevoChat.style.backgroundColor = color3;
    nuevoChat.style.borderRadius = "5px";
    nuevoChat.style.padding = "5px";
    nuevoChat.style.maxWidth = "50%";
    nuevoChat.style.minWidth = "10%";
    // nuevoChat.style.minHeight = "50px";
    // nuevoChat.style.maxHeight = "80px";
    nuevoChat.style.border = "1px solid black";
    nuevoChat.style.marginBottom = "5px";
    nuevoChat.style.display = "inline-table";
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
    return div;

}    

async function subirChat(text){
    const datos = {
        "username": 'Francis',
        "message": text
    };    
    let data = await fetch('https://apiweb.programmerscrew.com/public/messages',
    {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },    
        body: JSON.stringify(datos)
    })        
    console.log("await", data); // imprime la promesa
    

    
}    


// mandar mensaje a la api y lo muestra de lado derecho de la pantalla
function mandarMensaje(){
    let text = document.getElementById("text-chat").value;
    // esta parte seria para agregar el chat a la api

    if(text != ""){
        subirChat(text);
        document.getElementById("text-chat").value = ""; // borrar el contenido del textarea
        //console.log(text);
        let nuevo = crearMensaje(text, "yopis"); 
        // agregar los listados a la api y solo cargar de nuevo los chats
        let divMensaje = document.getElementById("mensaje");
        nuevo.style.marginTop = "5px";
        divMensaje.appendChild(nuevo);
        divMensaje.scrollTop = divMensaje.scrollHeight; // para que el scroll se vaya al final
    }


}


// editar los estilos de los divs
function editarEstilo(id, color, height, width, display, border, gridRow, gridColumn, padding, flexDirection, overflow, align, justify, margin, top, left, bottom, rigth, radius, position){
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
        overflow != null ? elemento.style.overflowY = overflow : null;
        align != null ? elemento.style.alignItems = align : null;
        justify != null ? elemento.style.justifyContent = justify : null;
        margin != null ? elemento.style.margin = margin : null;
        top != null ? elemento.style.top = top : null;
        left != null ? elemento.style.left = left : null;
        bottom != null ? elemento.style.bottom = bottom : null;
        rigth != null ? elemento.style.rigth = rigth : null;
        radius != null ? elemento.style.borderRadius = radius : null;
        position != null ? elemento.style.position = position : null;
        
    }
    else{
        console.log("No existe el id: ", id);
    }
}

// editarEstilo(id, color, height, width, display, border, gridRow, gridColumn, padding, flexDirection, overflow, align, justify, margin, top, left, bottom, rigth)


crearDiv("div","contenedor");
editarEstilo("contenedor", null, "calc(100vh - 0px)","100%", "grid", "1px solid black", "20% 80%", "85% 15%");

let listado = crearDiv("div","listado-chats","contenedor");
editarEstilo("listado-chats", color1,"100%", "100%", "block","1px solid black",null, null, "8px","column","scroll", "center", "center", null, null, null, null, null, null, "relative");
// Guarda la posición actual del scrollbar
listado.style.scrollTop = 0;

// crearDiv("div","mensajes-info","listado-chats",null,"chat");
// editarEstilo("mensajes-info",color3,"60px","100%","flex",null,null,null,null,null,null,"center","space-around", null,null,null,null,null);
// let elementito = document.getElementById("mensajes-info");
// elementito.minHeight = "60px";
// crearDiv("div","mensajes","listado-chats");
// editarEstilo("mensajes",color2,"90%","100%","flex",null,null,null,null,null,"scroll","center","space-around", null,null,null,null,null);

crearDiv("div","mensaje","contenedor");
editarEstilo("mensaje",color5,"auto","auto","flex",null,null,null,null,"column","scroll",null,null,null,null,null,null);

crearDiv("div","contenido-perfil","contenedor");
editarEstilo("contenido-perfil",color2,"100%","100%","flex",null,null,null,null,null,null,"center","space-around", null,null,null,null,null);
crearDiv("div","perfil-info","contenido-perfil");
editarEstilo("perfil-info",null,"100%","100%","flex",null,null,null,null,"row",null,"center","space-around", null,null,null,null,null);
crearDiv("img","foto-perfil","perfil-info",null,"foto-perfil");
crearDiv("div","nombre-perfil","perfil-info","Francis Aguilar");
let bt = crearDiv("button","config","perfil-info");
editarEstilo("config",color5,"35px","35px","flex",null,null,null,null,null,null,"center","space-around", null,null,null,null,null);
bt.innerText = "Conf";
let n = 1;
bt.addEventListener("click", function(){
    if (n == 1){
        document.getElementById("mensaje").style.backgroundColor = color1;
        document.getElementById("listado-chats").style.backgroundColor = color4;
        let c = document.getElementById("yopis");
        if(c != null){
            c.style.backgroundColor = color4;
        }

        n = 2;
    }
    else{
        document.getElementById("mensaje").style.backgroundColor = color5;
        document.getElementById("listado-chats").style.backgroundColor = color1;
        let c = document.getElementById("yopis");
        if(c != null){
            c.style.backgroundColor = color1;
        }

        n = 1;
    }
});

crearDiv("div","contenido-chat","contenedor");
editarEstilo("contenido-chat",color4,"100%","100%","flex",null,null,null,null,null,null,"center","space-around", null,null,null,null,null);
crearDiv("textarea","text-chat","contenido-chat",null,"mensaje-chat");
crearDiv("button","enviar","contenido-chat","Enviar");


//boton
const botonEnviar = document.getElementById("enviar");
botonEnviar.addEventListener("click", mandarMensaje);

// Establecer los estilos
botonEnviar.style.color = color2;
botonEnviar.style.border = "2px solid rgb(231, 225, 188 )";
botonEnviar.style.borderRadius = "0px";
botonEnviar.style.padding = "18px 36px";
botonEnviar.style.display = "inline-block";
botonEnviar.style.fontFamily = '"Lucida Console", Monaco, monospace';
botonEnviar.style.fontSize = "14px";
botonEnviar.style.letterSpacing = "1px";
botonEnviar.style.cursor = "pointer";
botonEnviar.style.boxShadow = "inset 0 0 0 0 #E1B8F3";
botonEnviar.style.transition = "0.4s";
botonEnviar.style.mozTransition = "ease-out 0.4s";
botonEnviar.style.transition = "ease-out 0.4s";
botonEnviar.style.height = "100%";
botonEnviar.style.margin = "10px";


let user = crearChat("Usuarios", "user");
user.style.backgroundColor = color4;
user.style.width = "100%";
user.style.minHeight = "60px";
user.style.borderRadius = "8px";
user.style.border = "1px solid black";
user.style.marginBottom = "8px";
let divListados = document.getElementById("listado-chats");
divListados.appendChild(user);

//--------------------------------- se manda a llamar la funcion que muestra los users ------------------
crearListoDeUsers();
// setInterval(crearListoDeUsers, 5000);
//--------------------------------------------------------------------------------------------------------

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

// Crear un elemento de textarea
let textarea = document.getElementById("text-chat");

// Establecer los estilos
textarea.style.width = "100%";
textarea.style.height = "90%";
textarea.style.padding = "12px 20px";
textarea.style.boxSizing = "border-box";
textarea.style.border = "2px solid #ccc";
textarea.style.borderRadius = "4px";
textarea.style.backgroundColor = "#f8f8f8";
textarea.style.fontSize = "16px";
textarea.style.resize = "none";
textarea.style.marginLeft = "10px";
textarea.setAttribute("maxlength","140");
textarea.setAttribute("placeholder","Escribe algo...");

textarea.addEventListener("keydown", function(event){
    if(event.keyCode === 13){
        event.preventDefault();
        mandarMensaje(); 
        textarea.value = "";
 }   });



let perfil = document.getElementById("perfil-info");
perfil.style.marginRight = "30px";


// estilo del body
document.body.style.margin = "0px";
document.body.style.overflow = "hidden";



// Agrega el evento de hover
botonEnviar.addEventListener("mouseenter", function() {
    botonEnviar.style.boxShadow = "inset 10px 0 0 100px #E1B8F3";
});

// Elimina la clase al salir del hover
botonEnviar.addEventListener("mouseleave", function() {
    botonEnviar.style.boxShadow = "none"; // Eliminar la sombra
});







