export const battleSong = new Audio('./assets/audio/battle.mp3');
export const hitSound = new Audio('./assets/audio/hit.wav');

export const baseURL = `https://pokeapi.co/api/v2`;

export const capitalizeText = (string) => {
  if (typeof string === 'string') {
    return string.includes('-')
      ? string
          .split('-')
          .map((s) => s[0].toUpperCase() + s.slice(1))
          .join(' ')
      : string.charAt(0).toUpperCase() + string.slice(1);
  } else {
    return null;
  }
};

export const mapPokemonDetails = (pokemonDetails) => {
  const pokemonId = pokemonDetails.id;
  const pokemonSprite = pokemonDetails.sprites.front_default;
  const pokemonName = capitalizeText(pokemonDetails.name);

  let {
    ability: { name: pokemonAbility },
  } = pokemonDetails.abilities.find((a) => !a.is_hidden);

  pokemonAbility = capitalizeText(pokemonAbility);

  const [
    { base_stat: pokemonHP },
    { base_stat: pokemonAttack },
    { base_stat: pokemonDefense },
    { base_stat: pokemonSpAttack },
    { base_stat: pokemonSpDefense },
    { base_stat: pokemonSpeed },
  ] = pokemonDetails.stats;

  let [
    {
      move: { name: pokemonMoveOne },
    },
    {
      move: { name: pokemonMoveTwo },
    },
    {
      move: { name: pokemonMoveThree },
    },
    {
      move: { name: pokemonMoveFour },
    },
  ] = pokemonDetails.moves;

  pokemonMoveOne = capitalizeText(pokemonMoveOne);
  pokemonMoveTwo = capitalizeText(pokemonMoveTwo);
  pokemonMoveThree = capitalizeText(pokemonMoveThree);
  pokemonMoveFour = capitalizeText(pokemonMoveFour);

  const mappedDetails = {
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
    pokemonMoveFour,
  };

  return mappedDetails;
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
  return `<div class="pokemon-card">
  <div class="pokemon-sprite">
    <img src="${pokemonSprite}" alt="Pokemon Sprite">
    <button type="button" data-id="${pokemonId}" class="pokemon-selection-button">Choose</button>
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
