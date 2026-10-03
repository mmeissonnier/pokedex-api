import { Height } from '../../domain/height.vo.js';
import { Pokemon } from '../../domain/pokemon.entity.js';
import { Weight } from '../../domain/weight.vo.js';
import type { PokemonOrmEntity } from './pokemon.orm-entity.js';

export function toDomain(row: PokemonOrmEntity): Pokemon {
  return new Pokemon(
    row.id,
    row.name,
    Height.fromDecimetres(row.height),
    Weight.fromHectograms(row.weight),
    {
      hp: row.hp,
      attack: row.attack,
      defense: row.defense,
      specialAttack: row.specialAttack,
      specialDefense: row.specialDefense,
      speed: row.speed,
    },
  );
}
