import { battleSong, hitSound, mapPokemonDetails, randomIntegerGenerator } from './commons.js';
import { Pokemon } from './pokemon.js';

export class PokemonBattleground {
  playerCanvasTemplate;
  opponentCanvasTemplate;
  playerPokemon;
  opponentPokemon;
  context;

  constructor(pokemonService, canvasDrawings) {
    this.pokemonService = pokemonService;
    this.canvasDrawings = canvasDrawings;
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
    pokemonContainer.style.display = 'none';

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
      dx: 6,
      dy: 3,
      sprite: undefined,
    };
    this.playerCanvasTemplate = playerCanvasTemplate;

    const opponentCanvasTemplate = {
      x: context.canvas.width * 0.49,
      y: context.canvas.height * 0.55,
      width: context.canvas.width * 0.07 + 50,
      height: context.canvas.height * 0.17 + 50,
      dx: 6,
      dy: 3,
      sprite: undefined,
    };
    this.opponentCanvasTemplate = opponentCanvasTemplate;

    const playerCanvasSprite = new Image();
    playerCanvasSprite.src = `${this.playerPokemon.sprites.back_default}`;
    playerCanvasTemplate.sprite = playerCanvasSprite;

    playerCanvasSprite.onload = () => {
      this.canvasDrawings.drawPokemonSprite(context, playerCanvasTemplate);
      this.canvasDrawings.drawHealthBar(context, playerCanvasTemplate, this.playerPokemon);
      this.canvasDrawings.drawPokemonName(context, playerCanvasTemplate, this.playerPokemon);
    };

    const opponentCanvasSprite = new Image();
    opponentCanvasSprite.src = `${this.opponentPokemon.sprites.front_default}`;
    opponentCanvasTemplate.sprite = opponentCanvasSprite;

    opponentCanvasSprite.onload = () => {
      this.canvasDrawings.drawPokemonSprite(context, opponentCanvasTemplate);
      this.canvasDrawings.drawHealthBar(context, opponentCanvasTemplate, this.opponentPokemon);
      this.canvasDrawings.drawPokemonName(
        context,
        opponentCanvasTemplate,
        this.opponentPokemon
      );
    };
  }

  playerTurn() {
    const context = this.context;
    const playerSprite = { ...this.playerCanvasTemplate };
    const opponentSprite = { ...this.opponentCanvasTemplate };

    const drawPlayer = () => {
      this.canvasDrawings.drawPokemonSprite(context, playerSprite);
    };

    const drawOpponent = () => {
      this.canvasDrawings.drawPokemonSprite(context, opponentSprite);

      this.canvasDrawings.drawHealthBar(
        context,
        this.opponentCanvasTemplate,
        this.opponentPokemon
      );
    };

    const moveForward = () => {
      context.clearRect(0, 0, context.canvas.width, context.canvas.height);

      drawPlayer();
      drawOpponent();

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

      context.clearRect(0, 0, context.canvas.width, context.canvas.height);

      drawPlayer();
      drawOpponent();

      setTimeout(() => {
        moveBackward();
      }, 1000);
    };

    const moveBackward = () => {
      context.clearRect(0, 0, context.canvas.width, context.canvas.height);

      drawPlayer();
      drawOpponent();

      playerSprite.x -= playerSprite.dx;
      playerSprite.y += playerSprite.dy;

      if (
        playerSprite.x < this.playerCanvasTemplate.x &&
        playerSprite.y > this.playerCanvasTemplate.y
      ) {
        this.canvasDrawings.redrawCanvas(
          context,
          this.playerCanvasTemplate,
          this.opponentCanvasTemplate,
          this.playerPokemon,
          this.opponentPokemon
        );

        setTimeout(() => {
          this.opponentPokemon.currentHealthPoints <= 0
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

    const drawPlayer = () => {
      this.canvasDrawings.drawPokemonSprite(context, playerSprite);

      this.canvasDrawings.drawHealthBar(
        context,
        this.playerCanvasTemplate,
        this.playerPokemon
      );
    };

    const drawOpponent = () => {
      this.canvasDrawings.drawPokemonSprite(context, opponentSprite);
    };

    const moveForward = () => {
      context.clearRect(0, 0, context.canvas.width, context.canvas.height);

      drawOpponent();
      drawPlayer();

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

      context.clearRect(0, 0, context.canvas.width, context.canvas.height);

      drawOpponent();
      drawPlayer();

      setTimeout(() => {
        moveBackward();
      }, 1000);
    };

    const moveBackward = () => {
      context.clearRect(0, 0, context.canvas.width, context.canvas.height);

      drawOpponent();
      drawPlayer();

      opponentSprite.x += opponentSprite.dx;
      opponentSprite.y -= opponentSprite.dy;

      if (
        opponentSprite.x > this.opponentCanvasTemplate.x &&
        opponentSprite.y < this.opponentCanvasTemplate.y
      ) {
        this.canvasDrawings.redrawCanvas(
          context,
          this.playerCanvasTemplate,
          this.opponentCanvasTemplate,
          this.playerPokemon,
          this.opponentPokemon
        );

        setTimeout(() => {
          this.playerPokemon.currentHealthPoints <= 0
            ? this.endBattle(context)
            : this.playerTurn();
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

    this.canvasDrawings.drawBattleResult(context, this.playerPokemon, this.opponentPokemon);
    const buttonTemplate = this.canvasDrawings.drawPlayAgainButton(context);

    const callback = this.backToPokemonSelection.bind(this, buttonTemplate);
    context.canvas.addEventListener('click', callback);

    battleSong.pause();
    battleSong.currentTime = 0;
  }

  backToPokemonSelection(button, event) {
    const canvasBorders = this.context.canvas.getBoundingClientRect();
    const mouseClickX = event.clientX - canvasBorders.left;
    const mouseClickY = event.clientY - canvasBorders.top;

    if (
      mouseClickX < button.x + button.width &&
      mouseClickX > button.x &&
      mouseClickY < button.y + button.height &&
      mouseClickY > button.y
    ) {
      const canvasContainer = document.querySelector('.canvas-container');
      canvasContainer.removeChild(canvasContainer.firstChild);

      const pokemonContainer = document.querySelector('.pokemon-container');
      pokemonContainer.style.display = 'flex';
    }
  }

  generateAudio() {
    battleSong.volume = 0.07;
    hitSound.volume = 0.2;
    battleSong.play();
  }
}
