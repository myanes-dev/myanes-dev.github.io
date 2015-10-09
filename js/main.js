function moverse(sp){
    $('html, body').animate({
            scrollTop: $("#"+sp).offset().top
        }, 2000);
}

function mostrarJOB(elemento){
    var css = elemento.className;
    if(new RegExp("wide").test(css)){
        elemento.className = "card";
        /*var contenido = elemento.childNodes;
        contenido = contenido[5];
        $(contenido).fadeOut(800);*/
        $('html, body').animate({
            scrollTop: $(elemento).offset().top
        }, 2000);
    }else{
        elemento.className = "card wide";
        /*var contenido = elemento.childNodes;
        contenido = contenido[5];
        $(contenido).fadeIn(800);*/
        $('html, body').animate({
            scrollTop: $(elemento).offset().top
        }, 2000);
    }
}