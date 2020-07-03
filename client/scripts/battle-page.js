import { battleSong, hitSound, mapPokemonDetails, randomIntegerGenerator } from './commons.js';
import { Pokemon } from './pokemon.js';

export class BattlePage {
  playerPokemon;
  opponentPokemon;

  constructor(pokemonService) {
    this.pokemonService = pokemonService;
  }

  async startBattle(event) {
    const pokemonContainer = document.querySelector('.pokemon-container');

    while (pokemonContainer.firstChild) {
      pokemonContainer.removeChild(pokemonContainer.firstChild);
    }

    const canvasContainer = document.querySelector('.canvas-container');
    canvasContainer.innerHTML = '<canvas></canvas>';

    await this.generatePlayerPokemon(event.target.dataset.id);
    await this.generateOpponentPokemon();
    this.renderCanvas();
    this.generateAudio();
  }

  async generatePlayerPokemon(pokemonId) {
    const pokemonDetails = await this.pokemonService.getPokemonDetails(pokemonId);
    const mappedDetails = mapPokemonDetails(pokemonDetails);

    this.playerPokemon = new Pokemon(mappedDetails);
  }

  async generateOpponentPokemon() {
    const pokemonId = randomIntegerGenerator(1, 20);

    const pokemonDetails = await this.pokemonService.getPokemonDetails(pokemonId);
    const mappedDetails = mapPokemonDetails(pokemonDetails);

    this.opponentPokemon = new Pokemon(mappedDetails);
  }

  backToSelectionPage() {}

  endBattle() {
    battleSong.pause();
    battleSong.currentTime = 0;
  }

  generateAudio() {
    battleSong.volume = 0.1;
    hitSound.volume = 0.3;
    // battleSong.play();
  }

  muteSound() {
    battleSong.muted = true;
    hitSound.muted = true;
  }

  unmuteSound() {
    battleSong.muted = false;
    hitSound.muted = false;
  }

  renderCanvas() {
    if (!document.querySelector('canvas')) {
      return;
    }
    const context = document.querySelector('canvas').getContext('2d');

    context.canvas.width = document.documentElement.clientWidth * 0.9;
    context.canvas.height = document.documentElement.clientHeight * 0.61;

    const playerCanvasTemplate = {
      x: context.canvas.width * 0.34,
      y: context.canvas.height * 0.73,
      width: context.canvas.width * 0.07 + 50,
      height: context.canvas.height * 0.17 + 50,
      speed: 5,
      dx: 0,
      dy: 0,
    };

    const opponentCanvasTemplate = {
      x: context.canvas.width * 0.49,
      y: context.canvas.height * 0.55,
      width: context.canvas.width * 0.07 + 50,
      height: context.canvas.height * 0.17 + 50,
      speed: 5,
      dx: 0,
      dy: 0,
    };

    const playerCanvasSprite = new Image();
    playerCanvasSprite.src = `${this.playerPokemon.sprites.back_default}`;
    playerCanvasSprite.onload = () =>
      context.drawImage(
        playerCanvasSprite,
        playerCanvasTemplate.x,
        playerCanvasTemplate.y,
        playerCanvasTemplate.width,
        playerCanvasTemplate.height
      );

    const opponentCanvasSprite = new Image();
    opponentCanvasSprite.src = `${this.opponentPokemon.sprites.front_default}`;
    opponentCanvasSprite.onload = () =>
      context.drawImage(
        opponentCanvasSprite,
        opponentCanvasTemplate.x,
        opponentCanvasTemplate.y,
        opponentCanvasTemplate.width,
        opponentCanvasTemplate.height
      );
  }

  playerTurn() {}

  opponentTurn() {}
}
