import { battleSong, hitSound, mapPokemonDetails, randomIntegerGenerator } from './commons.js';
import { Pokemon } from './pokemon.js';

export class BattlePage {
  playerPokemon;
  opponentPokemon;

  constructor(pokemonService) {
    this.pokemonService = pokemonService;
  }

  async startBattle(event) {
    await this.generatePlayerPokemon(event.target.dataset.id);
    await this.generateOpponentPokemon();
    this.generateCanvas();
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

  generateCanvas() {
    const pokemonContainer = document.querySelector('.pokemon-container');
    pokemonContainer.innerHTML = '<canvas></canvas>';

    // const canvas = document.querySelector('canvas');
    // const context = canvas.getContext('2d');

    // context.fillStyle = 'green';
    // context.fillRect(100, 100, 35, 5);
    // context.fillRect(150, 80, 35, 5);
  }

  generateAudio() {
    battleSong.volume = 0.1;
    hitSound.volume = 0.3;
    // battleSong.play();
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
