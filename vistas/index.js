let fotoAyuda=null;
let cont = $("#cont");
let contadorGeneral = -1;
const contenedor = $("#contenedor");
let cadena = [];
let cartasdestapadas = 0;
let id1 = null;
let id2 = null;
let valor1 = null;
let valor2 = null;
let aciertos = 0;
let wait = false;
let arregloAciertosId = [];
let contAyuda= 1;



let localContador = localStorage.getItem("contador");
let localImagenes = localStorage.getItem("imagenes") == null? []:JSON.parse(localStorage.getItem("imagenes"));

const img1 = "<div class='col-3 me-3' class='elemento' id='";
const img2 = "'><div class='alert alert-dismissible fade show col-2' role='alert'><img style='width: 200px;' src='../imagenes/";
const img3= "' alt='imagen'><button id='quitar";
const img4 = "' type='button' onclick='quitar()' class='btn-close' data-bs-dismiss='alert' aria-label='Close'></button></div></div>";

if(localContador != null){ // ya existe una partida
    cont.text(localContador);

    // recargando las imagenes que ya habian
    for(let i = 0; i < localImagenes.length; i++){
        cadena.push(localImagenes[i].split('.').shift());
        contenedor.append(img1+i+img2+localImagenes[i]+img3+i+img4)
    }

    crearCuadros(cadena, parseInt($("#cont").text()));

}

$("#botonAgregar").click(function () {
    $("#inputFoto").trigger('click');
})

$("body").on("change", "#inputFoto", function (event){
    contadorGeneral++;
    let archivo = event.target.files[0].name;
    cadena.push(archivo.split('.').shift());
    let extension = archivo.split('.').pop();

    if (extension === "png" && cont.text()<16) {

        // guardando imagenes en storage
        localImagenes.push(archivo);
        localStorage.setItem("imagenes", JSON.stringify(localImagenes));

        contenedor.append(img1+contadorGeneral+img2+archivo+img3+contadorGeneral+img4);
        let contador = parseInt($("#cont").text())+1;
        crearCuadros(cadena, contador);
        cont.text(+cont.text()+1);

        // guardando contador en storage
        localStorage.setItem("contador", +localStorage.getItem("contador")+1);

    } else {
        console.log("Ocurrió un error :p");
    }
})

function quitar (){
    let idTotal = $(event.target).attr("id");
    let id = idTotal.substring(6);
    //console.log(id);

    // guardando nuevas imagenes y contador en storage
    let caja = $("#"+id);
    let archivo = caja.find("img").attr("src").split('/').pop();
    let indice = localImagenes.indexOf(archivo);
    localImagenes.splice(indice, 1);
    localStorage.setItem("imagenes", JSON.stringify(localImagenes));
    localStorage.setItem("contador", +localStorage.getItem("contador")-1);

    caja.remove();
    if (+cont.text() > 0){
        cont.text(+cont.text()-1);
        //console.log(cont);
        cadena[id] = null;
    }
    let contador = parseInt($("#cont").text());
    crearCuadros(cadena, contador);
}

function crearCuadros (cadena, contador) {
    //console.log(contador);
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
    //console.log(filas, columnas);
    $("#tablero").empty();
    $("#tablero").removeClass();
    $("#tablero").addClass("row row-cols-"+filas+" row-cols-lg-"+ columnas);

    let arreglo = []
    for (let m = 0; m < contador;m++){
        arreglo.push(m);
        arreglo.push(m);
    }
    //console.log(cadena);
    let cadena2 = cadena.filter(elemento => elemento !== null);
    //console.log(cadena2);
    arreglo = shuffleArray(arreglo);
    if (filas !== 0){
        for (let k = 0; k < columnas;k++){
            for (let j = 0; j < filas;j++){
                //console.log("Fila", j);
                $("#tablero").append("<div class='col col-3'><div class='rectangulo p-3' onclick=\"destapar('"+cadena2[arreglo[k*filas+j]]+"',"+(k*filas+j)+")\"><img style='height: 100px; display: none' id='img"+(k*filas+j)+"' src='../imagenes/"+cadena2[arreglo[k*filas+j]]+".png'></div></div>");
            }
        }
        $("#tablero").append("<div class='container' id='start'><button type='button' class='btn btn-primary'>Comenzar juego</button></div>");
    }
}

$(document).on('click', '#start', function (event) {
    //console.log("en start");
    $("#contenedor").hide();
    $("#start").hide();
    $("#botonAgregar").hide();
    $("#tablero").append("<div class='container' id='buttons'><button type='button' id='random' class='btn btn-info me-2'>Aleatorizar</button></div>");
    $("#ayuda").show();
})

function shuffleArray(array) {
    array.sort(() => Math.random() - 0.5);
    return array;
}

function destapar(imagen, id){
    console.log("destapar")
    console.log(id);
    //console.log(($("#contenedor")).is(':hidden'));
    //console.log("wait:",wait,"id1: ",id!==id1, "encontrado:",!arregloAciertosId.includes(id));
    if (($("#contenedor")).is(':hidden') && !wait && id !== id1 && !arregloAciertosId.includes(id)){
        $("#img"+id).show()
        fotoAyuda = $("#img"+id).attr('src').split('/').pop();
        console.log(fotoAyuda);
        cartasdestapadas = cartasdestapadas + 1;
        console.log(cartasdestapadas);
        if (cartasdestapadas % 2 === 1){
            valor1 = imagen;
            id1 = id;
            $("#img"+id).prop("disabled", true);
            console.log("id1:"+id1);
        }
        if (cartasdestapadas % 2 === 0){
            valor2 = imagen;
            id2 = id;
            if (valor2 === valor1){
                aciertos = aciertos + 1;
                arregloAciertosId.push(id1);
                arregloAciertosId.push(id2);
                id1 = null;
                id2 = null;
                //console.log("nuevo acierto", aciertos, $("#cont").text());
                if (aciertos === parseInt($("#cont").text())){
                    setTimeout(()=>{
                        alert("Felicidades, has completado el juego");
                        $("#contenedor").empty();
                        $("#contenedor").show();
                        $("#tablero").empty();
                        $("#cont").text(0);
                        $("#botonAgregar").show();
                        contadorGeneral = -1;
                        cadena = [];
                        cartasdestapadas = 0;
                        id1 = null;
                        id2 = null;
                        valor1 = null;
                        valor2 = null;
                        aciertos = 0;

                        localStorage.removeItem("imagenes");
                        localStorage.removeItem("contador");
                        $("#ayuda").hidden;
                    },700)
                }
            }else {
                wait = true;
                setTimeout(()=>{
                    $("#img"+id1).hide();
                    $("#img"+id1).prop("disabled", false);

                    $("#img"+id2).hide();
                    $("#img"+id2).prop("disabled", false);

                    $("#tablero").prop("disabled", false);
                    wait = false;
                    id1 = null;
                    id2 = null;
                },500);
            }
        }
    }
}
//Funcion que me busca una carta igual
function mostrarPareja(imagen) {
    imagen = imagen.split('.').shift();
    console.log(cadena);
    console.log((2*cadena.length)-1);
    for (let i = 0; i < (2*cadena.length)-1; i++) {
        if (cadena[i] === imagen) {
            $("#img"+i).show();
            imagen.show();
            break;
        }
    }
}
$("#ayuda").click(function () {
    //funcion para contabilizar el numero de intentos
    console.log(fotoAyuda);

    if (contAyuda < 2) {
        mostrarPareja(fotoAyuda);
        contAyuda++;
    } else {
        $("#ayuda").prop("disabled", true);
    }
})







