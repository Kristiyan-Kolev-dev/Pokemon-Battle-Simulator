import { mapPokemonDetails } from './commons.js';

export class PokemonSelection {
  constructor(pokemonServise, pokemonBattleground) {
    this.pokemonServise = pokemonServise;
    this.pokemonBattleground = pokemonBattleground;
    this.pokemonListOffset = 0;
  }

  async onInit() {
    const { results: pokemonList } = await this.pokemonServise.getPokemonList(
      50,
      this.pokemonListOffset
    );

    const pokemonDetails = await this.pokemonServise.getMultiplePokemonDetails(pokemonList);
    await this.generatePokemonCards(pokemonDetails);

    this.pokemonListOffset += pokemonList.length;
  }

  async generatePokemonCards(pokemonDetails) {
    const pokemonContainer = document.querySelector('.pokemon-container');
    pokemonContainer.style.display = 'none';

    const spinner = document.querySelector('.spinner');

    const mappedDetails = pokemonDetails.map((details) => mapPokemonDetails(details));

    const pokemonCards = mappedDetails.reduce(
      (pokemonCards, pokemonDetails) =>
        pokemonCards +
        this.pokemonCardBuilder(
          pokemonDetails.pokemonId,
          pokemonDetails.pokemonSprites,
          pokemonDetails.pokemonName,
          pokemonDetails.pokemonAbility,
          pokemonDetails.pokemonHealthPoints,
          pokemonDetails.pokemonAttack,
          pokemonDetails.pokemonDefence,
          pokemonDetails.pokemonSpecialAttack,
          pokemonDetails.pokemonSpecialDefence,
          pokemonDetails.pokemonSpeed,
          pokemonDetails.pokemonMoves
        ),
      ''
    );

    pokemonContainer.innerHTML += pokemonCards;
    this.addStartBattleListeners();

    spinner.style.display = 'none';
    pokemonContainer.style.display = 'flex';
  }

  addStartBattleListeners() {
    const cardImages = document.querySelectorAll('.pokemon-sprite > img');

    const startBattleCallback = this.pokemonBattleground.startBattle.bind(
      this.pokemonBattleground
    );

    cardImages.forEach((b) => b.addEventListener('click', startBattleCallback));
  }

  pokemonCardBuilder = (
    pokemonId,
    pokemonSprites,
    pokemonName,
    pokemonAbility,
    pokemonHealthPoints,
    pokemonAttack,
    pokemonDefence,
    pokemonSpecialAttack,
    pokemonSpecialDefence,
    pokemonSpeed,
    pokemonMoves
  ) => {
    return `
  <div class="pokemon-card">
    <div class="pokemon-identity">
      <div class="pokemon-name">
        <h1>${pokemonName}</h1>
      </div>
  
      <div class="pokemon-sprite">
        <img data-id="${pokemonId}" src="${pokemonSprites.front_default}" alt="Pokemon Sprite">
      </div>
    </div>
  
    <div class="pokemon-stats">
      <p>Health Points: ${pokemonHealthPoints}</p>
      <p>Attack: ${pokemonAttack}</p>
      <p>Defense: ${pokemonDefence}</p>
      <p>Special Attack: ${pokemonSpecialAttack}</p>
      <p>Special Defense: ${pokemonSpecialDefence}</p>
      <p>Speed: ${pokemonSpeed}</p>
    </div>
  
    <div class="pokemon-skills">
      <div class="pokemon-ability">
        <p>Ability: ${pokemonAbility}</p>
      </div>
  
      <div class="pokemon-moves">
        <p>Move 1: ${pokemonMoves.moveOne}</p>
        <p>Move 2: ${pokemonMoves.moveTwo}</p>
        <p>Move 3: ${pokemonMoves.moveThree}</p>
        <p>Move 4: ${pokemonMoves.moveFour}</p>
      </div>
    </div>
  </div>
    `;
  };
}
