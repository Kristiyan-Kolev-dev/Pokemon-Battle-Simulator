export class EventListeners {
  constructor(battlePage) {
    this.battlePage = battlePage;
  }

  onInit() {
    const cardButtons = document.querySelectorAll('.pokemon-selection-button');
    const startBattle = this.battlePage.startBattle.bind(this.battlePage);

    cardButtons.forEach((b) => b.addEventListener('click', startBattle));
  }
}
