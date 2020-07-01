import { battleSong, hitSound, mapPokemonDetails, randomIntegerGenerator } from './commons.js';
import { Pokemon } from './pokemon.js';

export class BattlePage {
  playerPokemon;
  opponentPokemon;

  constructor(pokemonService) {
    this.pokemonService = pokemonService;
  }

  async startBattle(event) {
    const body = document.querySelector('body');
    body.style.backgroundImage = "url('./assets/images/battle-page-background.jpg')";

    const pokemonContainer = document.querySelector('.pokemon-container');

    while (pokemonContainer.firstChild) {
      pokemonContainer.removeChild(pokemonContainer.firstChild);
    }

    await this.generatePlayerPokemon(event.target.dataset.id);
    await this.generateOpponentPokemon();
    this.generateAudio();
  }

  async generatePlayerPokemon(pokemonId) {
    const pokemonDetails = await this.pokemonService.getPokemonDetails(pokemonId);
    const mappedDetails = mapPokemonDetails(pokemonDetails);

    this.playerPokemon = new Pokemon(mappedDetails);
  }

  async generateOpponentPokemon() {
    const pokemonId = randomIntegerGenerator(1, 20);

    const pokemonDetails = await this.pokemonService.getPokemonDetails(pokemonId);
    const mappedDetails = mapPokemonDetails(pokemonDetails);

    this.opponentPokemon = new Pokemon(mappedDetails);
  }

  generateAudio() {
    battleSong.volume = 0.1;
    hitSound.volume = 0.3;
    battleSong.play();
  }

  endBattle() {
    battleSong.pause();
    battleSong.currentTime = 0;
  }

  backToSelectionPage() {}

  muteSound() {
    battleSong.muted = true;
    hitSound.muted = true;
  }

  unmuteSound() {
    battleSong.muted = false;
    hitSound.muted = false;
  }
}
