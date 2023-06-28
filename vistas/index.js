const cont = $("#cont");
const contenedor = $("#contenedor")

const img1 = "<div class='col-3 me-3' class='elemento' id='";
const img2 = "'><div class='alert alert-dismissible fade show col-2' role='alert'>" +
    "<img src='../imagenes/";
const img3= "' alt='imagen'>" +
    "<button id='quitar";

const img4 = "' type='button' onclick='quitar()' class='btn-close' data-bs-dismiss='alert' aria-label='Close'></button></div></div>";

$("#botonAgregar").click(function () {
    $("#inputFoto").trigger('click');
})

$("body").on("change", "#inputFoto", function (event){
    let archivo = event.target.files[0].name;
    let extension = archivo.split('.').pop();
    if (extension === "png" && cont.text()<16) {
        contenedor.append(img1+cont.text()+img2+archivo+img3+cont.text()+img4);
        cont.text(+cont.text()+1);
    } else {
        console.log("Ocurrió un error :p");
    }
})

function quitar (){
    let idTotal = $(event.target).attr("id");
    let id = idTotal.substring(6);
    $("#"+id).remove();
    if (+cont.text() > 0){
        cont.text(+cont.text()-1);
    }
}