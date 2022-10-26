$(document).ready(function () {


    $('#mainSlider').owlCarousel({

        animateOut: 'fadeOut',

        items: 1,

        loop: true,

        autoplay: true,

        autoplayHoverPause: true,

        dots: false,

    });


    $('.branCarousel').owlCarousel({

        margin: 0,

        nav: false,

        loop: false,

        responsive: {

            0: {

                items: 2,

            },

            600: {

                items: 3,

            },

            900: {

                items: 4,

            },

            1000: {

                items: 5,

            },

            1024: {

                items: 6,

            },

            1200: {

                items: 11,

            }

        }

    });


    $('#accessoriesSec').owlCarousel({

        items: 12,

        margin: 0,

        nav: false,

        loop: false,

        dots: true,

        pagination: true,

        autoplayHoverPause: true,

        stagePadding: 0,

        responsive: {

            0: {

                items: 2,

            },

            600: {

                items: 3,

            },

            900: {

                items: 5,

            },

            1000: {

                items: 6,

            },

            1024: {

                items: 8,

            },

            1200: {

                items: 12,

            }

        }

    });

    $("#demoTab").easyResponsiveTabs({

        type: 'default',
    
        width: 'auto',
    
        fit: true,
    
        closed: false,
    
        tabidentify: 'brandTabs',
    
        activetab_bg: '#e4e4e4',
    
        inactive_bg: '#fff',
    
        active_border_color: '#e4e4e4'
    
    });

});



$(document).ready(function () {

    // SearchText();

    // GetFacebookPixel();

});

var ua = navigator.userAgent.toLowerCase();

var isAndroid = ua.indexOf("android") > -1; //&& ua.indexOf("mobile");

if (isAndroid) {

    $("#IsAndroid").show();

}



if ($(window).width() > 991) {

    $('ul.nav li.dropdown').hover(function () {

        $(this).find('.dropdown-menu').stop(true, true).delay(100).fadeIn(200);

    }, function () {

        $(this).find('.dropdown-menu').stop(true, true).delay(100).fadeOut(200);

    });

}

else {

    $(".dropList > a").attr("data-toggle", "dropdown");

    $(".dropList > a").attr("aria-expanded", "true");

    $(".dropList > a").addClass("class", "dropdown-toggle");


}

function toggleSearch() {

    $(".topSearchBar").slideToggle();

    $("#txtProductName").focus();

}


function removeSpecialCharacter(string) {

    return string.replace(/[^a-zA-Z\._:0-9]/g, " ");

    //return string.replace(/[^a-z0-9\s]/gi, '').replace(/[_\s]/g, '');

}

$(function() {

    'use strict';
  
    $('.js-menu-toggle').click(function(e) {
  
        var $this = $(this);
  
        
  
        if ( $('body').hasClass('show-sidebar') ) {
            $('body').removeClass('show-sidebar');
            $this.removeClass('active');
        } else {
            $('body').addClass('show-sidebar');	
            $this.addClass('active');
        }
  
        e.preventDefault();
  
    });
  
    // click outisde offcanvas
      $(document).mouseup(function(e) {
      var container = $(".sidebarlogin");
      if (!container.is(e.target) && container.has(e.target).length === 0) {
        if ( $('body').hasClass('show-sidebar') ) {
                  $('body').removeClass('show-sidebar');
                  $('body').find('.js-menu-toggle').removeClass('active');
              }
      }
      }); 
  
      
  
  });
