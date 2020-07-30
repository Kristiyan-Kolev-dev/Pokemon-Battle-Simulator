import { baseURL } from './commons.js';

export class PokemonService {
  async getTwentyPokemon(offset) {
    try {
      const response = await fetch(`${baseURL}/pokemon?limit=20&offset=${offset}`);
      const pokemon = await response.json();

      return pokemon;
    } catch (error) {
      console.error(error);
    }
  }

  async getFiftyPokemon(offset) {
    try {
      const response = await fetch(`${baseURL}/pokemon?limit=50&offset=${offset}`);
      const pokemon = await response.json();

      return pokemon;
    } catch (error) {
      console.error(error);
    }
  }

  async getSinglePokemonDetails(pokemonNameOrId) {
    try {
      const response = await fetch(`${baseURL}/pokemon/${pokemonNameOrId}`);
      const details = await response.json();

      return details;
    } catch (error) {
      console.error(error);
    }
  }

  async getMultiplePokemonDetails(pokemonList) {
    try {
      const details = await Promise.all(
        pokemonList.map((pokemon) => fetch(pokemon.url).then((response) => response.json()))
      );

      return details;
    } catch (error) {
      console.error(error);
    }
  }
}
