export interface BaseStatsDto {
  hp: number;
  attack: number;
  defense: number;
  specialAttack: number;
  specialDefense: number;
  speed: number;
}

export interface PokemonDto {
  id: number;
  name: string;
  heightInMeters: number;
  weightInKg: number;
  baseStats: BaseStatsDto;
}
