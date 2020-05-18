// Menu Behavior
$(document).ready(function () {
    $('.nav-button').click(function () {
        $('body').addClass('nav-open');
    });
    $('#close-icon').click(function () {
        $('body').removeClass('nav-open');
    });
});

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


// Google Map
function initMap() {
    var location = { lat: 43.643160, lng: -79.376260 };
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 16,
        center: location,
        styles: [
            {
                "featureType": "administrative",
                "elementType": "all",
                "stylers": [
                    {
                        "visibility": "on"
                    }
                ]
            },
            {
                "featureType": "administrative",
                "elementType": "geometry.stroke",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "administrative",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#747474"
                    }
                ]
            },
            {
                "featureType": "landscape",
                "elementType": "all",
                "stylers": [
                    {
                        "color": "#f2f2f2"
                    }
                ]
            },
            {
                "featureType": "landscape",
                "elementType": "geometry.fill",
                "stylers": [
                    {
                        "color": "#f9f9f9"
                    }
                ]
            },
            {
                "featureType": "landscape.natural.terrain",
                "elementType": "geometry.fill",
                "stylers": [
                    {
                        "lightness": "0"
                    }
                ]
            },
            {
                "featureType": "poi",
                "elementType": "all",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "road",
                "elementType": "all",
                "stylers": [
                    {
                        "saturation": "-100"
                    },
                    {
                        "gamma": "1.00"
                    },
                    {
                        "lightness": "41"
                    }
                ]
            },
            {
                "featureType": "road",
                "elementType": "geometry.fill",
                "stylers": [
                    {
                        "lightness": "0"
                    }
                ]
            },
            {
                "featureType": "road",
                "elementType": "geometry.stroke",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "road.highway",
                "elementType": "geometry.fill",
                "stylers": [
                    {
                        "lightness": "-7"
                    }
                ]
            },
            {
                "featureType": "road.highway",
                "elementType": "geometry.stroke",
                "stylers": [
                    {
                        "lightness": "-9"
                    },
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "road.highway",
                "elementType": "labels",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "transit",
                "elementType": "all",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "water",
                "elementType": "all",
                "stylers": [
                    {
                        "color": "#e4e4e4"
                    },
                    {
                        "visibility": "on"
                    }
                ]
            },
            {
                "featureType": "water",
                "elementType": "geometry.fill",
                "stylers": [
                    {
                        "lightness": "-3"
                    }
                ]
            }
        ]
    });

    var infoWindow = new google.maps.InfoWindow({
        content: '12 Yonge Street, Toronto, ON, Canada'
    });

    var marker = new google.maps.Marker({
        position: location,
        map: map,
        icon: 'images/map-marker.png',
        infoWindow: infoWindow
    })

    google.maps.event.addListener(marker, 'click', function () {
        infoWindow.open(map, marker);
    });
}

let contactTelInput = $("#contact-phone");

// initialize
contactTelInput.intlTelInput({
    initialCountry: 'auto',
    separateDialCode: true,
    hiddenInput: "Full Phone",
    preferredCountries: ['us', 'gb', 'br', 'ru', 'cn', 'es', 'it'],
    autoPlaceholder: 'aggressive',
    utilsScript: "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/12.1.6/js/utils.js",
    geoIpLookup: function (callback) {
        fetch('https://api.ipdata.co/?api-key=a86af3a7a4a375bfa71f9259b5404149d1eabb74adcc275e4faf9dfe', {
            cache: 'reload'
        }).then(response => {
            if (response.ok) {
                return response.json()
            }
            throw new Error('Failed: ' + response.status)
        }).then(ipjson => {
            callback(ipjson.country_code)
        }).catch(e => {
            callback('us')
        })
    }
});


$('#theModal').on('show.bs.modal', function (e) {
    var button = $(e.relatedTarget);
    var modal = $(this);
    modal.find('.modal-body').load(button.data("remote"));
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
if ($('#contact-form').length) {
    $('#contact-form').each(function(){
        $(this).validate({
            errorClass: 'error wobble-error',
            submitHandler: function(form){
                $.ajax({
                    type: "POST",
                    url:"./includes/mail-3.php",
                    data: $(form).serialize(),
                    success: function() {
                        document.querySelector('.alert-success').style.display = 'block';
                        console.log("Success");
                    },

                    error: function(){
                        document.querySelector('.alert-danger').style.display = 'block';
                        console.log("Fail");
                    }
                });
            }
        });
    });
}
