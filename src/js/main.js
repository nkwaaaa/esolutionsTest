
let datosPersona = {
  nombre: "",
  direccion: "",
  sexo: "",
  edad: 0,
  ciudad: "",
  interesPorJs: "",
};

const profileBtn = document.querySelector("#completar-perfil");
const materiasBtn = document.querySelector("#obtener-preguntas");
const cambiarTema = document.querySelector('#cambiar-tema');

profileBtn.addEventListener("click", renderizarDatosUsuario);
cambiarTema.addEventListener("click", alternarColorTema);

function obtenerDatosDelUsuario() {
 
  datosPersona.nombre = prompt("Ingrese su nombre completo:")
  datosPersona.edad = prompt("Ingrese su fecha de nacimiento formato dd/mm/year:")
  datosPersona.ciudad = prompt("Ingrese la ciudad donde vive:")
  datosPersona.direccion = prompt("Ingrese su direccion:")
  datosPersona.sexo = prompt("Ingrese su sexo:")
  datosPersona.aguantePrompt = confirm("¿Le gusta responder preguntas en un prompt en lugar de una librería que simplifique y mejore las cosas?")
 }

function calcularEdad(nacimiento) { 

  nacimiento=new Date(nacimiento.split('/').reverse().join('-'));
  var edadDif = Date.now() - nacimiento.getTime();
  var edadFecha = new Date(edadDif); 
  return Math.abs(edadFecha.getUTCFullYear() - 1970);
}


function renderizarDatosUsuario() {
  obtenerDatosDelUsuario();
  
  let nombre = document.getElementById("nombre");
  let direccion = document.getElementById("direccion");
  let sexo = document.getElementById("sexo");
  let edad = document.getElementById("edad");
  let ciudad = document.getElementById("ciudad");
  let aguantePrompt = document.getElementById("prompt");
  
  nombre.innerText = datosPersona.nombre;
  direccion.innerText = datosPersona.direccion;
  sexo.innerText = datosPersona.sexo;
  
  edad.innerText = calcularEdad(datosPersona.edad);
  ciudad.innerText = datosPersona.ciudad;
  datosPersona.aguantePrompt ? aguantePrompt.innerText = "Sí, soy rústico" : aguantePrompt.innerText = "No, ya quedaste re mal";
 
  
}

/* ------------------------------- formulario ------------------------------- */

const formulario = document.forms[0];
const boton = document.querySelector('#enviar');
const botonBorrar = document.querySelector('#borrar');
const inputRespuesta = document.querySelector('#respuesta');
const divRespuestas = document.querySelector('.respuestas');

botonBorrar.addEventListener("click", () => {
  localStorage.clear()
  /** refresh page */
  location.reload();
  
})

// listado de respuestas chequeando si existen otras en local
const listadoRespuestas = JSON.parse(localStorage.getItem('respuestasAlmacenadas')) || [];

renderizarRespuestas(listadoRespuestas);

formulario.addEventListener('submit', function(evento){
    evento.preventDefault();
    
    // guardo el último para que vaya arriba del todo
    listadoRespuestas.unshift(inputRespuesta.value);
    
    // limpio la caja de respuestas
    divRespuestas.innerHTML = ""

    // renderizo las respuestas en pantalla
    renderizarRespuestas(listadoRespuestas);
    guardarEnLocal();
    inputRespuesta.focus();

    // limpio el formulario
    formulario.reset();
});




function renderizarRespuestas(listado){
    listado.forEach(elemento => {
        divRespuestas.innerHTML += `<p>${elemento}</p>`
    });
}   

function guardarEnLocal(){
    localStorage.setItem('respuestasAlmacenadas', JSON.stringify(listadoRespuestas) );
}




/* -------------------------- modo obscuro rústico -------------------------- */

function alternarColorTema() {
  
  document.getElementById('sitio').classList.toggle('dark')
}

/* ----------------------- feddback de la experiencia ----------------------- */

let feedback = document.getElementById("feedback");

window.addEventListener("keypress", (e) => {
  if (e.key.toUpperCase() === "F"){
    feedback.classList.remove("oculto");
  }    
});