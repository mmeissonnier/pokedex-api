import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ListPokemons } from './application/list-pokemons.use-case.js';
import { DATABASE } from './config/database.config.js';
import { PokemonRepository } from './domain/pokemon.repository.js';
import { PokemonSqliteRepository } from './infrastructure/pokemon-sqlite.repository.js';
import { provideClass } from './infrastructure/nest/provide-class.js';
import { PokemonOrmEntity } from './infrastructure/typeorm/pokemon.orm-entity.js';
import { PokemonsController } from './presentation/pokemons.controller.js';
import { BattlePredictionController } from './presentation/battle-prediction.controller.js';
import { PredictBattle } from './application/predict-battle.use-case.js';

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
  controllers: [PokemonsController, BattlePredictionController],
  providers: [
    { provide: PokemonRepository, useClass: PokemonSqliteRepository },
    provideClass(ListPokemons, [PokemonRepository]),
    provideClass(PredictBattle, [PokemonRepository]),
  ],
})
export class AppModule {}
