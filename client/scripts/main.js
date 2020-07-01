import { PokemonSelectionPage } from './pokemon-selection-page.js';
import { PokemonService } from './pokemon-service.js';
import { EventListeners } from './event-listeners.js';
import { BattlePage } from './battle-page.js';

const bootstrap = async () => {
  const pokemonService = new PokemonService();

  const pokemonSelectionPage = new PokemonSelectionPage(pokemonService);
  const battlePage = new BattlePage(pokemonService);

  const eventListeners = new EventListeners(battlePage);

  await pokemonSelectionPage.onInit();
  eventListeners.onInit();
};

bootstrap();
