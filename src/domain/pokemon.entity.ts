import type { Height } from './height.vo.js';
import type { Weight } from './weight.vo.js';

export interface BaseStats {
  hp: number;
  attack: number;
  defense: number;
  specialAttack: number;
  specialDefense: number;
  speed: number;
}

export class Pokemon {
  constructor(
    /** National Pokédex number. */
    readonly id: number,
    readonly name: string,
    readonly height: Height,
    readonly weight: Weight,
    readonly baseStats: BaseStats,
  ) {}
}
