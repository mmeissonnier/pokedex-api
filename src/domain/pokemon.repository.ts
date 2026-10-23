import type { Page, Pagination } from '../shared/types/pagination.js';
import type { Pokemon } from './pokemon.entity.js';

/**
 * Abstract class rather than an interface: interfaces are erased at runtime,
 * so Nest could not use one as a dependency injection token. A class exists at
 * runtime and serves as both the contract and the token.
 */
export abstract class PokemonRepository {
  abstract findAll(pagination: Pagination): Promise<Page<Pokemon>>;
  abstract findById(id: number): Promise<Pokemon | null>;
}
