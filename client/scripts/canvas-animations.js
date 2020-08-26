export class CanvasAnimations {
  constructor(canvasDrawings) {
    this.canvasDrawings = canvasDrawings;
  }

  async movePokemonSpriteForward(
    context,
    attackingSprite,
    defendingSprite,
    defendingPokemon,
    animationDirection
  ) {
    const renderCanvas = () => {
      context.clearRect(0, 0, context.canvas.width, context.canvas.height);

      this.canvasDrawings.drawPokemonSprite(context, defendingSprite);
      this.canvasDrawings.drawPokemonSprite(context, attackingSprite);
      this.canvasDrawings.drawHealthBar(context, defendingSprite, defendingPokemon);

      attackingSprite.x += attackingSprite.dx * animationDirection;
      attackingSprite.y -= attackingSprite.dy * animationDirection;
    };

    const requestNewFrame = () => {
      return new Promise(requestAnimationFrame);
    };

    do {
      renderCanvas();

      await requestNewFrame();
    } while (
      attackingSprite.x * animationDirection < defendingSprite.x * 0.9 * animationDirection &&
      attackingSprite.y * animationDirection > defendingSprite.y * 0.9 * animationDirection
    );
  }

  async movePokemonSpriteBackward(
    context,
    attackingSprite,
    defendingSprite,
    defendingPokemon,
    attackerCanvasTemplate,
    animationDirection
  ) {
    const renderCanvas = () => {
      context.clearRect(0, 0, context.canvas.width, context.canvas.height);

      this.canvasDrawings.drawPokemonSprite(context, defendingSprite);
      this.canvasDrawings.drawPokemonSprite(context, attackingSprite);
      this.canvasDrawings.drawHealthBar(context, defendingSprite, defendingPokemon);

      attackingSprite.x -= attackingSprite.dx * animationDirection;
      attackingSprite.y += attackingSprite.dy * animationDirection;
    };

    const requestNewFrame = () => {
      return new Promise(requestAnimationFrame);
    };

    do {
      renderCanvas();

      await requestNewFrame();
    } while (
      attackingSprite.x * animationDirection > attackerCanvasTemplate.x * animationDirection &&
      attackingSprite.y * animationDirection < attackerCanvasTemplate.y * animationDirection
    );
  }

  async blinkPokemonSprite(context, attackingSprite, defendingSprite, defendingPokemon) {
    let blinkTracker = 0;

    const renderCanvas = () => {
      context.clearRect(0, 0, context.canvas.width, context.canvas.height);

      if (blinkTracker % 2 === 0) {
        context.filter = 'brightness(150%)';
        context.globalAlpha = 0.9;
      }

      this.canvasDrawings.drawPokemonSprite(context, defendingSprite);

      context.filter = 'brightness(100%)';
      context.globalAlpha = 1;

      this.canvasDrawings.drawPokemonSprite(context, attackingSprite);
      this.canvasDrawings.drawHealthBar(context, defendingSprite, defendingPokemon);

      blinkTracker++;
    };

    do {
      renderCanvas();

      await this.animationDelay(225);
    } while (blinkTracker < 6);
  }

  animationDelay(milliseconds) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(requestAnimationFrame);
      }, milliseconds);
    });
  }
}
