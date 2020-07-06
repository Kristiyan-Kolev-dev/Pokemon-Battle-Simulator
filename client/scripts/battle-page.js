import { battleSong, hitSound, mapPokemonDetails, randomIntegerGenerator } from './commons.js';
import { Pokemon } from './pokemon.js';

export class BattlePage {
  playerCanvasTemplate;
  opponentCanvasTemplate;
  playerPokemon;
  opponentPokemon;
  context;

  constructor(pokemonService) {
    this.pokemonService = pokemonService;
  }

  async startBattle(event) {
    await this.generatePlayerPokemon(event.target.dataset.id);
    await this.generateOpponentPokemon();
    this.generateCanvas();
    this.setUpBattleground();
    this.generateAudio();

    setTimeout(() => {
      if (this.playerPokemon.speed > this.opponentPokemon.speed) {
        this.playerTurn();
      } else if (this.playerPokemon.speed < this.opponentPokemon.speed) {
        this.opponentTurn();
      } else {
        const speedTieResolver = randomIntegerGenerator(1, 2);
        speedTieResolver === 1 ? this.playerTurn() : this.opponentTurn();
      }
    }, 2500);
  }

  async generatePlayerPokemon(pokemonId) {
    const pokemonDetails = await this.pokemonService.getPokemonDetails(pokemonId);
    const mappedDetails = mapPokemonDetails(pokemonDetails);

    this.playerPokemon = new Pokemon(mappedDetails);
  }

  async generateOpponentPokemon() {
    const pokemonId = randomIntegerGenerator(1, 50);

    const pokemonDetails = await this.pokemonService.getPokemonDetails(pokemonId);
    const mappedDetails = mapPokemonDetails(pokemonDetails);

    this.opponentPokemon = new Pokemon(mappedDetails);
  }

  generateCanvas() {
    const pokemonContainer = document.querySelector('.pokemon-container');

    while (pokemonContainer.firstChild) {
      pokemonContainer.removeChild(pokemonContainer.firstChild);
    }

    const canvasContainer = document.querySelector('.canvas-container');
    canvasContainer.innerHTML = '<canvas></canvas>';
    this.context = document.querySelector('canvas').getContext('2d');
  }

  setUpBattleground() {
    if (!document.querySelector('canvas')) {
      return;
    }
    const context = this.context;

    context.canvas.width = document.documentElement.clientWidth * 0.9;
    context.canvas.height = document.documentElement.clientHeight * 0.61;

    const playerCanvasTemplate = {
      x: context.canvas.width * 0.34,
      y: context.canvas.height * 0.73,
      width: context.canvas.width * 0.07 + 50,
      height: context.canvas.height * 0.17 + 50,
      dx: 5,
      dy: 2.5,
      sprite: undefined,
    };
    this.playerCanvasTemplate = playerCanvasTemplate;

    const opponentCanvasTemplate = {
      x: context.canvas.width * 0.49,
      y: context.canvas.height * 0.55,
      width: context.canvas.width * 0.07 + 50,
      height: context.canvas.height * 0.17 + 50,
      dx: 5,
      dy: 2.5,
      sprite: undefined,
    };
    this.opponentCanvasTemplate = opponentCanvasTemplate;

    const playerCanvasSprite = new Image();
    playerCanvasSprite.src = `${this.playerPokemon.sprites.back_default}`;
    playerCanvasTemplate.sprite = playerCanvasSprite;

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
    opponentCanvasTemplate.sprite = opponentCanvasSprite;

    opponentCanvasSprite.onload = () =>
      context.drawImage(
        opponentCanvasSprite,
        opponentCanvasTemplate.x,
        opponentCanvasTemplate.y,
        opponentCanvasTemplate.width,
        opponentCanvasTemplate.height
      );
  }

