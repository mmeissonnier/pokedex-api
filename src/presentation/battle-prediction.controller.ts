import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  UseFilters,
} from '@nestjs/common';
import { BattlePredictionDto } from '../application/battle-prediction.dto.js';
import { PredictBattle } from '../application/predict-battle.use-case.js';
import { PokemonNotFoundFilter } from './filters/pokemon-not-found.filter.js';

@Controller('battle-prediction')
@UseFilters(PokemonNotFoundFilter)
export class BattlePredictionController {
  constructor(private readonly battlePrediction: PredictBattle) {}

  @Get(':idFirst/:idSecond')
  async predictBattle(
    @Param('idFirst', ParseIntPipe) idFirst: number,
    @Param('idSecond', ParseIntPipe) idSecond: number,
  ): Promise<BattlePredictionDto> {
    return this.battlePrediction.execute(idFirst, idSecond);
  }
}
