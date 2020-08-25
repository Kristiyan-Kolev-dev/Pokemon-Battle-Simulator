import { randomIntegerGenerator } from './commons.js';

export class Pokemon {
  constructor(pokemonDetails) {
    this.id = pokemonDetails.pokemonId;
    this.sprites = pokemonDetails.pokemonSprites;
    this.name = pokemonDetails.pokemonName;
    this.ability = pokemonDetails.pokemonAbility;
    this.maxHealthPoints = pokemonDetails.pokemonHealthPoints;
    this.currentHealthPoints = pokemonDetails.pokemonHealthPoints;
    this.attack = pokemonDetails.pokemonAttack;
    this.defence = pokemonDetails.pokemonDefence;
    this.specialAttack = pokemonDetails.pokemonSpecialAttack;
    this.specialDefence = pokemonDetails.pokemonSpecialDefence;
    this.speed = pokemonDetails.pokemonSpeed;
    this.moves = pokemonDetails.pokemonMoves;
  }

  normalAttack(target, damage) {
    target.currentHealthPoints -= damage;
  }

  calculateActualDamage(target) {
    return Math.floor((this.attack / target.defence) * randomIntegerGenerator(5, 25));
  }
}
