document.addEventListener('DOMContentLoaded', () => {
    const items = document.querySelectorAll('.accordion-item');

    items.forEach(item => {
        item.addEventListener('click', () => {
            // Se o item já estiver ativo, não faz nada
            if (item.classList.contains('active')) return;

            // Remove a classe ativa de todos os itens
            items.forEach(i => i.classList.remove('active'));

            // Adiciona a classe ativa ao item clicado
            item.classList.add('active');
        });
    });

    // --- Modal Logic ---
    const modal = document.getElementById('bio-modal');
    const openBtn = document.getElementById('read-more-btn');
    const closeBtn = document.getElementById('modal-close');

    if (openBtn && modal) {
        openBtn.addEventListener('click', () => {
            modal.classList.add('open');
        });
    }

    if (closeBtn && modal) {
        closeBtn.addEventListener('click', () => {
            modal.classList.remove('open');
        });
    }

    // Close on click outside
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('open');
            }
        });
    }

    // --- Certificate Modal Logic ---
    const certModal = document.getElementById('cert-modal');
    const certCloseBtn = document.getElementById('cert-modal-close');
    const certItems = document.querySelectorAll('.cert-item');
    const certContainer = document.getElementById('cert-pdf-container');

    certItems.forEach(item => {
        item.addEventListener('click', () => {
            const preview = item.querySelector('.cert-preview');
            if (preview && certModal && certContainer) {
                // Clone the embed/object to put in modal
                certContainer.innerHTML = preview.innerHTML;
                certModal.classList.add('open');
            }
        });
    });

    if (certCloseBtn && certModal) {
        certCloseBtn.addEventListener('click', () => {
            certModal.classList.remove('open');
            // Clear content to stop playing or rendering
            if (certContainer) certContainer.innerHTML = '';
        });
    }

    // Close on click outside for cert modal
    if (certModal) {
        certModal.addEventListener('click', (e) => {
            if (e.target === certModal) {
                certModal.classList.remove('open');
                if (certContainer) certContainer.innerHTML = '';
            }
        });
    }
});

// --- Carousel Logic ---
const carousels = {};

function initCarousels() {
    // Collect all carousels
    document.querySelectorAll('.carousel').forEach(c => {
        carousels[c.id] = {
            currentSlide: 0,
            slides: c.querySelectorAll('.carousel-slides img'),
            dots: c.querySelectorAll('.dot')
        };
    });
}

function showSlide(carouselId, index) {
    const c = carousels[carouselId];
    if (!c) return;
    
    // Wrap around logic
    if (index >= c.slides.length) index = 0;
    if (index < 0) index = c.slides.length - 1;
    
    // Update State
    c.currentSlide = index;
    
    // Update DOM
    c.slides.forEach((slide, i) => {
        slide.classList.toggle('active', i === index);
    });
    
    c.dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === index);
    });
}

function moveCarousel(carouselId, step, event) {
    if (event) event.stopPropagation();
    const c = carousels[carouselId];
    if (c) {
        showSlide(carouselId, c.currentSlide + step);
    }
}

function setSlide(carouselId, index, event) {
    if (event) event.stopPropagation();
    showSlide(carouselId, index);
}

// Initialize on load
document.addEventListener('DOMContentLoaded', initCarousels);

// --- Thank You Modal Logic ---

function showThankYouModal() {
    const modal = document.getElementById('thank-you-modal');
    if (modal) {
        modal.classList.add('active'); // Show modal
        
        // Auto close after 10 seconds
        setTimeout(() => {
            closeThankYouModal();
        }, 10000);
    }
}

function closeThankYouModal() {
    const modal = document.getElementById('thank-you-modal');
    if (modal) {
        modal.classList.remove('active');
    }
}
