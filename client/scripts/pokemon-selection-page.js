import { mapPokemonDetails, pokemonCardBuilder } from './commons.js';

export class PokemonSelectionPage {
  constructor(pokemonServise) {
    this.pokemonServise = pokemonServise;
  }

  async onInit() {
    const { results: pokemonList } = await this.pokemonServise.getFirstTwentyPokemon();

    await this.generatePokemonCards(pokemonList);
  }

  async generatePokemonCards(pokemonList) {
    const pokemonContainer = document.querySelector('.pokemon-container');

    while (pokemonContainer.firstChild) {
      pokemonContainer.removeChild(pokemonContainer.firstChild);
    }

    for (const element of pokemonList) {
      const pokemonDetails = await this.pokemonServise.getPokemonDetails(element.name);

      const mappedDetails = mapPokemonDetails(pokemonDetails);

      pokemonContainer.innerHTML += pokemonCardBuilder(
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
  }
}
