import { randomIntegerGenerator } from './commons.js';

export class Pokemon {
  constructor(pokemonDetails) {
    this.id = pokemonDetails.pokemonId;
    this.sprites = pokemonDetails.pokemonSprites;
    this.name = pokemonDetails.pokemonName;
    this.ability = pokemonDetails.pokemonAbility;
    this.healthPoints = pokemonDetails.pokemonHealthPoints;
    this.attack = pokemonDetails.pokemonAttack;
    this.defence = pokemonDetails.pokemonDefence;
    this.specialAttack = pokemonDetails.pokemonSpecialAttack;
    this.specialDefence = pokemonDetails.pokemonSpecialDefence;
    this.speed = pokemonDetails.pokemonSpeed;
    this.moves = pokemonDetails.pokemonMoves;
  }

  normalAttack(target) {
    target.healthPoints -= this.calculateActualDamage(target);
  }

  calculateActualDamage(target) {
    return Math.floor((this.attack / target.defence) * randomIntegerGenerator(5, 35));
  }
}
