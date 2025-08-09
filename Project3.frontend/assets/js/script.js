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