// REVIEW SYSTEM (COMPLETE)
class ReviewSystem {
    constructor() {
        this.reviews = document.querySelectorAll('.review-card');
        this.currentReview = 0;
        this.init();
    }

    init() {
        // Position profile pictures
        this.reviews.forEach(review => {
            const img = review.querySelector('.review-pic');
            img.style.position = 'absolute';
            img.style.top = '15px';
            img.style.left = '15px';
            img.style.width = '60px';
            img.style.height = '60px';
            img.style.border = '3px solid #FF6B35';
            img.style.borderRadius = '50%';
        });

        // Auto-cycle reviews
        setInterval(() => this.nextReview(), 8000);
    }

    nextReview() {
        this.reviews[this.currentReview].classList.remove('active');
        this.currentReview = (this.currentReview + 1) % this.reviews.length;
        this.reviews[this.currentReview].classList.add('active');
    }
}

// Initialize reviews
document.addEventListener('DOMContentLoaded', () => new ReviewSystem());
