// SLIDER CLASS (COMPLETE)
class ImageSlider {
    constructor() {
        this.slides = document.querySelectorAll('.slide');
        this.currentSlide = 0;
        this.autoPlayInterval = null;
        this.touchStartX = 0;
        this.touchEndX = 0;
        this.init();
    }

    init() {
        // Auto-play
        this.autoPlayInterval = setInterval(() => this.nextSlide(), 5000);

        // Button controls
        document.querySelector('.prev-slide').addEventListener('click', () => this.prevSlide());
        document.querySelector('.next-slide').addEventListener('click', () => this.nextSlide());

        // Touch controls
        this.slides.forEach(slide => {
            slide.addEventListener('touchstart', e => this.handleTouchStart(e));
            slide.addEventListener('touchend', e => this.handleTouchEnd(e));
        });

        // Keyboard controls
        document.addEventListener('keydown', e => {
            if (e.key === 'ArrowRight') this.nextSlide();
            if (e.key === 'ArrowLeft') this.prevSlide();
        });
    }

    handleTouchStart(e) {
        this.touchStartX = e.changedTouches[0].screenX;
    }

    handleTouchEnd(e) {
        this.touchEndX = e.changedTouches[0].screenX;
        const diff = this.touchStartX - this.touchEndX;
        Math.abs(diff) > 50 && (diff > 0 ? this.nextSlide() : this.prevSlide());
    }

    showSlide(index) {
        this.slides.forEach((slide, i) => {
            slide.classList.toggle('active', i === index);
        });
    }

    nextSlide() {
        this.slides[this.currentSlide].classList.remove('active');
        this.currentSlide = (this.currentSlide + 1) % this.slides.length;
        this.slides[this.currentSlide].classList.add('active');
        this.resetAutoPlay();
    }

    prevSlide() {
        this.slides[this.currentSlide].classList.remove('active');
        this.currentSlide = (this.currentSlide - 1 + this.slides.length) % this.slides.length;
        this.slides[this.currentSlide].classList.add('active');
        this.resetAutoPlay();
    }

    resetAutoPlay() {
        clearInterval(this.autoPlayInterval);
        this.autoPlayInterval = setInterval(() => this.nextSlide(), 5000);
    }
}

// Initialize slider
document.addEventListener('DOMContentLoaded', () => new ImageSlider());