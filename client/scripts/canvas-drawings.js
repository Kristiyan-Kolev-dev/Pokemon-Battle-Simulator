export class CanvasDrawings {
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

    if (opponentPokemon.healthPoints <= 0) {
      context.fillText('You Win', x, y);
      context.strokeText('You Win', x, y);
    } else if (playerPokemon.healthPoints <= 0) {
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
}
