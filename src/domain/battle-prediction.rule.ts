import type { Pokemon } from './pokemon.entity.js';

interface PredictionResult {
  winner: Pokemon;
  probability: number;
}

export class BattlePrediction {
  constructor(
    private readonly pokemonA: Pokemon,
    private readonly pokemonB: Pokemon,
  ) {}

  predictWinner(): PredictionResult {
    const scoreA = this.powerScore(this.pokemonA);
    const scoreB = this.powerScore(this.pokemonB);
    const probabilityA = scoreA / (scoreA + scoreB);

    // Ties are not handled yet: on equal scores, pokemonB is the winner.
    return probabilityA > 0.5
      ? { winner: this.pokemonA, probability: probabilityA }
      : { winner: this.pokemonB, probability: 1 - probabilityA };
  }

  /**
   * A knocks B out in hpB × defenseB / attackA turns, so A wins when
   * attackA × defenseA × hpA beats the same product for B.
   */
  private powerScore({ baseStats }: Pokemon): number {
    return baseStats.attack * baseStats.defense * baseStats.hp;
  }
}
