(function($) {
  'use strict';

  $.ageGate = function(options) {

    var settings = $.extend({
      age: '21',
      cookieLength: '7',
      cookieName: 'ageGate'
    }, options);

    var ageGate = {
      m: '',
      d: '',
      y: '',
      age: '',
      remember: 0,
      errors: [],
      init: function() {
        ageGate.validateSettings();
        var cookie = ageGate.getCookie();
        if (!cookie) {
          ageGate.buildForm();
          ageGate.attach();
        }
      },
      validateSettings() {
        settings.cookieName = settings.cookieName.replace(/\W/g, '');
        settings.age = parseInt(settings.age, 10);
        settings.cookieLength = parseInt(settings.cookieLength, 10);

        settings.age = isNaN(settings.age) ? 21 : settings.age;
        settings.cookieLength = isNaN(settings.cookieLength) ? 7 : settings.cookieLength;
        console.log(settings);
      },
      buildForm: function() {
        var form = '';
        form += '<div class="agegate-wrapper">';
        form += '<div class="agegate-overlay"></div>';
        form += '<div class="agegate-form">';
        form += '<div class="title">Please verify your age:</div>';
        form += '<div class="errors"></div>';
        form += '<input type="number" name="month" id="month" placeholder="MM" maxlength="2" required="required">';
        form += '<input type="number" name="day" id="day" placeholder="DD" maxlength="2" required="required">';
        form += '<input type="number" name="year" id="year" placeholder="YYYY" maxlength="4" required="required">';
        form += '<input type="checkbox" name="remember" id="remember" /><label for="remember">Remember Me</label>';
        form += '<button class="btn">Submit</button>';
        form += '</div>';
        form += '</div>';

        $('body').append(form);
      },
      attach: function() {
        $('.agegate-form button').on('click', function() {
          ageGate.getAge();
          ageGate.clearErrors();

          if (ageGate.validateDate() === 0) {

            if (ageGate.checkAge() === true) {

              if (ageGate.remember === 'on') {
                ageGate.setCookie();
              }
              ageGate.removeGate();
            } else {
              ageGate.errors.push('I\'m sorry. you are not 21.');
              ageGate.setErrors();
            }
          } else {
            ageGate.setErrors();
          }
        });
      },
      getAge: function() {
        var month, day, year;
        month = $('.agegate-form #month').val();
        day = $('.agegate-form #day').val();
        year = $('.agegate-form #year').val();
        ageGate.remember = $('.agegate-form #remember:checked').val();

        ageGate.m = parseInt(month, 10);
        ageGate.d = parseInt(day, 10);
        ageGate.y = parseInt(year, 10);
      },
      checkAge: function() {
        var bday = new Date(ageGate.y, ageGate.m, ageGate.d);
        var diff = Date.now() - bday;
        ageGate.age = Math.floor(diff / 31536000000);

        if (ageGate.age >= settings.age) {
          return true;
        } else {
          return false;
        }
      },
      validateDate: function() {
        if (isNaN(ageGate.m) || ageGate.m < 1 || ageGate.m > 12) {
          ageGate.errors.push('Month is invalid or empty. <br />');
        }
        if (isNaN(ageGate.d) || ageGate.d < 1 || ageGate.d > 31) {
            ageGate.errors.push('Day is invalid or empty.<br />');
        }
        if (isNaN(ageGate.y) || ageGate.y < 1900 || ageGate.y > 2016) {
            ageGate.errors.push('Year is invalid or empty.<br />');
        }
        return ageGate.errors.length;
      },
      clearErrors: function() {
        ageGate.errors = [];
        $('.agegate-form .errors').html('');
      },
      setErrors: function() {
        $('.agegate-form .errors').html(ageGate.errors);
      },
      setCookie: function() {
        var name = settings.cookieName,
          value = 1,
          days = settings.cookieLength;
        var d = new Date();
        d.setTime(d.getTime() + (days * 24 * 60 * 60 * 1000));
        var expires = 'expires=' + d.toUTCString();
        document.cookie = name + '=' + value + '; ' + expires;
      },
      getCookie: function() {
        var regex = new RegExp('(?:(?:^|.*;\\s*)' + settings.cookieName + '\\s*\\=\\s*([^;]*).*$)|^.*$');
        return document.cookie.replace(regex, '$1');
      },
      removeGate: function() {
        $('.agegate-wrapper').fadeOut(1000);
        setTimeout(function() {
          $('.agegate-wrapper').html('');
        }, 1500);
      }
    };

    ageGate.init();
  };
})(jQuery);
