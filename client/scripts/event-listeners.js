export class EventListeners {
  constructor(battlePage) {
    this.battlePage = battlePage;
  }

  onInit() {
    const cardImages = document.querySelectorAll('.pokemon-sprite > img');
    const startBattle = this.battlePage.startBattle.bind(this.battlePage);
    cardImages.forEach((b) => b.addEventListener('click', startBattle));

    const resizeCanvas = this.battlePage.setUpBattleground.bind(this.battlePage);
    window.addEventListener('resize', resizeCanvas);
  }
}
