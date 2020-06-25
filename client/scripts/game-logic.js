export class GameLogic {
  constructor(pokeServise, pokeEvents) {
    this.pokeServise = pokeServise;
    this.pokeEvents = pokeEvents;
  }

  async onInit() {
    const pokemon = await this.pokeServise.getFirstTwentyPokemon();
    console.log(pokemon);
  }
}
