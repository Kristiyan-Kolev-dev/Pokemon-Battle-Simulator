export const battleSong = new Audio('./assets/audio/battle.mp3');
export const hitSound = new Audio('./assets/audio/hit.wav');

export const baseURL = `https://pokeapi.co/api/v2`;

export const randomIntegerGenerator = (minRange, maxRange) => {
  if (typeof minRange !== 'number' || typeof maxRange !== 'number') {
    throw new TypeError('The provided min and max ranges have to be of type number!');
  }

  Math.round(minRange);
  Math.round(maxRange);

  return Math.floor(Math.random() * (maxRange - minRange + 1)) + minRange;
};

export const capitalizeText = (text) => {
  if (typeof text !== 'string') {
    throw new TypeError('The provided text has to be of type string!');
  }

  return text.includes('-')
    ? text
        .split('-')
        .map((t) => t[0].toUpperCase() + t.slice(1))
        .join(' ')
    : text.charAt(0).toUpperCase() + text.slice(1);
};

export const mapPokemonDetails = (pokemonDetails) => {
  const pokemonId = pokemonDetails.id;
  const pokemonSprites = pokemonDetails.sprites;
  const pokemonName = capitalizeText(pokemonDetails.name);

  let {
    ability: { name: pokemonAbility },
  } = pokemonDetails.abilities.find((a) => !a.is_hidden);

  pokemonAbility = capitalizeText(pokemonAbility);

  const [
    { base_stat: pokemonHealthPoints },
    { base_stat: pokemonAttack },
    { base_stat: pokemonDefence },
    { base_stat: pokemonSpecialAttack },
    { base_stat: pokemonSpecialDefence },
    { base_stat: pokemonSpeed },
  ] = pokemonDetails.stats;

  let [
    {
      move: { name: moveOne },
    },
    {
      move: { name: moveTwo },
    },
    {
      move: { name: moveThree },
    },
    {
      move: { name: moveFour },
    },
  ] = pokemonDetails.moves;

  moveOne = capitalizeText(moveOne);
  moveTwo = capitalizeText(moveTwo);
  moveThree = capitalizeText(moveThree);
  moveFour = capitalizeText(moveFour);

  const pokemonMoves = { moveOne, moveTwo, moveThree, moveFour };

  const mappedDetails = {
    pokemonId,
    pokemonSprites,
    pokemonName,
    pokemonAbility,
    pokemonHealthPoints,
    pokemonAttack,
    pokemonDefence,
    pokemonSpecialAttack,
    pokemonSpecialDefence,
    pokemonSpeed,
    pokemonMoves,
  };

  return mappedDetails;
};
