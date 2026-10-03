import { BadRequestException, Injectable } from '@nestjs/common';
import type { PipeTransform } from '@nestjs/common';
import { PAGINATION } from '../../config/pagination.config.js';

/** Validates `limit`: integer between 1 and the configured maximum. */
@Injectable()
export class PaginationLimitPipe
  implements PipeTransform<string | undefined, number>
{
  transform(value?: string): number {
    if (value === undefined) return PAGINATION.defaultLimit;

    const limit = Number(value);
    if (!Number.isInteger(limit) || limit < 1 || limit > PAGINATION.maxLimit) {
      throw new BadRequestException(
        `limit must be an integer between 1 and ${PAGINATION.maxLimit}`,
      );
    }
    return limit;
  }
}
