export class PokemonNotFoundError extends Error {
  constructor(id: number) {
    super(`Pokemon ${id} not found`);
  }
}
