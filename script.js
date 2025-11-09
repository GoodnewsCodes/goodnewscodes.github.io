document.getElementById("current-year").innerHTML = new Date().getFullYear();

window.addEventListener('load', function() {
    setTimeout(function() {
        const loader = document.querySelector('.loader');
        if (loader) {
            loader.style.opacity = '0';
            document.body.classList.remove('loading');
            setTimeout(function() {
                loader.remove();
            }, 500);
        }
    }, 1000);
});


document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        window.scrollTo({
            top: targetElement.offsetTop - 80,
            behavior: 'smooth'
        });
        
        // Update URL without reloading
        history.pushState(null, null, targetId);
    });
});

try {
    document.addEventListener('DOMContentLoaded', function() {
        const carousel = document.querySelector('.carousel-inner');
        const items = document.querySelectorAll('.carousel-item');
        const indicators = document.querySelectorAll('.indicator');
        const prevBtn = document.querySelector('.prev');
        const nextBtn = document.querySelector('.next');
        
        let currentIndex = 0;
        let intervalId;
        const intervalTime = 3000;
        let isAnimating = false;
        const animationDuration = 600;

        function updateCarousel() {
            if (isAnimating) return;
            isAnimating = true;
            
            items.forEach((item, index) => {
                item.classList.toggle('active', index === currentIndex);
            });
            
            carousel.style.transform = `translateX(-${currentIndex * 100}%)`;
            
            indicators.forEach((indicator, index) => {
                indicator.classList.toggle('active', index === currentIndex);
            });
            
            setTimeout(() => {
                isAnimating = false;
            }, animationDuration);
        }

        function nextSlide() {
            currentIndex = (currentIndex + 1) % items.length;
            updateCarousel();
        }

        function prevSlide() {
            currentIndex = (currentIndex - 1 + items.length) % items.length;
            updateCarousel();
        }

        function goToSlide(index) {
            currentIndex = index;
            updateCarousel();
        }

        function startAutoSlide() {
            clearInterval(intervalId);
            intervalId = setInterval(() => {
                if (!isAnimating) nextSlide();
            }, intervalTime);
        }

        nextBtn.addEventListener('click', () => {
            nextSlide();
            startAutoSlide();
        });

        prevBtn.addEventListener('click', () => {
            prevSlide();
            startAutoSlide();
        });

        indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => {
                goToSlide(index);
                startAutoSlide();
            });
        });

        let touchStartX = 0;
        let touchEndX = 0;
        
        carousel.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        }, {passive: true});

        carousel.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        }, {passive: true});

        function handleSwipe() {
            const difference = touchStartX - touchEndX;
            if (difference > 50) {
                nextSlide();
            } else if (difference < -50) {
                prevSlide();
            }
            startAutoSlide();
        }

        carousel.addEventListener('mouseenter', () => {
            clearInterval(intervalId);
        });

        carousel.addEventListener('mouseleave', startAutoSlide);

        updateCarousel();
        startAutoSlide();
        
        window.addEventListener('resize', () => {
            carousel.style.transition = 'none';
            carousel.style.transform = `translateX(-${currentIndex * 100}%)`;
            setTimeout(() => {
                carousel.style.transition = 'transform 0.6s cubic-bezier(0.645, 0.045, 0.355, 1)';
            }, 10);
        });
    });
} catch (error) {
    console.error('Carousel initialization failed:', error);
}

const backToTopButton = document.createElement('a');
backToTopButton.href = '#home';
backToTopButton.className = 'back-to-top';
backToTopButton.innerHTML = '<i class="fas fa-arrow-up"></i>';
document.body.appendChild(backToTopButton);

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        backToTopButton.classList.add('visible');
    } else {
        backToTopButton.classList.remove('visible');
    }
});