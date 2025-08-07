function linkshow(x){
    if (x.style.display === "none") {
        x.style.display = "table-column-group";
    } else {
        x.style.display = "none";
    }
}

function linkhide(x){
    if (x.style.display === "table-column-group") {
        x.style.display = "none";
    } else {
        x.style.display = "block";
    }
}