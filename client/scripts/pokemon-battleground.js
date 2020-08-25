import { battleSong, hitSound, mapPokemonDetails, randomIntegerGenerator } from './commons.js';
import { Pokemon } from './pokemon.js';

export class PokemonBattleground {
  attackButtonCanvasTemplate;
  playerCanvasTemplate;
  opponentCanvasTemplate;
  playerPokemon;
  opponentPokemon;
  context;

  isPlayerTurn = false;

  constructor(pokemonService, canvasDrawings, canvasAnimations) {
    this.pokemonService = pokemonService;
    this.canvasDrawings = canvasDrawings;
    this.canvasAnimations = canvasAnimations;
  }

  async startBattle(event) {
    this.generateCanvas();
    await this.generatePlayerPokemon(event.target.dataset.id);
    await this.generateOpponentPokemon();
    this.setUpBattleground(this.context);
    this.generateAudio();

    setTimeout(() => {
      if (this.playerPokemon.speed > this.opponentPokemon.speed) {
        this.playerTurnListener(this.context);
      } else if (this.playerPokemon.speed < this.opponentPokemon.speed) {
        this.opponentTurn(this.context);
      } else {
        const speedTieResolver = randomIntegerGenerator(1, 2);
        speedTieResolver === 1
          ? this.playerTurnListener(this.context)
          : this.opponentTurn(this.context);
      }
    }, 1750);
  }

  async generatePlayerPokemon(pokemonId) {
    const pokemonDetails = await this.pokemonService.getSinglePokemonDetails(pokemonId);
    const mappedDetails = mapPokemonDetails(pokemonDetails);

    this.playerPokemon = new Pokemon(mappedDetails);
  }

  async generateOpponentPokemon() {
    let pokemonId = randomIntegerGenerator(1, 50);

    while (pokemonId === this.playerPokemon.id) {
      pokemonId = randomIntegerGenerator(1, 50);
    }

    const pokemonDetails = await this.pokemonService.getSinglePokemonDetails(pokemonId);
    const mappedDetails = mapPokemonDetails(pokemonDetails);

    this.opponentPokemon = new Pokemon(mappedDetails);
  }

  generateCanvas() {
    const pokemonContainer = document.querySelector('.pokemon-container');
    pokemonContainer.style.display = 'none';

    const canvasContainer = document.querySelector('.canvas-container');
    canvasContainer.innerHTML = '<canvas></canvas>';
    this.context = document.querySelector('canvas').getContext('2d');

    const resizeCanvasCallback = this.setUpBattleground.bind(this, this.context);
    window.addEventListener('resize', resizeCanvasCallback);
  }

  // This method is called on every window resize event to provide a responsive canvas.
  setUpBattleground(context) {
    if (!document.querySelector('canvas')) {
      return;
    }

    context.canvas.width = document.documentElement.clientWidth * 0.9;
    context.canvas.height = document.documentElement.clientHeight * 0.61;

    if (this.isPlayerTurn) {
      this.attackButtonCanvasTemplate = this.canvasDrawings.drawAttackButton(context);
    }

    if (
      this.playerPokemon.currentHealthPoints <= 0 ||
      this.opponentPokemon.currentHealthPoints <= 0
    ) {
      this.endBattle(context);
      return;
    }

    const playerCanvasTemplate = {
      x: context.canvas.width * 0.34,
      y: context.canvas.height * 0.73,
      width: context.canvas.width * 0.07 + 50,
      height: context.canvas.height * 0.17 + 50,
      dx: context.canvas.width / 200 + 2.5,
      dy: context.canvas.width / 400 + 1.25,
      sprite: undefined,
    };
    this.playerCanvasTemplate = playerCanvasTemplate;

    const opponentCanvasTemplate = {
      x: context.canvas.width * 0.49,
      y: context.canvas.height * 0.55,
      width: context.canvas.width * 0.07 + 50,
      height: context.canvas.height * 0.17 + 50,
      dx: context.canvas.width / 200 + 2.5,
      dy: context.canvas.width / 400 + 1.25,
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

  async playerTurn(context) {
    const playerSprite = { ...this.playerCanvasTemplate };
    const opponentSprite = { ...this.opponentCanvasTemplate };
    const animationDirection = 1;

    await this.canvasAnimations.movePokemonSpriteForward(
      context,
      playerSprite,
      opponentSprite,
      this.opponentPokemon,
      animationDirection
    );

    const actualDamage = this.playerPokemon.calculateActualDamage(this.opponentPokemon);
    hitSound.play();

    if (actualDamage > 0) {
      await this.canvasAnimations.blinkPokemonSprite(
        context,
        playerSprite,
        opponentSprite,
        this.opponentPokemon
      );
    } else {
      await this.canvasAnimations.animationDelay(550);
    }

    this.playerPokemon.normalAttack(this.opponentPokemon, actualDamage);

    await this.canvasAnimations.movePokemonSpriteBackward(
      context,
      playerSprite,
      opponentSprite,
      this.opponentPokemon,
      this.playerCanvasTemplate,
      animationDirection
    );

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
        : this.opponentTurn(context);
    }, 500);
  }

