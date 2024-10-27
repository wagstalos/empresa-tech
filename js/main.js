AOS.init();

$(".js-tilt").tilt({
  glare: true,
  maxGlare: 0.5,
  scale: 1.2,
});

$(document).ready(function () {
  $(".menu-mobile").on("click", function () {
    $(".links-mobile").toggleClass("show");
  });
});
