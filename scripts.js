document.addEventListener('DOMContentLoaded', () => { //Fetch inicial al cargar la página que trae desde la API una lista de pokemons con su nombre y url con información específica
  const url = "https://pokeapi.co/api/v2/pokemon/";

  fetch(url)
    .then(response => response.json())
    .then(data => {
      showPokemons(data.results);
    })
    .catch(error => {
      console.error('Error:', error);
    });

})

const container = document.getElementById("container");


function stringUpperToCase(string) {
  return string[0].toUpperCase() + string.slice(1); //Devuelve el string dado con su primer letra en Mayúsculas

}

function pokemonCard(img, name) {
  const pokemonCard = `
  <div class="card" id="custom-card">
  <img src="${img}" class="card-img-top" alt="...">
  <div class="card-body">
    <p class="card-title text-center">${stringUpperToCase(name)}</p>
  </div>
</div>
</div>
  `;

  return pokemonCard;
}

function pokemonCardReverse(hp, attack, defense, speed) {
  const pokemonCardReverse = `
  <div class="card" id="custom-card">
  <div class="card-body">
  <ul class="list-group list-group-flush">
       <li class="list-group-item"><span>Vida</span><div class="progress" role="progressbar" aria-label="Example 1px high" aria-valuenow="${hp}" aria-valuemin="0" aria-valuemax="100" style="height: 6px">
       <div class="progress-bar" style="width: ${hp}%"></div>
     </div></li>
      <li class="list-group-item"><span>Ataque</span><div class="progress" role="progressbar" aria-label="Example 1px high" aria-valuenow="${attack}" aria-valuemin="0" aria-valuemax="100" style="height: 6px">
      <div class="progress-bar" style="width: ${attack}%"></div>
    </div></li>
       <li class="list-group-item"><span>Defensa</span><div class="progress" role="progressbar" aria-label="Example 1px high" aria-valuenow="${defense}" aria-valuemin="0" aria-valuemax="100" style="height: 6px">
       <div class="progress-bar" style="width: ${defense}%"></div>
     </div></li>
      <li class="list-group-item"><span>Velocidad</span><div class="progress" role="progressbar" aria-label="Example 1px high" aria-valuenow="${speed}" aria-valuemin="0" aria-valuemax="100" style="height: 6px">
      <div class="progress-bar" style="width: ${speed}%"></div>
    </div></li>
 </ul> 
  </div>
</div>
  `;
  return pokemonCardReverse;
}

function showPokemons(array) {
  let pokemons = [];
  array.forEach(element => {

    let urlPokemon = element.url
    fetch(urlPokemon)
      .then(response => response.json())
      .then(data => {

        const hp = data.stats[0].base_stat;
        const attack = data.stats[1].base_stat;
        const defense = data.stats[2].base_stat;
        const speed = data.stats[5].base_stat;
        const name = data.name;
        const img = data.sprites.front_default;

        const pokemonDiv = document.createElement("div");
        pokemonDiv.classList.add('col');

        pokemonDiv.innerHTML += pokemonCard(img, name);
        pokemons.push(pokemonDiv);

        if (pokemons.length % 5 === 0) {  //Luego de crear la pokemonCard, si la lista pokemons ya tiene 5 tarjetas, crea una nueva fila 
          divRow = document.createElement("div");
          divRow.classList.add('row');
          for (let item of pokemons) { //bucle que agrega una por una las pokemonCards en pokemons a la fila
            divRow.appendChild(item);
          }
          pokemons = []; // reset de la lista pokemons
          container.appendChild(divRow);
        }
        let cardToggle = true;

        pokemonDiv.addEventListener('click', () => {
          if (cardToggle) {
            pokemonDiv.innerHTML = ' ';
            pokemonDiv.innerHTML += pokemonCardReverse(hp, attack, defense, speed);
            cardToggle = false;
          } else {
            pokemonDiv.innerHTML = ' ';
            pokemonDiv.innerHTML += pokemonCard(img, name);
            cardToggle = true;
          }

        });
      })
  })
};


