export class CanvasDrawings {
  redrawCanvas(
    context,
    playerCanvasTemplate,
    opponentCanvasTemplate,
    playerPokemonDetails,
    opponentPokemonDetails
  ) {
    context.clearRect(0, 0, context.canvas.width, context.canvas.height);

    this.drawPokemonSprite(context, playerCanvasTemplate);
    this.drawHealthBar(context, playerCanvasTemplate, playerPokemonDetails);

    this.drawPokemonSprite(context, opponentCanvasTemplate);
    this.drawHealthBar(context, opponentCanvasTemplate, opponentPokemonDetails);
  }

  drawPokemonSprite(context, template) {
    context.drawImage(
      template.sprite,
      template.x,
      template.y,
      template.width,
      template.height
    );
  }

  drawBattleResult(context, playerPokemon, opponentPokemon) {
    const x = context.canvas.width * 0.5;
    const y = context.canvas.height * 0.35;

    context.font = '11vh serif';
    context.textAlign = 'center';
    context.fillStyle = 'rgb(227,242,253)';
    context.strokeStyle = 'black';
    context.lineWidth = 1;

    if (opponentPokemon.currentHealthPoints <= 0) {
      context.fillText('You Win', x, y);
      context.strokeText('You Win', x, y);
    } else if (playerPokemon.currentHealthPoints <= 0) {
      context.fillText('You Lose', x, y);
      context.strokeText('You Lose', x, y);
    }
  }

  drawPlayAgainButton(context) {
    const buttonWidth = context.canvas.width * 0.07 + 100;
    const buttonHeight = context.canvas.height * 0.02 + 25;

    const x = (context.canvas.width - buttonWidth) * 0.5;
    const y = context.canvas.height * 0.4;

    const buttonImg = new Image();
    buttonImg.src = `./assets/images/play-again-button.png`;
    buttonImg.onload = () => context.drawImage(buttonImg, x, y, buttonWidth, buttonHeight);

    const buttonTemplate = { width: buttonWidth, height: buttonHeight, x, y };

    return buttonTemplate;
  }

  drawHealthBar(context, canvasTemplate, pokemonDetails) {
    let heathPercentage = Math.round(
      (pokemonDetails.currentHealthPoints * 100) / pokemonDetails.maxHealthPoints
    );

    if (heathPercentage < 0) {
      heathPercentage = 0;
    }

    const whiteBar = () => {
      context.beginPath();

      context.rect(
        canvasTemplate.x,
        canvasTemplate.y,
        canvasTemplate.width,
        canvasTemplate.height * 0.1
      );

      context.fillStyle = 'white';
      context.closePath();

      context.strokeStyle = 'black';
      context.lineWidth = 3;

      context.stroke();
      context.fill();
    };

    const healthBar = () => {
      context.beginPath();

      context.rect(
        canvasTemplate.x,
        canvasTemplate.y,
        canvasTemplate.width * (heathPercentage / 100),
        canvasTemplate.height * 0.1
      );

      if (heathPercentage > 75) {
        context.fillStyle = 'green';
      } else if (heathPercentage > 50) {
        context.fillStyle = 'yellowgreen';
      } else if (heathPercentage > 25) {
        context.fillStyle = 'gold';
      } else if (heathPercentage > 10) {
        context.fillStyle = 'orange';
      } else if (heathPercentage > 0) {
        context.fillStyle = 'red';
      } else {
        context.fillStyle = 'white';
      }

      context.closePath();
      context.fill();
    };

    whiteBar();
    healthBar();
  }
}
