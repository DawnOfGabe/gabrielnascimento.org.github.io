document.addEventListener('DOMContentLoaded', () => {
    // Force scroll to top on load for mobile
    if (window.innerWidth <= 900) {
        window.scrollTo(0, 0);
    }

    const items = document.querySelectorAll('.accordion-item');

    items.forEach(item => {
        item.addEventListener('click', () => {
            // Se o item já estiver ativo, não faz nada
            if (item.classList.contains('active')) return;

            // Remove a classe ativa de todos os itens
            items.forEach(i => i.classList.remove('active'));

            // Adiciona a classe ativa ao item clicado
            item.classList.add('active');

            // Mobile: Scroll to top of the activated tab
            if (window.innerWidth <= 900) {
                setTimeout(() => {
                    item.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }, 300); // 300ms delay to allow transition
            }

            // Refresh PDF iframe if Curriculum tab is activated
            if (item.id === 'tab-curriculum') {
                const iframe = item.querySelector('iframe');
                if (iframe) {
                    // Force completely fresh load for Safari
                    setTimeout(() => {
                        const currentSrc = iframe.src.split('?')[0].split('#')[0];
                        const date = new Date();
                        iframe.src = `${currentSrc}?t=${date.getTime()}#view=FitH&scrollbar=0&toolbar=0&navpanes=0`;
                    }, 850);
                }
            }
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


    // --- Global Certificate Preview Logic (Solves Z-Index/Overflow Issues) ---
    const globalPreview = document.getElementById('global-cert-preview');

    if (globalPreview && window.innerWidth > 900) {
        document.querySelectorAll('.cert-item').forEach(item => {
            item.addEventListener('mouseenter', () => {
                const localPreviewImg = item.querySelector('.cert-preview img');
                if (localPreviewImg) {
                    globalPreview.innerHTML = '';
                    const imgClone = localPreviewImg.cloneNode(true);
                    globalPreview.appendChild(imgClone);
                    globalPreview.style.display = 'block';
                    // Optional: Add fade-in animation class here if desired
                }
            });

            item.addEventListener('mouseleave', () => {
                globalPreview.style.display = 'none';
                globalPreview.innerHTML = '';
            });
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



// --- Mobile Project Card Expansion Logic ---
document.addEventListener('DOMContentLoaded', () => {
    const projectCards = document.querySelectorAll('.project-card');

    projectCards.forEach(card => {
        card.addEventListener('click', (e) => {
            // Check if we are on mobile (CSS media query checks width < 900px, 
            // but for JS strictly strictly speaking we can just toggle the class 
            // and let CSS handle the visual change)
            if (window.innerWidth > 900) return;

            // Prevent triggering when clicking carousel buttons which have their own logic
            if (e.target.closest('.carousel-btn') || e.target.closest('.dot')) {
                return;
            }

            const isExpanded = card.classList.contains('mobile-expanded');

            // Close all others
            document.querySelectorAll('.project-card.mobile-expanded').forEach(c => {
                c.classList.remove('mobile-expanded');
            });

            // Toggle current
            if (!isExpanded) {
                card.classList.add('mobile-expanded');
            }
        });
    });
});
