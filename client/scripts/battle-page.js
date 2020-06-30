export class BattlePage {
  constructor(pokemonService, battleSong, hitSound) {
    this.pokemonService = pokemonService;
    this.battleSong = battleSong;
    this.hitSound = hitSound;
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
    this.battleSong.volume = 0.1;
    this.hitSound.volume = 0.3;
    this.battleSong.play();
  }

  async generatePlayerPokemon() {}

  async generateOpponentPokemon() {}

  async endBattle() {
    this.battleSong.pause();
    this.battleSong.currentTime = 0;
  }

  async backToSelectionPage() {}

  async muteSound() {
    this.battleSong.muted = true;
    this.hitSound.muted = true;
  }

  async unmuteSound() {
    this.battleSong.muted = false;
    this.hitSound.muted = false;
  }
}
