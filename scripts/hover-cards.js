
document.addEventListener('DOMContentLoaded', () => {
    const menuItems = document.querySelectorAll('.menu-item');
    let activeCard = null;

    function positionCard(card, item) {
        const itemRect = item.getBoundingClientRect();
        const viewportHeight = window.innerHeight;
        const spaceBelow = viewportHeight - itemRect.bottom;

        if (spaceBelow < 300) {
            card.style.bottom = 'auto';
            card.style.top = `${-itemRect.height - 20}px`;
        } else {
            card.style.top = 'auto';
            card.style.bottom = '-20px';
        }
    }

    function activateCard(item) {
        const card = item.querySelector('.hover-card');
        if (!card) return;

        if (activeCard) activeCard.classList.remove('active');
        card.classList.add('active');
        activeCard = card;
        positionCard(card, item);
    }

    menuItems.forEach(item => {
        const card = item.querySelector('.hover-card');

        item.addEventListener('mouseenter', () => {
            if (window.matchMedia("(hover: hover)").matches) {
                activateCard(item);
            }
        });

        item.addEventListener('click', (e) => {
            if (!window.matchMedia("(hover: hover)").matches) {
                e.preventDefault();
                activateCard(item);
            }
        });

        window.addEventListener('resize', () => positionCard(card, item));
        new ResizeObserver(() => positionCard(card, item)).observe(item);
    });

    document.addEventListener('click', (e) => {
        if (!e.target.closest('.menu-item')) {
            if (activeCard) activeCard.classList.remove('active');
            activeCard = null;
        }
    });

    window.addEventListener('scroll', () => {
        if (activeCard) {
            positionCard(activeCard, activeCard.parentElement);
        }
    }, true);
});
