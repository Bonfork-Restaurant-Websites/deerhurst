var ua = navigator.userAgent.toLowerCase();
if (ua.indexOf('safari') != -1 || ua.indexOf('firefox') != -1 || ua.indexOf('edge') != -1) {
    if (ua.indexOf('chrome') > -1) {
        console.log('chrome');
    } else {
        if (ua.match(/iPad/i) || ua.match(/iPhone/i)) {
            console.log('ios safari');
        }
        else {
            jQuery(function ($) { //on document.ready
                $('#date').datepicker({ dateFormat: 'yy-mm-dd', minDate: 0 });
            });

            $(function () {
                $('#time').timepicker().val('7:30pm');
            });
        }
    }
}