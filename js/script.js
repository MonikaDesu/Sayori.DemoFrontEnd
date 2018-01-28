$(function() {
    setTimeout(function() {
        $('.loading').css({opacity: '0'});
        setTimeout(function() {
            $('.loading').css({display: 'none'});
        }, 750);
    }, 1000);
});