export class EventListeners {
  constructor(pokemonBattleground) {
    this.pokemonBattleground = pokemonBattleground;
  }

  onInit() {
    const cardImages = document.querySelectorAll('.pokemon-sprite > img');

    const startBattle = this.pokemonBattleground.startBattle.bind(this.pokemonBattleground);
    cardImages.forEach((b) => b.addEventListener('click', startBattle));

    const resizeCanvas = this.pokemonBattleground.setUpBattleground.bind(
      this.pokemonBattleground
    );
    window.addEventListener('resize', resizeCanvas);
  }
}
