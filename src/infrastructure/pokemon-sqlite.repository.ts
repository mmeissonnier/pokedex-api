import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import type { Pokemon } from '../domain/pokemon.entity.js';
import type { PokemonRepository } from '../domain/pokemon.repository.js';
import type { Page, Pagination } from '../shared/types/pagination.js';
import { toDomain } from './typeorm/pokemon.mapper.js';
import { PokemonOrmEntity } from './typeorm/pokemon.orm-entity.js';

@Injectable()
export class PokemonSqliteRepository implements PokemonRepository {
  constructor(
    @InjectRepository(PokemonOrmEntity)
    private readonly orm: Repository<PokemonOrmEntity>,
  ) {}

  async findAll({ limit, offset }: Pagination): Promise<Page<Pokemon>> {
    const [rows, total] = await this.orm.findAndCount({
      take: limit,
      skip: offset,
      order: { id: 'ASC' },
    });
    return { items: rows.map(toDomain), total };
  }

  async findById(id: number): Promise<Pokemon | null> {
    const row = await this.orm.findOneBy({ id });
    return row ? toDomain(row) : null;
  }
}
