import { BattlePrediction } from '../domain/battle-prediction.rule.js';
import { PokemonNotFoundError } from '../domain/errors/PokemonNotFoundError.js';
import { PokemonRepository } from '../domain/pokemon.repository.js';
import { BattlePredictionDto } from './battle-prediction.dto.js';
import { toPokemonDto } from './pokemon.mapper.js';

export class PredictBattle {
  constructor(private readonly pokemons: PokemonRepository) {}

  async execute(
    idPokemonA: number,
    idPokemonB: number,
  ): Promise<BattlePredictionDto> {
    const [pokemonA, pokemonB] = await Promise.all([
      this.pokemons.findById(idPokemonA),
      this.pokemons.findById(idPokemonB),
    ]);

    if (!pokemonA) {
      throw new PokemonNotFoundError(idPokemonA);
    }
    if (!pokemonB) {
      throw new PokemonNotFoundError(idPokemonB);
    }

    const prediction = new BattlePrediction(pokemonA, pokemonB).predictWinner();

    return {
      probability: Math.round(prediction.probability * 100) / 100,
      winner: toPokemonDto(prediction.winner),
    };
  }
}
