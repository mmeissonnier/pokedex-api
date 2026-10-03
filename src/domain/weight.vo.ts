const POUNDS_PER_KILOGRAM = 2.20462;

export class Weight {
  private constructor(private readonly hectograms: number) {}

  static fromHectograms(value: number): Weight {
    if (!Number.isFinite(value) || value <= 0) {
      throw new Error('Weight must be a positive number');
    }
    return new Weight(value);
  }

  toHectograms(): number {
    return this.hectograms;
  }

  toKilograms(): number {
    return this.hectograms / 10;
  }

  toPounds(): number {
    return this.toKilograms() * POUNDS_PER_KILOGRAM;
  }
}
