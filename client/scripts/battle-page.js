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
  }
}
