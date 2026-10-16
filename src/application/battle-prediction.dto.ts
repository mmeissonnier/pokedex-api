import { PokemonDto } from './pokemon.dto.js';

export interface BattlePredictionDto {
  winner: PokemonDto;
  probability: number;
}
