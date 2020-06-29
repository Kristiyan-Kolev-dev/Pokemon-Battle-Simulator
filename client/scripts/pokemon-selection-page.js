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

      const details = mapPokemonDetails(pokemonDetails);

      pokemonContainer.innerHTML += pokemonCardBuilder(
        details.pokemonId,
        details.pokemonSprite,
        details.pokemonName,
        details.pokemonAbility,
        details.pokemonHP,
        details.pokemonAttack,
        details.pokemonDefense,
        details.pokemonSpAttack,
        details.pokemonSpDefense,
        details.pokemonSpeed,
        details.pokemonMoveOne,
        details.pokemonMoveTwo,
        details.pokemonMoveThree,
        details.pokemonMoveFour
      );
    }
  }
}
