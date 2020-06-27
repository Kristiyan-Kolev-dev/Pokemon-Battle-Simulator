import { baseURL } from './commons.js';

export class PokemonService {
  async getFirstTwentyPokemon() {
    const response = await fetch(`${baseURL}/pokemon`);
    const pokemon = await response.json();

    return pokemon;
  }

  async getPokemonDetails(pokemonName) {
    const response = await fetch(`${baseURL}/pokemon/${pokemonName}`);
    const details = await response.json();

    return details;
  }
}
