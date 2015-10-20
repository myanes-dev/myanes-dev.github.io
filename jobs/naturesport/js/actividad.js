function mostrarOferta(elemento){
    var css = elemento.className;
    if(new RegExp("big").test(css)){
        elemento.className = "ofertas-item";
        var contenido = elemento.childNodes;
        contenido = contenido[5];
        $(contenido).fadeOut(800);
        $('html, body').animate({
            scrollTop: $(elemento).offset().top
        }, 2000);
    }else{
        elemento.className = "ofertas-item big";
        var contenido = elemento.childNodes;
        contenido = contenido[5];
        $(contenido).fadeIn(800);
        $('html, body').animate({
            scrollTop: $(elemento).offset().top
        }, 2000);
    }
    
}