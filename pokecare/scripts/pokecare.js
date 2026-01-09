import Pokemon from './pokemon.js';
import PokeAPI from './pokeapi.js';

// html elements
const playBtn = document.getElementById('play-btn');
const background = document.getElementById('transparent-background');

// choices
const choiceModal = document.getElementById('choices-modal');
const choices = document.querySelectorAll('.choices');

// name input
const inputDiv = document.getElementById('input-div');
const nameTextbox = document.getElementById('name-textbox');
const confirmNameBtn = document.getElementById('confirm-name-btn');

// game
const game = document.getElementById('game-container');
const gamePokemon = document.getElementById('game-pokemon');
const pokemonName = document.getElementById('pokemon-name');
const onScreenPoints = document.getElementById('points');

// game buttons
const gameButtons = document.querySelectorAll('.game-buttons')
const playGameButton = document.getElementById('game-play-btn');
const feedGameButton = document.getElementById('game-feed-btn');
const sleepGameButton = document.getElementById('game-sleep-btn');

// On-screen stats
const onScreenMood = document.getElementById('mood-p');
const onScreenHunger = document.getElementById('hunger-p');
const onScreenEnergy = document.getElementById('energy-p');


// variables
let pokemon = null, choice = null, name = null, cooldownTimer = null, degradeIntervalTimer;
let points = 0, pointsCounter = null;

// close buttons declarations
const closeBtns = document.querySelectorAll('.close-btn');
const closeChoices = closeBtns[0];
const closeNameInput = closeBtns[1];
const closeGame = closeBtns[2];

// reset
function reset() {
  clearInterval(degradeIntervalTimer);
  clearInterval(pointsCounter);

  // logs points
  console.log(`Points: ${points}`);
  
  points = 0;
  onScreenPoints.textContent = "Points: 0";
  gamePokemon.src = "";
  game.style.display = 'none';
  background.style.display = 'none';
  Pokemon.deleteInstance();
  pokemon = null;
  name = null;
  choice = null;
  cooldownTimer = null;
  pointsCounter = null;
  degradeIntervalTimer = null;
}

// close events
closeChoices.addEventListener('click', () => {
    background.style.display = 'none';
});

closeNameInput.addEventListener('click', () => {
    inputDiv.style.display = 'none';
    choiceModal.style.display = 'flex';
});

closeGame.addEventListener('click', () => {
    reset();
});

// randomizer
function randomizer(minimum, maximum) {
  return Math.floor(Math.random() * ((maximum - minimum) + 1)) + minimum;
}

// fetch/api
const api = new PokeAPI();

async function fetchPokemonList() {
  try {
    const reponse = await fetch("./pokemon_list.json");

    if(!reponse.ok) {
      throw new Error("Could not fetch");
    }

    const data = await reponse.json();
    return data;
  }
  catch(error) {
    console.error(error);
  }
}

// sprite in choices menu
async function setSprites() {
  const pokemonList = await fetchPokemonList()

  const spritePromises = pokemonList.map(async (pokemon, index) => {  
    const spriteUrl = await api.getSprite(pokemon.species);
    choices[index].src = spriteUrl;
  });

  await Promise.all(spritePromises);
}

// sprite in-game
async function setGameSprite(choice) {
  gamePokemon.src = await api.getSprite(choice);
}

// ===== main memu =====
// Play
playBtn.addEventListener('click', () => {
    background.style.display = 'block';
    choiceModal.style.display = 'flex';
});

function closeChoices_OpenNameInput() {
  choiceModal.style.display = "none";
  inputDiv.style.display = 'block';
}

function updateOnScreenStats() {
  onScreenMood.textContent = `Mood: ${pokemon.getMood}`;
  onScreenHunger.textContent = `Hunger: ${pokemon.getHunger}`;
  onScreenEnergy.textContent = `Energy: ${pokemon.getEnergy}`;
}

// isFainted function
function isFainted() {
  if(pokemon.isFainted) {
    console.log(`${pokemon.getName} fainted. You lose.`);
    reset();
  }
}

// stats degrader
function startStatDegrade() {
  if(!degradeIntervalTimer) {
    degradeIntervalTimer = setInterval(() => {
      pokemon.setMood(randomizer(-3, -1));
      pokemon.setHunger(randomizer(-3, -1));
      pokemon.setEnergy(randomizer(-3, -1));
      pokemon.limitCheck();
      updateOnScreenStats();

      isFainted()
    }, randomizer(1000, 2500))
  }
}

// point based on time
function startPointsCounter() {
  if(!pointsCounter) {
    pointsCounter = setInterval(() => {
      points++;
      onScreenPoints.textContent = `Points: ${points}`;
    }, 1000);
  }
};

// buttons cooldown
function buttonCooldown() {
  if (cooldownTimer) return;

  gameButtons.forEach(button => {
    button.classList.add('buttons-cooldown');
  });

  cooldownTimer = setTimeout(() => {
    gameButtons.forEach(button => {
      button.classList.remove('buttons-cooldown');
  });

  cooldownTimer = null; 
  }, 3000);
}

// buttons handler function | play(), feed(), sleep()
function gameButtonsFunction() {
  playGameButton.addEventListener('click', () => {
    buttonCooldown();
    pokemon.play();
    points += 10;

    updateOnScreenStats();
    isFainted();
  });

  feedGameButton.addEventListener('click', () => {
    buttonCooldown();
    pokemon.feed();
    points += 10;
    updateOnScreenStats();
    isFainted();
  });

  sleepGameButton.addEventListener('click', () => {
    buttonCooldown();
    pokemon.sleep();
    points += 10;
    updateOnScreenStats();
    isFainted();
  });
}

async function nameInputFunction() {
  const pokemonList = await fetchPokemonList();

  // choice
  choices[0].addEventListener('click', () => {
    choice = pokemonList[0].species;
    closeChoices_OpenNameInput();
  });

  choices[1].addEventListener('click', () => {
    choice = pokemonList[1].species;;
    closeChoices_OpenNameInput();
  });

  choices[2].addEventListener('click', () => {
    choice = pokemonList[2].species;;
    closeChoices_OpenNameInput();
  });

  // confirm button in name input
  confirmNameBtn.addEventListener('click', () => {
    // gets the input
    name = nameTextbox.value;
    // creates object based on choice and input
    if(pokemon === null) {
      if(choice === pokemonList[0].species) {
        if(name === "") name = pokemonList[0].species;
        pokemon = new Pokemon(name, pokemonList[0].species);
      }
      else if (choice === pokemonList[1].species) {
        if(name === "")  name = pokemonList[1].species;
        pokemon = new Pokemon(name, pokemonList[1].species)
      }
      else if (choice === pokemonList[2].species) {
        if(name === "")  name = pokemonList[2].species;
        pokemon = new Pokemon(name, pokemonList[2].species)
      }
      pokemonName.textContent = pokemon.getName;
      updateOnScreenStats();
    }

    nameTextbox.value = "";
    setGameSprite(choice);
    inputDiv.style.display = "none";
    game.style.display = "flex";
    startStatDegrade();
    startPointsCounter();
  });

  gameButtonsFunction();
}

setSprites();
nameInputFunction();