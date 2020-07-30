import { PokemonSelection } from './pokemon-selection.js';
import { PokemonService } from './pokemon-service.js';
import { PokemonBattleground } from './pokemon-battleground.js';
import { CanvasDrawings } from './canvas-drawings.js';

const bootstrap = async () => {
  const pokemonService = new PokemonService();
  const canvasDrawings = new CanvasDrawings();

  const pokemonBattleground = new PokemonBattleground(pokemonService, canvasDrawings);
  const pokemonSelection = new PokemonSelection(pokemonService, pokemonBattleground);

  await pokemonSelection.onInit();
};

bootstrap();
