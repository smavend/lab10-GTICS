const cont = $("#cont");
const contenedor = $("#contenedor")

const img1 = "<div class='col-3 me-3' class='";
const img2 = "'><div class='alert alert-dismissible fade show col-2' role='alert'>" +
    "<img src='../imagenes/";
const img3= "' alt='imagen'>" +
    "<button type='button' class='btn-close' data-bs-dismiss='alert' aria-label='Close'>" +
    "</button>" +
    "</div>" +
    "</div>"

$("#botonAgregar").click(function () {
    $("#inputFoto").trigger('click');
})

$("#inputFoto").change(function (event) {
    let archivo = event.target.files[0].name;
    let extension = archivo.split('.').pop();
    if (extension === "png" && cont.text()<16) {
        console.log(extension);
        contenedor.append(img1+cont.text()+img2+archivo+img3);
        cont.text(+cont.text()+1);
    } else {
        console.log("Ocurrió un error :p");
    }
})