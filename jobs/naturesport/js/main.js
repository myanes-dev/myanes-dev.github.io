
$( window ).load(function() {
        var width = (window.innerWidth > 0) ? window.innerWidth : screen.width;
        if(width > 500){

            $(window).stellar({
                horizontalScrolling: false
              });
        }
    
        var $body = $(document);
        $body.bind('scroll', function() {
            // "Disable" the horizontal scroll.
            if ($body.scrollLeft() !== 0) {
                $body.scrollLeft(0);
            }
        });

        $(".loader-container").fadeOut();
        $('body').removeClass('noscroll');
    });

function moverse(sp){
    $('html, body').animate({
            scrollTop: $("#"+sp).offset().top - 50
        }, 2000);
}


