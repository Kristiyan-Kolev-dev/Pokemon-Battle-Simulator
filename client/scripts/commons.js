export const baseURL = `https://pokeapi.co/api/v2`;

export const capitalizeWord = (string) => {
  return typeof string === 'string' ? string.charAt(0).toUpperCase() + string.slice(1) : '';
};

export const pokemonCardBuilder = (
  pokemonId,
  pokemonSprite,
  pokemonName,
  pokemonAbility,
  pokemonHP,
  pokemonAttack,
  pokemonDefense,
  pokemonSpAttack,
  pokemonSpDefense,
  pokemonSpeed,
  pokemonMoveOne,
  pokemonMoveTwo,
  pokemonMoveThree,
  pokemonMoveFour
) => {
  return `<div data-id="${pokemonId}" class="pokemon-card">
  <div class="pokemon-sprite">
    <img src="${pokemonSprite}" alt="Pokemon Sprite">
  </div>
  
  <div class="pokemon-info">
    <div class="pokemon-name">
      <h1>${pokemonName}</h1>
      <p>Ability: ${pokemonAbility}</p>
    </div>
  
    <div class="pokemon-stats">
      <p>HP: ${pokemonHP}</p>
      <p>Attack: ${pokemonAttack}</p>
      <p>Defense: ${pokemonDefense}</p>
      <p>Special Attack: ${pokemonSpAttack}</p>
      <p>Special Defense: ${pokemonSpDefense}</p>
      <p>Speed: ${pokemonSpeed}</p>
    </div>
  </div>
  
  <div class="pokemon-moves">
    <p>Move 1: ${pokemonMoveOne}</p>
    <p>Move 2: ${pokemonMoveTwo}</p>
  </div>
  <div class="pokemon-moves">
    <p>Move 3: ${pokemonMoveThree}</p>
    <p>Move 4: ${pokemonMoveFour}</p>
  </div>
  </div>`;
};
