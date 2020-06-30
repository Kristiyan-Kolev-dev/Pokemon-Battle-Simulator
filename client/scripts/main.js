import { PokemonSelectionPage } from './pokemon-selection-page.js';
import { PokemonService } from './pokemon-service.js';
import { EventListeners } from './event-listeners.js';
import { BattlePage } from './battle-page.js';

const bootstrap = async () => {
  const battleSong = new Audio('./assets/audio/battle.mp3');
  const hitSound = new Audio('./assets/audio/hit.wav');

  const pokemonService = new PokemonService();

  const pokemonSelectionPage = new PokemonSelectionPage(pokemonService);
  const battlePage = new BattlePage(pokemonService, battleSong, hitSound);

  const eventListeners = new EventListeners(battlePage);

  await pokemonSelectionPage.onInit();
  await eventListeners.onInit();
};

bootstrap();
