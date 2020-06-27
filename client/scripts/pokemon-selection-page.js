import { capitalizeWord, pokemonCardBuilder } from './commons.js';

export class PokemonSelectionPage {
  constructor(pokeServise) {
    this.pokeServise = pokeServise;
  }

  async onInit() {
    const { results: pokemonList } = await this.pokeServise.getFirstTwentyPokemon();
    const pokemonContainer = document.querySelector('.pokemon-container');

    pokemonList.forEach(async (p) => {
      const pokemonDetails = await this.pokeServise.getPokemonDetails(p.name);

      const pokemonId = pokemonDetails.id;
      const pokemonSprite = pokemonDetails.sprites.front_default;
      const pokemonName = capitalizeWord(pokemonDetails.name);

      const {
        ability: { name: pokemonAbility },
      } = pokemonDetails.abilities.find((a) => !a.is_hidden);

      const [
        { base_stat: pokemonHP },
        { base_stat: pokemonAttack },
        { base_stat: pokemonDefense },
        { base_stat: pokemonSpAttack },
        { base_stat: pokemonSpDefense },
        { base_stat: pokemonSpeed },
      ] = pokemonDetails.stats;

      const [
        {
          move: { name: pokemonMoveOne },
        },
        {
          move: { name: pokemonMoveTwo },
        },
        {
          move: { name: pokemonMoveThree },
        },
        {
          move: { name: pokemonMoveFour },
        },
      ] = pokemonDetails.moves;

      pokemonContainer.insertAdjacentHTML(
        'beforeend',
        pokemonCardBuilder(
          pokemonId,
          pokemonSprite,
          pokemonName,
          pokemonAbility,
          pokemonHP,
          pokemonAttack,
          pokemonDefense,
          pokemonSpAttack,
          pokemonSpDefense,
          pokemonSpeed,
          pokemonMoveOne,
          pokemonMoveTwo,
          pokemonMoveThree,
          pokemonMoveFour
        )
      );
    });
  }
}
