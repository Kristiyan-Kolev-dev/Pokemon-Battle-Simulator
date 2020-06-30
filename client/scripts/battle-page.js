import { battleSong, hitSound } from './commons.js';

export class BattlePage {
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

    this.generateAudio();
    this.generatePlayerPokemon();
    this.generateOpponentPokemon();
  }

  async generateAudio() {
    battleSong.volume = 0.1;
    hitSound.volume = 0.3;
    battleSong.play();
  }

  async generatePlayerPokemon() {}

  async generateOpponentPokemon() {}

  async endBattle() {
    battleSong.pause();
    battleSong.currentTime = 0;
  }

  async backToSelectionPage() {}

  async muteSound() {
    battleSong.muted = true;
    hitSound.muted = true;
  }

  async unmuteSound() {
    battleSong.muted = false;
    hitSound.muted = false;
  }
}
