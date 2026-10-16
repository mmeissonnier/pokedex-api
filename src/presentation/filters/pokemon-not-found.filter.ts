import { Catch, NotFoundException } from '@nestjs/common';
import type { ArgumentsHost } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { PokemonNotFoundError } from '../../domain/errors/PokemonNotFoundError.js';

@Catch(PokemonNotFoundError)
export class PokemonNotFoundFilter extends BaseExceptionFilter {
  catch(error: PokemonNotFoundError, host: ArgumentsHost) {
    super.catch(new NotFoundException(error.message), host);
  }
}
