export class EventListeners {
  constructor(battlePage) {
    this.battlePage = battlePage;
  }

  async onInit() {
    const cardButtons = document.querySelectorAll('.pokemon-selection-button');

    cardButtons.forEach((b) => b.addEventListener('click', this.battlePage.startBattle));
  }
}
