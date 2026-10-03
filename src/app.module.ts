import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ListPokemons } from './application/list-pokemons.use-case.js';
import { DATABASE } from './config/database.config.js';
import { PokemonRepository } from './domain/pokemon.repository.js';
import { PokemonSqliteRepository } from './infrastructure/pokemon-sqlite.repository.js';
import { provideClass } from './infrastructure/nest/provide-class.js';
import { PokemonOrmEntity } from './infrastructure/typeorm/pokemon.orm-entity.js';
import { PokemonsController } from './presentation/pokemons.controller.js';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'better-sqlite3',
      database: DATABASE.path,
      entities: [PokemonOrmEntity],
      synchronize: false,
    }),
    TypeOrmModule.forFeature([PokemonOrmEntity]),
  ],
  controllers: [PokemonsController],
  providers: [
    { provide: PokemonRepository, useClass: PokemonSqliteRepository },
    provideClass(ListPokemons, [PokemonRepository]),
  ],
})
export class AppModule {}
