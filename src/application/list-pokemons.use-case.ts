import type { PokemonRepository } from '../domain/pokemon.repository.js';
import type { Page, Pagination } from '../shared/types/pagination.js';
import type { PokemonDto } from './pokemon.dto.js';
import { toPokemonDto } from './pokemon.mapper.js';

export class ListPokemons {
  constructor(private readonly pokemons: PokemonRepository) {}

  async execute(pagination: Pagination): Promise<Page<PokemonDto>> {
    const page = await this.pokemons.findAll(pagination);
    return { items: page.items.map(toPokemonDto), total: page.total };
  }
}
