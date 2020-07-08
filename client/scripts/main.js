import { PokemonSelection } from './pokemon-selection.js';
import { PokemonService } from './pokemon-service.js';
import { EventListeners } from './event-listeners.js';
import { PokemonBattleground } from './pokemon-battleground.js';

const bootstrap = async () => {
  const pokemonService = new PokemonService();

  const pokemonSelection = new PokemonSelection(pokemonService);
  const pokemonBattleground = new PokemonBattleground(pokemonService);

  const eventListeners = new EventListeners(pokemonBattleground);

  await pokemonSelection.onInit();
  eventListeners.onInit();
};

bootstrap();
