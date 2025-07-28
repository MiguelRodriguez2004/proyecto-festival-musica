document.addEventListener('DOMContentLoaded', function() {
    crearGaleria();
    resaltarEnlace();
    scrollNav();
    carrouselImages();
    toggleMenuButtons();
    sliderMobile();
})

function crearGaleria() {
    const total_imagenes = 24;
    const imagenes_por_slide = 8;
    const slider = document.querySelector('.galeria-slider');
    const total_slides = Math.ceil(total_imagenes / imagenes_por_slide);

    for (let s = 0; s < total_slides; s++) {
        const slide = document.createElement('div');
        slide.classList.add('slide');

        for (let i = 1 + s * imagenes_por_slide; i <= Math.min((s + 1) * imagenes_por_slide, total_imagenes); i++) {
            const imagen = document.createElement('PICTURE');
            imagen.innerHTML = `
                <source srcset="build/img/gallery/thumb/${i}.avif" type="image/avif">
                <source srcset="build/img/gallery/thumb/${i}.webp" type="image/webp">
                <img class="imagenes" loading="lazy" width="200" height="300" src="build/img/gallery/thumb/${i}.jpg" alt="imagen galeria">
            `;
            imagen.onclick = () => mostrarImagen(i);
            slide.appendChild(imagen);
        }

        slider.appendChild(slide);
    }

    // Slider funcionalidad horizontal
    let currentIndex = 0;
    const btnPrev = document.querySelector('.slider-btn.prev');
    const btnNext = document.querySelector('.slider-btn.next');

    const updateSlider = () => {
        slider.style.transform = `translateX(-${currentIndex * 100}%)`;
    };

    btnPrev.onclick = () => {
        currentIndex = (currentIndex - 1 + total_slides) % total_slides;
        updateSlider();
    };

    btnNext.onclick = () => {
        currentIndex = (currentIndex + 1) % total_slides;
        updateSlider();
    };

    // Autoplay opcional (comentado, puedes activarlo)
    // setInterval(() => {
    //     currentIndex = (currentIndex + 1) % total_slides;
    //     updateSlider();
    // }, 5000);
}

function mostrarImagen(i) {
    
    const imagen = document.createElement('PICTURE');
        imagen.innerHTML = `
        <source srcset="build/img/gallery/full/${i}.avif" type="image/avif">
        <source srcset="build/img/gallery/full/${i}.webp" type="image/webp">
        <img class="imagenes" loading="lazy" width="200" height="300" src="build/img/gallery/full/${i}.jpg" alt="imagen galeria">
        `;

    // Crear Modal
    const modal = document.createElement('div');
    modal.classList.add('modal');
    modal.onclick = cerrarModal;

    // Boton cerrar modal
    const btnCerrarModal = document.createElement('button');
    btnCerrarModal.textContent = 'X';
    btnCerrarModal.classList.add('btn-cerrar');
    btnCerrarModal.onclick = cerrarModal;

    modal.appendChild(imagen);
    modal.appendChild(btnCerrarModal);

    const body = document.querySelector('body');
    body.classList.add('overflow-hidden');
    body.appendChild(modal);
}

function cerrarModal() {
    const modal = document.querySelector('.modal');
    modal.classList.add('fade-out');

    setTimeout(() => {
        modal?.remove();

        const body = document.querySelector('body');
        body.classList.remove('overflow-hidden');
    }, 500);
}

function resaltarEnlace() {
    document.addEventListener('scroll', function() {
        const sections = document.querySelectorAll('section')
        const navLinks = document.querySelectorAll('.navegacion-principal a')

        let actual = '';
        sections.forEach( section => {
            const sectionTop = section.offsetTop
            const sectionHeight = section.clientHeight
            if(window.scrollY >= (sectionTop - sectionHeight / 3 ) ) {
                actual = section.id
            }
        })

        navLinks.forEach(link => {
            link.classList.remove('active')
            if(link.getAttribute('href') === '#' + actual) {
                link.classList.add('active')
            }
        })
    })
}

function scrollNav() {
    const navLinks = document.querySelectorAll('.nav-links')

    navLinks.forEach( link => {
        link.addEventListener('click', e => {
            e.preventDefault()
            const sectionScroll = e.target.getAttribute('href')
            const section = document.querySelector(sectionScroll)

            section.scrollIntoView({behavior: 'smooth'})
        })
    })
}

function carrouselImages() {
    const slideTrack = document.getElementById("slide-track");

    const logos = Array.from(slideTrack.children);
    logos.forEach(logo => {
        const clone = logo.cloneNode(true);
        slideTrack.appendChild(clone);
    });

    const slideWidth = logos[0].offsetWidth;
    const totalSlides = slideTrack.children.length;
    slideTrack.style.width = `${slideWidth * totalSlides}px`;
}

function toggleMenuButtons() {
    const toggleButton = document.querySelector('.toggle-button');
    const socialContainer = document.getElementById('socialButtons');
    const toggleIcon = toggleButton.querySelector('i');

    toggleButton.addEventListener('click', () => {
    socialContainer.classList.toggle('active');

    if (socialContainer.classList.contains('active')) {
        toggleIcon.classList.remove('fa-plus');
        toggleIcon.classList.add('fa-minus');
    } else {
        toggleIcon.classList.remove('fa-minus');
        toggleIcon.classList.add('fa-plus');
    }
    });
}

function openNav() {
    document.getElementById('mobile-menu').style.width = "100%"
}

function closeNav() {
    document.getElementById('mobile-menu').style.width = "0%"
}

function sliderMobile() {

    let current = 0;
    const images = document.querySelectorAll('.hero__image');

    if (window.innerWidth <= 768) {
    setInterval(() => {
        images.forEach((img, index) => {
        img.style.transform = `translateX(-${100 * current}%)`;
        });
        current = (current + 1) % images.length;
    }, 3000);
    }

}