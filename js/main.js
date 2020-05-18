// Menu Behavior
$(document).ready(function () {
    $('.nav-button').click(function () {
        $('body').addClass('nav-open');
    });
    $('#close-icon').click(function () {
        $('body').removeClass('nav-open');
    });
});

// WOW Init
new WOW().init();

// Opening Hours
$(document).ready(function () {
    function tConvert(time) {
        time = time.toString().match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];
        if (time.length > 1) {
            time = time.slice(1);
            time[5] = +time[0] < 12 ? 'AM' : 'PM';
            time[0] = +time[0] % 12 || 12;
        }
        return time.join('');
    }

    var data = JSON.parse($('#data').html());

    var today = new Date();

    var weekday = new Array(7);
    weekday[0] = "Sunday";
    weekday[1] = "Monday";
    weekday[2] = "Tuesday";
    weekday[3] = "Wednesday";
    weekday[4] = "Thursday";
    weekday[5] = "Friday";
    weekday[6] = "Saturday";

    data.openingHoursSpecification.map(openingsItem => {
        document.getElementById('schedule').innerHTML = `${openingsItem.dayOfWeek[0].substring(0, 3)} to ${openingsItem.dayOfWeek[6].substring(0, 3)} ${tConvert(openingsItem.opens)} to ${tConvert(openingsItem.closes)}`;
    });
});
// Newsletter Steps Form
var theForm = document.getElementById("newsletter-form");

new stepsForm(theForm, {
  onSubmit: function (form) {
    // hide form
    classie.addClass(theForm.querySelector(".simform-inner"), "hide");

    /*
      form.submit()
      or
      AJAX request (maybe show loading indicator while we don't have an answer..)
      */
    // Override the submit event

    // let's just simulate something...
    var messageEl = theForm.querySelector(".final-message");

    // SEND EMAIL
    $.ajax({
      type: "POST",
      url:"./includes/mail-2.php",
      data: $(form).serialize(),
      success: function() {
        messageEl.innerHTML = "Thank you! We'll be in touch.";
        classie.addClass(messageEl, "show");
      },
      error: function(){
        messageEl.innerHTML = "Something went wrong.";
        classie.addClass(messageEl, "show");
      }
    });
  },
});
$('#theModal').on('show.bs.modal', function (e) {
    var button = $(e.relatedTarget);
    var modal = $(this);
    modal.find('.modal-body').load(button.data("remote"));
});