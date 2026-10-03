import { BadRequestException, Injectable } from '@nestjs/common';
import type { PipeTransform } from '@nestjs/common';

/** Validates `offset`: integer >= 0, defaults to 0. */
@Injectable()
export class PaginationOffsetPipe
  implements PipeTransform<string | undefined, number>
{
  transform(value?: string): number {
    if (value === undefined) return 0;

    const offset = Number(value);
    if (!Number.isInteger(offset) || offset < 0) {
      throw new BadRequestException('offset must be an integer >= 0');
    }
    return offset;
  }
}
