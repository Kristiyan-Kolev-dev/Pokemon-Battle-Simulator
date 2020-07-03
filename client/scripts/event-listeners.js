export class EventListeners {
  constructor(battlePage) {
    this.battlePage = battlePage;
  }

  onInit() {
    const cardImages = document.querySelectorAll('.pokemon-sprite > img');
    const startBattle = this.battlePage.startBattle.bind(this.battlePage);
    cardImages.forEach((b) => b.addEventListener('click', startBattle));

    const renderCanvas = this.battlePage.renderCanvas.bind(this.battlePage);
    window.addEventListener('resize', renderCanvas);
  }
}