  async opponentTurn(context) {
    const playerSprite = { ...this.playerCanvasTemplate };
    const opponentSprite = { ...this.opponentCanvasTemplate };
    const animationDirection = -1;

    await this.canvasAnimations.movePokemonSpriteForward(
      context,
      opponentSprite,
      playerSprite,
      this.playerPokemon,
      animationDirection
    );

    const actualDamage = this.opponentPokemon.calculateActualDamage(this.playerPokemon);
    hitSound.play();

    if (actualDamage > 0) {
      await this.canvasAnimations.blinkPokemonSprite(
        context,
        opponentSprite,
        playerSprite,
        this.playerPokemon
      );
    } else {
      await this.canvasAnimations.animationDelay(550);
    }

    this.opponentPokemon.normalAttack(this.playerPokemon, actualDamage);

    await this.canvasAnimations.movePokemonSpriteBackward(
      context,
      opponentSprite,
      playerSprite,
      this.playerPokemon,
      this.opponentCanvasTemplate,
      animationDirection
    );

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
        : this.playerTurnListener(context);
    }, 500);
  }

  endBattle(context) {
    context.clearRect(0, 0, context.canvas.width, context.canvas.height);

    this.canvasDrawings.drawBattleResult(context, this.playerPokemon, this.opponentPokemon);
    const buttonTemplate = this.canvasDrawings.drawPlayAgainButton(context);

    const backToSelectionCallback = this.backToPokemonSelection.bind(this, buttonTemplate);
    context.canvas.addEventListener('click', backToSelectionCallback);

    battleSong.pause();
    battleSong.currentTime = 0;
  }

  backToPokemonSelection(playAgainButton, event) {
    const canvasBorders = this.context.canvas.getBoundingClientRect();
    const mouseClickX = event.clientX - canvasBorders.left;
    const mouseClickY = event.clientY - canvasBorders.top;

    if (
      mouseClickX < playAgainButton.x + playAgainButton.width &&
      mouseClickX > playAgainButton.x &&
      mouseClickY < playAgainButton.y + playAgainButton.height &&
      mouseClickY > playAgainButton.y
    ) {
      const canvasContainer = document.querySelector('.canvas-container');
      canvasContainer.removeChild(canvasContainer.firstChild);

      const pokemonContainer = document.querySelector('.pokemon-container');
      pokemonContainer.style.display = 'flex';
    }
  }

  generateAudio() {
    battleSong.volume = 0.02;
    hitSound.volume = 0.06;
    battleSong.play();
  }

  playerTurnListener(context) {
    const startPlayerTurn = (event) => {
      const canvasBorders = context.canvas.getBoundingClientRect();
      const mouseClickX = event.clientX - canvasBorders.left;
      const mouseClickY = event.clientY - canvasBorders.top;

      const attackButton = this.attackButtonCanvasTemplate;

      if (
        mouseClickX < attackButton.x + attackButton.width &&
        mouseClickX > attackButton.x &&
        mouseClickY < attackButton.y + attackButton.height &&
        mouseClickY > attackButton.y
      ) {
        this.playerTurn(context);

        context.canvas.removeEventListener('click', startPlayerTurnCallback);
        this.isPlayerTurn = false;
      }
    };

    this.attackButtonCanvasTemplate = this.canvasDrawings.drawAttackButton(context);

    const startPlayerTurnCallback = startPlayerTurn.bind(this);
    context.canvas.addEventListener('click', startPlayerTurnCallback);

    this.isPlayerTurn = true;
  }
}
