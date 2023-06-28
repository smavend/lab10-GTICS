$(document).ready(function() {
    let contador = 6;

    let filas = Math.floor((contador * 2).sqrt);
    let columnas;
    for (let i = filas; i < contador * 2; i++) {
        if ((contador * 2) % filas === 0) {
            if ((contador * 2 / filas) % 2 === 1) {
                columnas = contador * 2 / filas;
                if (Math.abs(filas - columnas) === 1) {
                    break;
                }
            }
        }
        if (i === contador * 2) {
            filas = 0;
            columnas = 0;
            break;
        }
    }
    for (let k = 0; k < filas;k++){
        $("#contenedor").append("<div class=\"rectangulo\"></div>");
    }
    for (let k = 0; k < columnas;k++){
        $("#contenedor").append("<div class=\"rectangulo\"></div>");
    }
    $("#cont").change( function () {

    })
})