  playerTurn() {
    const context = this.context;
    const playerSprite = { ...this.playerCanvasTemplate };
    const opponentSprite = { ...this.opponentCanvasTemplate };

    const drawSprites = () => {
      context.drawImage(
        playerSprite.sprite,
        playerSprite.x,
        playerSprite.y,
        playerSprite.width,
        playerSprite.height
      );

      context.drawImage(
        opponentSprite.sprite,
        opponentSprite.x,
        opponentSprite.y,
        opponentSprite.width,
        opponentSprite.height
      );
    };

    const moveForward = () => {
      context.clearRect(0, 0, context.canvas.width, context.canvas.height);

      drawSprites();

      playerSprite.x += playerSprite.dx;
      playerSprite.y -= playerSprite.dy;

      if (
        playerSprite.x > opponentSprite.x - opponentSprite.height * 0.5 &&
        playerSprite.y < opponentSprite.y + opponentSprite.width * 0.5
      ) {
        attack();
      } else {
        requestAnimationFrame(moveForward);
      }
    };

    const attack = () => {
      this.playerPokemon.normalAttack(this.opponentPokemon);
      hitSound.play();

      setTimeout(() => {
        moveBackward();
      }, 2000);
    };

    const moveBackward = () => {
      context.clearRect(0, 0, context.canvas.width, context.canvas.height);

      drawSprites();

      playerSprite.x -= playerSprite.dx;
      playerSprite.y += playerSprite.dy;

      if (
        playerSprite.x < this.playerCanvasTemplate.x &&
        playerSprite.y > this.playerCanvasTemplate.y
      ) {
        setTimeout(() => {
          this.opponentPokemon.healthPoints <= 0
            ? this.endBattle(context)
            : this.opponentTurn();
        }, 1000);
      } else {
        requestAnimationFrame(moveBackward);
      }
    };

    // Starts the turn.
    moveForward();
  }

  opponentTurn() {
    const context = this.context;
    const playerSprite = { ...this.playerCanvasTemplate };
    const opponentSprite = { ...this.opponentCanvasTemplate };

    const drawSprites = () => {
      context.drawImage(
        playerSprite.sprite,
        playerSprite.x,
        playerSprite.y,
        playerSprite.width,
        playerSprite.height
      );

      context.drawImage(
        opponentSprite.sprite,
        opponentSprite.x,
        opponentSprite.y,
        opponentSprite.width,
        opponentSprite.height
      );
    };

    const moveForward = () => {
      context.clearRect(0, 0, context.canvas.width, context.canvas.height);

      drawSprites();

      opponentSprite.x -= opponentSprite.dx;
      opponentSprite.y += opponentSprite.dy;

      if (
        opponentSprite.x < playerSprite.x + playerSprite.height * 0.5 &&
        opponentSprite.y > playerSprite.y - playerSprite.width * 0.5
      ) {
        attack();
      } else {
        requestAnimationFrame(moveForward);
      }
    };

    const attack = () => {
      this.opponentPokemon.normalAttack(this.playerPokemon);
      hitSound.play();

      setTimeout(() => {
        moveBackward();
      }, 2000);
    };

    const moveBackward = () => {
      context.clearRect(0, 0, context.canvas.width, context.canvas.height);

      drawSprites();

      opponentSprite.x += opponentSprite.dx;
      opponentSprite.y -= opponentSprite.dy;

      if (
        opponentSprite.x > this.opponentCanvasTemplate.x &&
        opponentSprite.y < this.opponentCanvasTemplate.y
      ) {
        setTimeout(() => {
          this.playerPokemon.healthPoints <= 0 ? this.endBattle(context) : this.playerTurn();
        }, 1000);
      } else {
        requestAnimationFrame(moveBackward);
      }
    };

    // Starts the turn.
    moveForward();
  }

  endBattle(context) {
    context.clearRect(0, 0, context.canvas.width, context.canvas.height);
    battleSong.pause();
    battleSong.currentTime = 0;
  }

  generateAudio() {
    battleSong.volume = 0.1;
    hitSound.volume = 0.3;
    battleSong.play();
  }

  muteSound() {
    battleSong.muted = true;
    hitSound.muted = true;
  }

  unmuteSound() {
    battleSong.muted = false;
    hitSound.muted = false;
  }
}
