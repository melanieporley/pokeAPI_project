const urlInitial = "https://pokeapi.co/api/v2/pokemon";
const container = document.getElementById("container");
const searchInput = document.getElementById('input');
const searchBtn = document.getElementById('search');
const cleanBtn = document.getElementById('clean');
const nextBtn = document.getElementById('nextBtn');
const prevBtn = document.getElementById('prevBtn');
const pikachuLoading = document.getElementById('pikachuLoading');
let nextPage = "";
let prevPage = "";

function stringUpperToCase(string) {
  return string[0].toUpperCase() + string.slice(1); //Devuelve el string dado con su primer letra en Mayúsculas

};

function pokemonCard(img, name) {
  const pokemonCard = `
  <div class="card" id="custom-card">
  <img src="${img}" class="card-img-top" alt="...">
  <div class="card-body">
    <p class="card-title text-center fw-bolder" style= "font-family: retro_game_font";>${stringUpperToCase(name)}</p>
  </div>
</div>
</div>
  `;

  return pokemonCard;
};

function pokemonCardReverse(hp, attack, defense, speed) {
  const pokemonCardReverse = `
  <div class="card d-flex p-4" id="reverseCard">
  <div class="card-body" id="bkgrd">
       <div><small class"fs-6" style= "font-family: retro_game_font">Vida</small><div class="progress" role="progressbar" aria-label="Example 1px high" aria-valuenow="${hp}" aria-valuemin="0" aria-valuemax="100" style="height: 6px">
       <div class="progress-bar" style="width: ${hp}%"></div>
     </div></div>
      <div><small class"fs-6" style= "font-family: retro_game_font">Ataque</small><div class="progress" role="progressbar" aria-label="Example 1px high" aria-valuenow="${attack}" aria-valuemin="0" aria-valuemax="100" style="height: 6px">
      <div class="progress-bar" style="width: ${attack}%"></div>
    </div></div>
       <div><small class"fs-6" style= "font-family: retro_game_font">Defensa</small><div class="progress" role="progressbar" aria-label="Example 1px high" aria-valuenow="${defense}" aria-valuemin="0" aria-valuemax="100" style="height: 6px">
       <div class="progress-bar" style="width: ${defense}%"></div>
     </div></div>
      <div><small class"fs-6" style= "font-family: retro_game_font">Velocidad</small><div class="progress" role="progressbar" aria-label="Example 1px high" aria-valuenow="${speed}" aria-valuemin="0" aria-valuemax="100" style="height: 6px">
      <div class="progress-bar" style="width: ${speed}%"></div>
    </div></div>
    <div class="text-center p-4"><img style="width: 1.5rem;" src="https://cdn-icons-png.flaticon.com/512/287/287221.png"></div>
 </div> 
</div>
  `;

  return pokemonCardReverse;
};

function showPokemons(array) {
  container.innerHTML = '';
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
        pokemonDiv.classList.add('col', 'd-flex', 'justify-content-center');

        pokemonDiv.innerHTML += pokemonCard(img, name);
        pokemons.push(pokemonDiv);

        if (pokemons.length % 4 === 0) {  // Luego de crear la pokemonCard, si la lista pokemons ya tiene 5 tarjetas, crea una nueva fila 
          divRow = document.createElement("div");
          divRow.classList.add('row');
          for (let item of pokemons) { // bucle que agrega una por una las pokemonCards en pokemons a la fila
            divRow.appendChild(item);
          }
          pokemons = []; // reset de la lista pokemons
          container.appendChild(divRow);
        }
        let cardToggle = true; // verificador de click para el evento

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

function getUrls(next, prev) { // Obtiene las url de la siguiente y anterior página respecto la que actualemnte se muestra 
  nextPage = next;
  prevPage = prev;
  return next, prev;
};

function fetchingData(url) {
  fetch(url)
    .then(response => response.json())
    .then(data => {
      const results = data.results;
      getUrls(data.next, data.previous);
      showPokemons(results);
    })
    .catch(error => {
      console.error('Error:', error);
    });
};

function clearBorder() { // funcion para sacar el estilo de borde rojo puesto por errorAlert
  searchInput.style.border = 'none';
  searchInput.style.borderColor = 'none';
};

document.addEventListener('DOMContentLoaded', () => {
  clearBorder();
  fetchingData(urlInitial);
});

prevBtn.addEventListener('click', () => {
  if (prevPage) {
    clearBorder();
    fetchingData(prevPage);
  }
});

nextBtn.addEventListener('click', () => {
  if (nextPage) {
    clearBorder();
    fetchingData(nextPage);
  }
});

function pikachuShow() {
  pikachuLoading.style.display = 'block';
};

function hidePikachu() {
  pikachuLoading.style.display = 'none';
};

function errorAlert() {
  const errorMenssage = document.createElement('div');
  errorMenssage.classList.add('container');
  const menssage = `
  <div class="d-flex justify-content-center text-center">
  <p>No se encontraron coincidencias. Verifica que el nombre este correctamente escrito.</p>
  </div>
  `
  errorMenssage.innerHTML += menssage;
  container.appendChild(errorMenssage);
  searchInput.style.border = '5px solid';
  searchInput.style.borderColor = 'red';


};

searchBtn.addEventListener('click', () => {
  pikachuShow();
  clearBorder();
  container.innerHTML = ' ';

  const pokemonName = searchInput.value.toLowerCase();

  fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
    .then(response => {
      hidePikachu();

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
      return response.json();
    })
    .then(data => {

      const hp = data.stats[0].base_stat;
      const attack = data.stats[1].base_stat;
      const defense = data.stats[2].base_stat;
      const speed = data.stats[5].base_stat;
      const name = data.name;
      const img = data.sprites.front_default;

      const pokemonDiv = document.createElement("div");

      pokemonDiv.innerHTML += pokemonCard(img, name);

      let cardToggle = true;

      pokemonDiv.addEventListener('click', () => {
        if (cardToggle) {
          pokemonDiv.innerHTML = '';
          pokemonDiv.innerHTML += pokemonCardReverse(hp, attack, defense, speed);
          cardToggle = false;
        } else {
          pokemonDiv.innerHTML = '';
          pokemonDiv.innerHTML += pokemonCard(img, name);
          cardToggle = true;
        }

      });
      pokemonDiv.classList.add('justify-content-center', 'd-flex');
      container.appendChild(pokemonDiv);
    })
    .catch(error => {
      console.error('Error:', error);
      hidePikachu();
      errorAlert();
    });
});

cleanBtn.addEventListener('click', () => {
  container.innerHTML = '';
  searchInput.value = '';
  fetchingData(urlInitial);
  clearBorder();
});

