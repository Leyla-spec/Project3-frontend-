function linkshow(x){
    if (x.style.display === "none") {
        x.style.display = "table-column-group";
    } else {
        x.style.display = "none";
    }
}

function linkhide(x){
    if (x.style.display === "table-column-group") {
        x.style.display = "none";
    } else {
        x.style.display = "block";
    }
}
$(document).ready(function() {

let slideIndex = 1;
showSlides(slideIndex);

// Next/previous controls
function plusSlides(n) {
  showSlides(slideIndex += n);
}

// Thumbnail image controls
function currentSlide(n) {
  showSlides(slideIndex = n);
}

let swiperCMSglobalSetting = {
    speed: 400,
    spaceBetween: 100,
    autoplay: false,
    disableOnInteraction: false,
    effect: "fade",
    pagination: false,
    navigation: false,
    loop: true,
  };

function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  let dots = document.getElementsByClassName("dot");
//   var swiper = new Swiper(this, swiperCMSglobalSetting);

  if (n > slides.length) {slideIndex = 1}
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
 slides[i].style.display = "none";
//     slides[i].mouseenter = function() { swiper.autoplay.stop(); };
//     slides[i].mouseleave = function() { swiper.autoplay.start();
//   }
}
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block";
  dots[slideIndex-1].className += " active";
}

    $(`.mySlides`).mouseenter(function() {
        while (slideIndex > 1) {
            showSlides(slideIndex);
        }
    });
});