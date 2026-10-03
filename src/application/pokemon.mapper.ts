import type { Pokemon } from '../domain/pokemon.entity.js';
import type { PokemonDto } from './pokemon.dto.js';

export function toPokemonDto(pokemon: Pokemon): PokemonDto {
  return {
    id: pokemon.id,
    name: pokemon.name,
    heightInMeters: pokemon.height.toMeters(),
    weightInKg: pokemon.weight.toKilograms(),
    baseStats: { ...pokemon.baseStats },
  };
}
