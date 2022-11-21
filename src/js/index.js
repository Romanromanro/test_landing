import '../scss/app.scss';

import intlTelInput from 'intl-tel-input';
import 'jquery-validation'

const input = document.querySelector("#phone");
intlTelInput(input, {
    utilsScript: 'https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.13/js/utils.min.js',
    nationalMode: true,
    defaultCountry: 'auto',
    separateDialCode: true,
    initialCountry: "auto",
    geoIpLookup: function (callback) {
        $.getJSON('https://api.ipgeolocation.io/ipgeo?apiKey=8b89ec03c3214360aa2696a3cad1e0f7&ip=', function (data) {
        }).always(function (resp) {
           const countryCode = (resp && resp.country_code2) ? resp.country_code2 : "us";
            callback(countryCode);
        });
    }
});

function randomInteger(min, max) {
    let rand = min - 0.5 + Math.random() * (max - min + 1);
    return Math.round(rand);
}

let people = window.localStorage.getItem('people') ? window.localStorage.getItem('people') : 234;
let spots = window.localStorage.getItem('people') ? window.localStorage.getItem('people') : 19;

function setCount() {
    people = randomInteger(200, 300)
    window.localStorage.setItem('people', 235)
    $('.tooltip-left .num').text(people)
    spots = randomInteger(10, 30)
    window.localStorage.setItem('spots', 14)
    $('.tooltip-right .num').text(spots)
}

    $.validator.addMethod("phoneRegex", function (value, element) {
        return this.optional(element) || /^(\d[- ]?){7,11}$/.test(value);
    }, "Phone must contain between 7 and 11 characters without special characters");

const form = $("#form")
const form_modal = $('#form_modal')
const bindValidate = (form) => {
    form.validate({
        onfocusout: function (element) {
            this.element(element);
            $(element).valid()
        },
        onkeyup: function (element) {
            $(element).valid()
            $('[name="' + element.name + '"]').val(element.value);

        },

        rules: {
            first_name: {
                required: true,
                usernameRegex: true,
                minlength: 2,
                maxlength: 60,
            },
            last_name: {
                required: true,
                lastusernameRegex: true,
                minlength: 2,
                maxlength: 60,
            },

            email: {
                required: true,
                email: true,

            },
            phone: {
                phoneRegex: true,
                required: true,
            }
        },
        messages: {
            first_name: {
                required: "Enter your name",
                minlength: "The name must be at least 2 characters long",
                maxlength: "The name can be up to 25 characters long",
            },
            last_name: {
                required: "Please enter your last name",
                minlength: "Last name must be at least 2 characters long",
                maxlength: "Last name can contain up to 25 characters",
            },

            email: {
                required: "Enter your email",
                email: "Email address must be valid",
            },
            phone: {
                required: "Enter the phone",
            },

        },
        submitHandler: function (form1) {
            form1.submit();
        }
    });
}

bindValidate(form)
bindValidate(form_modal)

const close = $('.modal-body .close')
let modal = false

close.on('click', () => {
    $( ".modal" ).hide()
    modal = false
    start()
})

setCount()

setInterval(() => {

    setCount()
}, 6000)

function start() {
    const intervalModal = setInterval(() => {
      if(!modal) {
          $( ".modal" ).fadeIn("slow")
    }
    modal = true
    clearInterval(intervalModal)
}, 12000)
}

start()
