import { baseURL } from './commons.js';

export class PokemonService {
  async getFirstTwentyPokemon() {
    const response = await fetch(`${baseURL}/pokemon`);
    const pokemon = await response.json();

    return pokemon;
  }
}
