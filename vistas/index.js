let cont = $("#cont");
let contadorGeneral = -1;
const contenedor = $("#contenedor");
let cadena = [];

const img1 = "<div class='col-3 me-3' class='elemento' id='";
const img2 = "'><div class='alert alert-dismissible fade show col-2' role='alert'>" +
    "<img style='width: 200px;' src='../imagenes/";
const img3= "' alt='imagen'>" +
    "<button id='quitar";

const img4 = "' type='button' onclick='quitar()' class='btn-close' data-bs-dismiss='alert' aria-label='Close'></button></div></div>";

$("#botonAgregar").click(function () {
    $("#inputFoto").trigger('click');
})

$("body").on("change", "#inputFoto", function (event){
    contadorGeneral++;
    let archivo = event.target.files[0].name;
    cadena.push(archivo.split('.').shift());
    let extension = archivo.split('.').pop();
    if (extension === "png" && cont.text()<16) {
        contenedor.append(img1+contadorGeneral+img2+archivo+img3+contadorGeneral+img4);
        let contador = parseInt($("#cont").text())+1;
        crearCuadros(cadena, contador);
        cont.text(+cont.text()+1);
    } else {
        console.log("Ocurrió un error :p");
    }
})

function quitar (){
    let idTotal = $(event.target).attr("id");
    let id = idTotal.substring(6);
    console.log(id);
    $("#"+id).remove();
    if (+cont.text() > 0){
        cont.text(+cont.text()-1);
        console.log(cont);
        cadena[id] = null;
    }
    let contador = parseInt($("#cont").text());
    crearCuadros(cadena, contador);
}

function crearCuadros (cadena, contador) {
    console.log(contador);
    let filas = Math.floor(Math.sqrt(contador*2));
    let columnas = 0;
    if(filas*(filas+1)===(contador*2)){
        if (filas%2===1){
            columnas = filas;
            filas = filas + 1;
        }else {
            columnas = filas + 1;
        }
    }else if (filas*filas === (contador*2)){
        columnas = filas;
    }else {
        filas = 0;
    }
    console.log(filas, columnas);
    $("#tablero").empty();
    $("#tablero").removeClass();
    $("#tablero").addClass("row row-cols-"+filas+" row-cols-lg-"+ columnas);

    let arreglo = []
    for (let m = 0; m < contador;m++){
        arreglo.push(m);
        arreglo.push(m);
    }
    console.log(cadena);
    let cadena2 = cadena.filter(elemento => elemento !== null);
    console.log(cadena2);
    arreglo = shuffleArray(arreglo);
    if (filas !== 0){
        for (let k = 0; k < columnas;k++){
            for (let j = 0; j < filas;j++){
                console.log("Fila", j);
                $("#tablero").append("<div class='col col-3'><div class='rectangulo p-3'><img id='"+(k*filas+j)+"' onclick=\"destapar('"+cadena2[arreglo[k*filas+j]]+"',"+(k*filas+j)+")\" style='width: 150px;' src='../imagenes/"+cadena2[arreglo[k*filas+j]]+".png'></div></div>");
            }
        }
        $("#tablero").append("<div class='container'><button class='btn btn-primary'>Comenzar juego</button></div>");
    }
}
function shuffleArray(array) {
    array.sort(() => Math.random() - 0.5);
    return array;
}