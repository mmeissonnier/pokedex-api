import { Controller, Get, Query } from '@nestjs/common';
import { ListPokemons } from '../application/list-pokemons.use-case.js';
import type { PokemonDto } from '../application/pokemon.dto.js';
import { PaginationLimitPipe } from './pipes/pagination-limit.pipe.js';
import { PaginationOffsetPipe } from './pipes/pagination-offset.pipe.js';
import { toPageResponse } from './pokemon.response.js';
import type { PageResponse } from './pokemon.response.js';

@Controller('pokemons')
export class PokemonsController {
  constructor(private readonly listPokemons: ListPokemons) {}

  @Get()
  async list(
    @Query('limit', PaginationLimitPipe) limit: number,
    @Query('offset', PaginationOffsetPipe) offset: number,
  ): Promise<PageResponse<PokemonDto>> {
    const pagination = { limit, offset };
    const page = await this.listPokemons.execute(pagination);
    return toPageResponse(page, pagination);
  }
}
