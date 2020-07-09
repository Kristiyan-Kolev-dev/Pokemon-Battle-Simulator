import { baseURL } from './commons.js';

export class PokemonService {
  async getFirstTwentyPokemon() {
    const response = await fetch(`${baseURL}/pokemon`);
    const pokemon = await response.json();

    return pokemon;
  }

  async getFirstFiftyPokemon() {
    const response = await fetch(`${baseURL}/pokemon?limit=50&offset=0`);
    const pokemon = await response.json();

    return pokemon;
  }

  async getPokemonDetails(pokemonNameOrId) {
    const response = await fetch(`${baseURL}/pokemon/${pokemonNameOrId}`);
    const details = await response.json();

    return details;
  }
}
