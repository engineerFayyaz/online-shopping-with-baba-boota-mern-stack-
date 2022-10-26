$(document).ready(function () {
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
})