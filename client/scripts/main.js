import { PokemonService } from './pokemon-service.js';
import { GameLogic } from './game-logic.js';
import { Events } from './events.js';

const bootstrap = async () => {
  const pokeService = new PokemonService();
  const pokeEvents = new Events();

  const gameLogic = new GameLogic(pokeService, pokeEvents);

  gameLogic.onInit();
};

bootstrap();
