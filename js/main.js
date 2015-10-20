$( document ).ready(function() {
    
    var cards = document.getElementsByClassName("card");
    for(i=0; i<cards.length; i++){
        console.log("lol");
        var cont = i+1;
       //cards[i].style.backgroundImage = "url('img/job0"+cont+"-sd.png')";
    }
});


function moverse(sp){
    $('html, body').animate({
            scrollTop: $("#"+sp).offset().top
        }, 2000);
}

function mostrarJOB(elemento){
    var css = elemento.className;
    if(new RegExp("wide").test(css)){
        elemento.className = "card";
        $('html, body').animate({
            scrollTop: $(elemento).offset().top
        }, 2000);
    }else{
        elemento.className = "card wide";
        $('html, body').animate({
            scrollTop: $(elemento).offset().top
        }, 2000);
    }
}

function scrollhack(e){
     if( window.pageYOffset > ($("#services").offset().top)) {
        $("#up").slideDown();
    }

  if( window.pageYOffset < ($("#services").offset().top)) {
        $("#up").slideUp();
  }
}

window.addEventListener('scroll', scrollhack, false);