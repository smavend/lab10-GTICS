$(document).ready(function() {
    $("#inputFoto").change( function () {
        let contador = parseInt($("#cont").text());
        console.log(contador);
        let filas = Math.floor(Math.sqrt(contador * 2));
        let columnas = 0;
        for (let i = filas; i <= contador * 2; i++) {
            console.log("nuevo numero:",filas);
            if ((contador * 2) % i === 0) {
                if ((contador * 2 / i) % 2 === 1) {
                    columnas = contador * 2 / i;
                    if (Math.abs(i - columnas) === 1) {
                        filas = i;
                        break;
                    }
                }
            }
        }
        if (filas * columnas !== contador * 2){
            filas = 0;
            columnas = 0;
        }
        console.log(filas, columnas);
        $("#tablero").val("");
        $("#tablero").append("<div class='row row-cols-" + filas + " row-cols-lg-"+columnas+">");

        for (let k = 0; k < filas;k++){
            console.log("Fila", k);
            $("#tablero").append("<div class='col'><div class='rectangulo p-3'>Row column</div></div>");
        }
        for (let k = 0; k < columnas;k++){
            console.log("Columna", k);
            $("#tablero").append("<div class='col'><div class='rectangulo p-3'>Row column</div></div>");
        }
        $("#tablero").append("</div>");
    })
})