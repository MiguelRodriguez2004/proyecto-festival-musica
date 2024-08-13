document.addEventListener('DOMContentLoaded', function() {
    crearGaleria();
})

function crearGaleria() {
    const cantidad_imagenes = 16
    const galeria = document.querySelector('.galeria-imagenes');

    for (let i = 1; i <= cantidad_imagenes; i++) {
        const imagen = document.createElement('img');
        imagen.src = `src/img/gallery/full/${i}.jpg`;

        //Event Handler
        imagen.onclick = function() {
            mostrarImagen(i);
        }
        
        galeria.appendChild(imagen);
    }
}

function mostrarImagen(i) {
    
    const imagen = document.createElement('img');
    imagen.src = `src/img/gallery/full/${i}.jpg`;
    imagen.alt = 'Imagen Galeria';

    // Crear Modal
    const modal = document.createElement('div');
    modal.classList.add('modal');
    modal.onclick = cerrarModal

    modal.appendChild(imagen);

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