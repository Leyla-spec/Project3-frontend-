let slideIndex = 0;
const slides = document.querySelectorAll('.mySlides');
const dots = document.querySelectorAll('.dot');
const slideshowContainer = document.querySelector('.slideshow-container');
let slideInterval;

function hideSlideContent() {
    slides.forEach(slide => {
        const content = slide.querySelector('.card-container');
        if (content) content.style.opacity = '0';
        const texts = slide.querySelectorAll('.first-text, .second-text');
        texts.forEach(text => text.style.opacity = '0');
    });
}

function showSlide(index) {
    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active-dot'));

    slides[index].classList.add('active');
    dots[index].classList.add('active-dot');

    slideIndex = index;
    
    hideSlideContent();

    setTimeout(() => {
        const activeSlide = slides[index];
        const card = activeSlide.querySelector('.card-container');
        const texts = activeSlide.querySelectorAll('.first-text, .second-text');
        
        if (card) {
            card.style.opacity = '1';
        }
        if (texts) {
            texts.forEach(text => text.style.opacity = '1');
        }
    }, 1500);
}

function plusSlides(n) {
    let newIndex = slideIndex + n;
    if (newIndex >= slides.length) newIndex = 0;
    if (newIndex < 0) newIndex = slides.length - 1;
    showSlide(newIndex);
}

function currentSlide(n) {
    showSlide(n - 1);
}

function startSlideShow() {
    clearInterval(slideInterval);
    slideInterval = setInterval(() => {
        plusSlides(1);
    }, 6000);
}

function stopSlideShow() {
    clearInterval(slideInterval);
}

window.addEventListener('load', () => {
    showSlide(0);
});

slideshowContainer.addEventListener('mouseenter', startSlideShow);
slideshowContainer.addEventListener('mouseleave', stopSlideShow);

dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        currentSlide(index + 1);
    });
});


const slideContainer = document.querySelector(".slider");
const slidesFlex = document.querySelector(".slides-flex");
const navigation = document.querySelector(".navigation");

let initialX,
    finalX,
    leftPos = -100,
    slideDistance,
    interval = null,
    slidesWidth = slidesFlex.offsetWidth,
    numberOfSlides = slidesFlex.childElementCount,
    counter = 0,
    threshold = 40,
    clicked = false;

document.addEventListener("DOMContentLoaded", createInterval);

slideContainer.addEventListener("mousedown", dragStart);
slideContainer.addEventListener("touchstart", dragStart);
slideContainer.addEventListener("touchmove", dragging);
slideContainer.addEventListener("touchend", dragStop);

function moveSlide() {
    slidesFlex.style.left = `${leftPos * counter}%`;
    let radioBtn = document.getElementById("radio" + (counter + 1));
    if (radioBtn) radioBtn.checked = true;
}

function animate() {
    counter++;
    if (counter > (numberOfSlides - 1)) {
        counter = 0;
        slidesFlex.style.transition = "none";
    } else {
        slidesFlex.style.transition = "0.8s";
    }
    moveSlide();
}

function createInterval() {
    if (!interval) {
        interval = setInterval(animate, 5000);
    }
}

function dragStart(e) {
    clearInterval(interval);
    interval = null;

    if (navigation.contains(e.target)) {
        counter = e.target.id ? parseInt(e.target.id) - 1 : counter;
        slidesFlex.style.transition = "0.8s";
        moveSlide();
        createInterval();
        return;
    }

    e.preventDefault();

    slidesFlex.style.transition = "0.5s";
    slideContainer.style.cursor = "grabbing";
    document.body.style.cursor = "grabbing";

    clicked = true;

    if (e.type === "touchstart") {
        initialX = e.touches[0].clientX;
    } else {
        initialX = e.clientX;
        document.onmousemove = dragging;
        document.onmouseup = dragStop;
    }
}

function dragging(e) {
    if (!clicked) return;

    if (e.type === "touchmove") {
        finalX = e.touches[0].clientX;
    } else {
        finalX = e.clientX;
    }

    let currentPosition = counter * leftPos;
    slideDistance = ((initialX - finalX) / (slidesWidth / numberOfSlides)) * 100;

    if (Math.abs(slideDistance) < threshold) {
        slidesFlex.style.left = `${currentPosition - slideDistance}%`;
    }
}

function dragStop(e) {
    if (navigation.contains(e.target)) return;

    if (finalX < initialX && counter < (numberOfSlides - 1) && slideDistance >= threshold) {
        counter++;
    } else if (finalX > initialX && counter > 0 && -slideDistance >= threshold) {
        counter--;
    }

    moveSlide();
    createInterval();

    document.body.style.cursor = "default";
    slideContainer.style.cursor = "grab";
    initialX = undefined;
    finalX = undefined;
    clicked = false;
    document.onmousemove = null;
    document.onmouseup = null;
}
