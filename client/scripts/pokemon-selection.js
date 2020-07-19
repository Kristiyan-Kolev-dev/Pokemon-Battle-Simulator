import { mapPokemonDetails } from './commons.js';

export class PokemonSelection {
  constructor(pokemonServise) {
    this.pokemonServise = pokemonServise;
  }

  async onInit() {
    const { results: pokemonList } = await this.pokemonServise.getFirstFiftyPokemon();

    await this.generatePokemonCards(pokemonList);
  }

  async generatePokemonCards(pokemonList) {
    const pokemonContainer = document.querySelector('.pokemon-container');
    pokemonContainer.style.display = 'none';

    while (pokemonContainer.firstChild) {
      pokemonContainer.removeChild(pokemonContainer.firstChild);
    }

    for (const element of pokemonList) {
      const pokemonDetails = await this.pokemonServise.getPokemonDetails(element.name);

      const mappedDetails = mapPokemonDetails(pokemonDetails);

      pokemonContainer.innerHTML += this.pokemonCardBuilder(
        mappedDetails.pokemonId,
        mappedDetails.pokemonSprites,
        mappedDetails.pokemonName,
        mappedDetails.pokemonAbility,
        mappedDetails.pokemonHealthPoints,
        mappedDetails.pokemonAttack,
        mappedDetails.pokemonDefence,
        mappedDetails.pokemonSpecialAttack,
        mappedDetails.pokemonSpecialDefence,
        mappedDetails.pokemonSpeed,
        mappedDetails.pokemonMoves
      );
    }
    pokemonContainer.style.display = 'flex';
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
