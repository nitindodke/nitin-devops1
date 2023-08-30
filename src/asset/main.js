 // Typed Initiate
 if ($('.home-section .typeWriter h2').length == 1) {
     var typed_strings = $('.home-section .typeWriter .typed-text').text();
     var typed = new Typed('.home-section .typeWriter h2', {
         strings: typed_strings.split(', '),
         typeSpeed: 100,
         backSpeed: 20,
         smartBackspace: false,
         loop: true
     });
 }