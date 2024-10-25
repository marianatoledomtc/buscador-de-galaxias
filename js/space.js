const btnBuscar = document.getElementById('btnBuscar');
const inputBuscar = document.getElementById('inputBuscar');
const contenedor = document.getElementById('contenedor');

btnBuscar.addEventListener('click', () => {

    const query = inputBuscar.value.trim();


    if (query === "") {
        alert("Ingresa un término de búsqueda.");
        return;
    }


    contenedor.innerHTML = '';

    const url = `https://images-api.nasa.gov/search?q=${encodeURIComponent(query)}`;

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Error en la solicitud: ' + response.status);
            }
            return response.json();
        })
        .then(data => {
            const { items } = data.collection || { items: [] }; 
            if (!Array.isArray(items) || items.length === 0) {
                contenedor.innerHTML = "<p>No se encontraron resultados para esta búsqueda.</p>";
                return;
            }
        
            showCards(items);
        })
        
        .catch(error => {
            console.error('Hubo un problema con la solicitud:', error);
            contenedor.innerHTML = "<p>Error al obtener resultados. Inténtalo de nuevo más tarde.</p>";
        });
});

function showCards(items) {
    items.forEach(item => {
        const { title = "Sin título", description = "Sin descripción" } = item.data[0];
        const imageUrl = item.links?.[0]?.href;

        if (imageUrl) {
            const card = document.createElement('div');
            card.classList.add('card', 'm-2');
            card.style.width = '18rem';

            card.innerHTML = `
                <div>
                    <img src="${imageUrl}" class="card-img-top border-0" alt="${title}">
                    <div class="card-body">
                        <h5 class="card-title">${title}</h5>
                        <p class="card-text">${description}</p>
                    </div>
                </div>
            `;
            contenedor.appendChild(card);
        }
    });
}