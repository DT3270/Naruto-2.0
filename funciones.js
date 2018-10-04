function definirColor() {
  if (lineaSalida %2 == 0) {
    return "#D1E0E7";
  } else {
    return "#EAF3F7";
  }
};

function definirLinea(linea, registro) {
  if (linea == 0) {
    return "ti";
  } else {  
    if (registro.paquete == 0) {
      return "pr";
    } else {
      return "pq";
    }
  }
};

function crearProducto(pdv, pq) {
  var pdvIn = document.getElementById("pdv");
  for (var i = 0; i < productos.length; i++) {
    if ((productos[i].paquete == pq && (productos[i].pdv == pdv || pdv == 0))
        && (productos[i].pdv == pdvIn.value || pdvIn.value == 0)) {
      var x = margenLeft;
      var y = margenTop + altoCelda * lineaSalida;
      for (var j = 0; j < 4; j++) {
        // Creo el div de los productos
        var celda = new Celda("prod"+lineaSalida+j, altoCelda, anchoCelda, definirColor(), y, x);
        celda.agregar("fondo");
        grillaSalida.push(celda.nombre);
        // Cargo el text de los productos
        var texto = [];
        switch(j) {
          case 0:  texto.push('<small style="margin-right:4px">', productos[i].pdv, '</small>')      
          break;
          case 1:  texto.push('<small style="margin-right:4px">', productos[i].paquete, '</small>')  
          break;
          case 2:  texto.push('<small style="margin-right:4px">', productos[i].producto, '</small>') 
          break;
          default: texto.push('<small style="margin-right:4px">', productos[i].limite, '</small>')
          }

          document.getElementById(celda.nombre).innerHTML = texto.join('');
          x = x + anchoCelda + 1
      } // end-for
      lineaSalida = lineaSalida + 1;
    } // end-if
  } //end-for
};//end-function

function crearPaquete() {
  var x = margenLeft;
  var pdvIn = document.getElementById("pdv");
  for (var i = 0; i < paquetes.length; i++) {
    if (paquetes[i].pdv == pdvIn.value || pdvIn.value == 0) {
      var y = margenTop + altoCelda * lineaSalida ;
      // Creo el div del paquete
      var celda = new Celda("pq"+i, altoCelda, anchoGrilla, definirColor(), y, x);
      celda.agregar("fondo");
      grillaSalida.push(celda.nombre);
      // Agrego la información del paquete
      var texto = [];
      texto.push('<small style="margin-right:4px"> Paquete: ', paquetes[i].paquete, '</small>')
      document.getElementById(celda.nombre).innerHTML = texto.join('');
      lineaSalida = lineaSalida + 1;
      document.getElementById(celda.nombre).addEventListener("click", function(e) {
          var obj = document.getElementById(e.srcElement.id);
          var index = paqSel.indexOf(obj.id);
          if (index > -1) {paqSel.splice(index, 1)} else {paqSel.push(obj.id)}
          generarGrilla();
        } //end-function
      ) //end-addEventListener
      console.log(paqSel)
      var index = paqSel.indexOf(celda.nombre);
      if (index > -1) {
        crearEncabezado()    
        crearProducto(paquetes[i].pdv, paquetes[i].paquete)
      }
    } //end-if
  } //end-for
};//end-function

function crearEncabezado() {
  var x = margenLeft;
  var y = margenTop + altoCelda * lineaSalida +1;
  for (var i = 0; i < 4; i++) {
    // Creo el div de los titulos
    var celda = new Celda("enc"+y+i, altoCelda, anchoCelda, "#4688D3", y, x);
    celda.agregar("fondo");
    grillaSalida.push(celda.nombre);
    // Cargo el text de los titulos
    var texto = [];
    switch(i) {
      case 0:  texto.push('<small style="margin-right:4px">', encabezado.pdv, '</small>')      
      break;
      case 1:  texto.push('<small style="margin-right:4px">', encabezado.paquete, '</small>')  
      break;
      case 2:  texto.push('<small style="margin-right:4px">', encabezado.producto, '</small>') 
      break;
      default: texto.push('<small style="margin-right:4px">', encabezado.limite, '</small>')
    } // end-swith
    document.getElementById(celda.nombre).innerHTML = texto.join('');
    x = x + anchoCelda + 1
  } // end-for
      lineaSalida = lineaSalida + 1;
};

function eliminarGrilla() {
  var fondo = document.getElementById("fondo")
  for (var i = 0; i < grillaSalida.length; i++) {
    var obj = document.getElementById(grillaSalida[i])
    fondo.removeChild(obj)
  }//end-for
  grillaSalida.splice(0,grillaSalida.length)
};//end-function

function generarGrilla() {
  // Inicializo la griolla
  eliminarGrilla();
  // Valido si tengo datos a listar
  console.log(paquetes.length)
  if (paquetes.length == 0 && productos.length == 0) {
    alert("Debe seleccionar un archivo y asegurarse que tenga información para listar")
    return;
  }
  // Creo el titulo para los paquetes
  var celda = new Celda("tituo1", altoCelda, anchoGrilla, "#3D628C", margenTop, margenLeft);
  celda.agregar("fondo");
  grillaSalida.push(celda.nombre);
  texto = [];
  texto.push('<small style="margin-right:4px"> Paquetes </small>')      
  document.getElementById(celda.nombre).innerHTML = texto.join('');
  lineaSalida = 1;
  // Creo la lista de paquetes
  crearPaquete()
  // Creo el titulo de para los productos sueltos
  var celda = new Celda("tituo2", altoCelda, anchoGrilla, "#3D628C", margenTop + altoCelda * lineaSalida, margenLeft);
  celda.agregar("fondo");
  grillaSalida.push(celda.nombre);
  texto = [];
  texto.push('<small style="margin-right:4px"> Productos sueltos </small>')      
  document.getElementById(celda.nombre).innerHTML = texto.join('');
  lineaSalida = lineaSalida + 1;
  // Creo el titulo de los productos sueltos
  crearEncabezado()
  // Creo la lista de productos sueltos
  crearProducto(0, 0)
}; //end-function

function integrarGrilla(archivoIn) {
  // Cargo dos arrays, uno de paquetes y otro de productos sueltos
  
  for (var i = 0; i < archivoIn.length; i++) {
    var tipoReg = definirLinea(i, archivoIn[i]) 
    switch (tipoReg) {
      case "ti": 
        encabezado = archivoIn[i]
        break;
      case "pq":         
        var paqueteTratado = archivoIn[i].paquete
        paquetes.push(archivoIn[i])
        for (i; archivoIn[i].paquete == paqueteTratado; i++) {
          productos.push(archivoIn[i])
        }
        i = i-1;
        break;
      default: 
        productos.push(archivoIn[i])
        break;
    } //end-switch
  } //end-for
}; //end-function

function leerArchivo(e) {
  var archivo = e.target.files[0];
  if (!archivo) {
    return;
  };

  var lector = new FileReader();
  lector.onload = function(e) {

    // Leo el archivo
    var contenido = e.target.result;
    var formato = ['pdv', 'paquete', 'producto', 'limite'];
    var datos = contenido;
    var archivoIn = crearArchivo('N', formato, datos);

    // Cargo los arrays de productos sueltos y paquetes
    integrarGrilla(archivoIn);

    // Generar grilla
    generarGrilla();

  }; //end-funcion

  lector.readAsText(archivo);
}; //end-function
