export class EventListeners {
  constructor(pokemonBattleground) {
    this.pokemonBattleground = pokemonBattleground;
  }

  onInit() {
    const cardImages = document.querySelectorAll('.pokemon-sprite > img');

    const startBattleCallback = this.pokemonBattleground.startBattle.bind(
      this.pokemonBattleground
    );
    cardImages.forEach((b) => b.addEventListener('click', startBattleCallback));

    const resizeCanvasCallback = this.pokemonBattleground.setUpBattleground.bind(
      this.pokemonBattleground
    );
    window.addEventListener('resize', resizeCanvasCallback);
  }
}
