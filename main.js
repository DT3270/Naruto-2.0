const altoCelda = 22;
const anchoCelda = 200;
const columnas = 4;
const anchoGrilla = anchoCelda * columnas + columnas -1;
const margenTop = 200;
const margenLeft = 8;

var lineaSalida = 1;
var grillaSalida = [];
var paqSel = [];
var encabezado;
var paquetes = [];
var productos = [];

//var fondo = document.getElementById("fondo");
//console.log(fondo);

document.getElementById('file-input')
  .addEventListener('change', leerArchivo, false);

document.getElementById('pdv')
  .addEventListener('change', generarGrilla, false);
