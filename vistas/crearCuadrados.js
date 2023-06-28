$(document).ready(function() {
    $("#inputFoto").change( function () {
        let contador = parseInt($("#cont").text());
        console.log(contador);
        let filas = 0;
        let columnas = 0;
        if ((contador*2) === 2){
            filas = 2;
            columnas = 1;
        }else if((contador*2) === 4){
            filas = 2;
            columnas = 2;
        }else if((contador*2) === 6){
            filas = 2;
            columnas = 3;
        }
        console.log(filas, columnas);
        $("#tablero").val("");
        $("#tablero").append("<div class='row row-cols-" + filas + " row-cols-lg-"+columnas+">");


        for (let k = 0; k < columnas;k++){
            for (let k = 0; k < filas;k++){
                console.log("Fila", k);
                $("#tablero").append("<div class='col'><div class='rectangulo p-3'>Row column</div></div>");
            }
        }
        $("#tablero").append("</div>");
    })
})