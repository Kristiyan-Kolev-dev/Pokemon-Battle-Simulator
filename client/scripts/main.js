import { PokemonService } from './pokemon-service.js';
import { PokemonSelectionPage } from './pokemon-selection-page.js';
import { EventListeners } from './event-listeners.js';

const bootstrap = async () => {
  const pokemonService = new PokemonService();
  const eventListeners = new EventListeners();

  const pokemonSelectionPage = new PokemonSelectionPage(pokemonService);

  await pokemonSelectionPage.onInit();
  await eventListeners.onInit();
};

bootstrap();
