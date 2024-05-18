document.getElementById('fetch-pokemon').addEventListener('click', async () => {
    const pokemonId = document.getElementById('pokemon-id').value;
    const pokemonContainer = document.getElementById('pokemon-container');
    const errorMessage = document.getElementById('error-message');

    pokemonContainer.innerHTML = '';
    errorMessage.innerHTML = '';

    if (!pokemonId) {
        errorMessage.textContent = 'Ingresa el Pokemon ID.';
        return;
    }

    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`);
        if (!response.ok) {
            throw new Error('No se encontro al pokemon');
        }
        const pokemon = await response.json();

        const pokemonCard = document.createElement('div');
        pokemonCard.classList.add('pokemon-card');

        pokemonCard.innerHTML = `
            <h2>${pokemon.name}</h2>
            <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}">
            <p>Type: ${pokemon.types.map(typeInfo => typeInfo.type.name).join(', ')}</p>
            <p>Height: ${pokemon.height / 10} m</p>
            <p>Weight: ${pokemon.weight / 10} kg</p>
        `;

        pokemonContainer.appendChild(pokemonCard);
    } catch (error) {
        errorMessage.textContent = error.message;
    }
});
