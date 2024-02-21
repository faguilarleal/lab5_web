
// //obtener la info de la api
// let data = fetch('https://jsonplaceholder.typicode.com/posts',
// {
//     method: 'GET',
//     headers: {
//         'Content-Type': 'application/json'
//     },
//     body : JSON.stringify({})
// })    // todo va dentro del fetch y se guarda en data 


// function optenerPost2(){
//     let posts = fetch('https://jsonplaceholder.typicode.com/posts')
//     .then(response => response.json())
//     .then(data => console.log(data))
//     .catch(error => console.log(error));
// }
// ASYNC AWAIT - ME PERMITE ESPERAR LA RESPUESTA DE UNA PETICION ASINCRONA

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
    return nuevoChat;
}



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








// ----------- PARTE DE HTML ------------

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

var cont = 0;
function mandarMensaje(){
    let text = document.getElementById("text-chat").value;
    // esta parte seria para agregar el chat a la api

    if(text != ""){
       // document.getElementById("text-chat").value = ""; // borrar el contenido del textarea
        //console.log(text);
        cont++;
        let nuevo = crearChat(text, "chat"+cont); 
        // agregar los listados a la api y solo cargar de nuevo los chats
        let divMensaje = document.getElementById("mensaje");
        divMensaje.appendChild(nuevo);
        divMensaje.scrollTop = divMensaje.scrollHeight; // para que el scroll se vaya al final
    }
    

}



crearDiv("div","contenedor");
crearDiv("div","listado-chats","contenedor");
crearDiv("div","mensaje","contenedor");
crearDiv("div","contenido-perfil","contenedor");
crearDiv("div","contenido-chat","contenedor");
crearDiv("textarea","text-chat","contenido-chat",null,"mensaje-chat");
crearDiv("button","enviar","contenido-chat","Enviar");

const boton = document.getElementById("enviar");
boton.addEventListener("click", mandarMensaje);

//crearListoDeChats();


// css con javascript



