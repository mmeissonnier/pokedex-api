export class Height {
  private constructor(private readonly decimetres: number) {}

  static fromDecimetres(value: number): Height {
    if (!Number.isFinite(value) || value <= 0) {
      throw new Error('Height must be a positive number');
    }
    return new Height(value);
  }

  toDecimetres(): number {
    return this.decimetres;
  }

  toCentimeters(): number {
    return this.decimetres * 10;
  }

  toMeters(): number {
    return this.decimetres / 10;
  }
}
