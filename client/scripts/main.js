import { PokemonSelection } from './pokemon-selection.js';
import { PokemonService } from './pokemon-service.js';
import { EventListeners } from './event-listeners.js';
import { PokemonBattleground } from './pokemon-battleground.js';
import { CanvasDrawings } from './canvas-drawings.js';

const bootstrap = async () => {
  const pokemonService = new PokemonService();
  const canvasDrawings = new CanvasDrawings();

  const pokemonSelection = new PokemonSelection(pokemonService);
  const pokemonBattleground = new PokemonBattleground(pokemonService, canvasDrawings);

  const eventListeners = new EventListeners(pokemonBattleground);

  await pokemonSelection.onInit();
  eventListeners.onInit();
};

bootstrap();
