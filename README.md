# Pokedex API

A small [NestJS](https://nestjs.com) backend exposing a Pokédex (French data) over HTTP, backed by SQLite and TypeORM. The goal of the project is to practise building a NestJS API with a clean architecture.

## Requirements

- Node.js 24 (Node ≥ 20.6 is needed for `--env-file`)
- npm

## Getting started

```bash
npm install
cp .env.example .env
npm run start:dev
```

The API listens on `http://localhost:3000`.

`.env` is required: the app refuses to start without `DATABASE_PATH` and prints a message explaining how to fix it.

## Configuration

| Variable        | Description                      | Example             |
| --------------- | -------------------------------- | ------------------- |
| `DATABASE_PATH` | Path to the SQLite database file | `db/pokedex.sqlite` |

Environment variables are loaded with Node's native `--env-file` flag (no extra dependency). The `start*` scripts in [package.json](package.json) already pass it.

Non-environment settings are plain TypeScript constants in [src/config/](src/config/):

| File                                                    | Content                                  |
| ------------------------------------------------------- | ---------------------------------------- |
| [pagination.config.ts](src/config/pagination.config.ts) | Default page size (20) and maximum (100) |
| [database.config.ts](src/config/database.config.ts)     | Reads and validates `DATABASE_PATH`      |

## API

### `GET /pokemons`

Returns a paginated list of Pokémon, ordered by Pokédex number.

| Query parameter | Type    | Default | Rules                                  |
| --------------- | ------- | ------- | -------------------------------------- |
| `limit`         | integer | `20`    | Between 1 and 100, otherwise `400`     |
| `offset`        | integer | `0`     | Greater than or equal to 0, else `400` |

```bash
curl "http://localhost:3000/pokemons?limit=2&offset=1"
```

```json
{
  "items": [
    {
      "id": 2,
      "name": "Herbizarre",
      "heightInMeters": 1,
      "weightInKg": 13,
      "baseStats": {
        "hp": 60,
        "attack": 62,
        "defense": 63,
        "specialAttack": 80,
        "specialDefense": 80,
        "speed": 60
      }
    },
    {
      "id": 3,
      "name": "Florizarre",
      "heightInMeters": 2,
      "weightInKg": 100,
      "baseStats": {
        "hp": 80,
        "attack": 82,
        "defense": 83,
        "specialAttack": 100,
        "specialDefense": 100,
        "speed": 80
      }
    }
  ],
  "total": 100,
  "limit": 2,
  "offset": 1
}
```

Invalid parameters return a `400`:

```json
{
  "message": "limit must be an integer between 1 and 100",
  "error": "Bad Request",
  "statusCode": 400
}
```

## Database

[db/pokedex.sqlite](db/pokedex.sqlite) is a ready-to-use SQLite database with 100 Pokémon (French names, descriptions, types, abilities, base stats, evolution chains), sourced from [PokéAPI](https://pokeapi.co).

The app only reads from it. TypeORM's `synchronize` is disabled, so the schema is never modified. Only the `pokemon` table's basic columns are mapped for now (id, name, height, weight and the six base stats).

Units stored in the database: height in decimetres, weight in hectograms. They are converted to metres and kilograms in the API response.

## Architecture

The project follows a clean architecture: dependencies only point inward (presentation → application → domain), and the domain knows nothing about Nest or TypeORM.

```
src/
  domain/          Pokemon entity, Height / Weight value objects,
                   PokemonRepository (port, abstract class)
  application/     Use cases (ListPokemons)
  infrastructure/  TypeORM entity, mapper, SQLite repository,
                   Nest helper (provideClass)
  presentation/    Controller, pipes, response mapping
  config/          Constants and environment settings
  shared/types/    Types shared across layers (pagination)
  app.module.ts    Wiring: connects ports to implementations
  main.ts          Entry point
```

Key decisions:

- **Domain entity vs ORM entity.** `Pokemon` in `domain/` is a plain class. `PokemonOrmEntity` in `infrastructure/typeorm/` describes the table. A mapper converts one to the other.
- **Value objects.** `Height` and `Weight` hold the unit and the conversions, and reject non-positive values.
- **Port as an abstract class.** `PokemonRepository` is an abstract class rather than an interface because interfaces are erased at runtime and cannot be used as Nest injection tokens.
- **Framework-free use cases.** Use cases have no Nest decorator. [provideClass](src/infrastructure/nest/provide-class.ts) registers them with a factory provider, so only the wiring in [app.module.ts](src/app.module.ts) is framework-specific.
- **Validation with pipes.** `limit` and `offset` are validated by [custom pipes](src/presentation/pipes/), without DTOs or `class-validator`.

File naming: `.entity.ts`, `.vo.ts`, `.repository.ts`, `.use-case.ts`, `.orm-entity.ts`, `.mapper.ts`, `.pipe.ts`, `.controller.ts`.

## Scripts

| Command              | Description                          |
| -------------------- | ------------------------------------ |
| `npm run start:dev`  | Start in watch mode, loading `.env`  |
| `npm run start`      | Start once, loading `.env`           |
| `npm run build`      | Compile to `dist/`                   |
| `npm run start:prod` | Run the compiled app, loading `.env` |
| `npm run lint`       | Lint with [oxlint](https://oxc.rs)   |
| `npm run format`     | Format with Prettier                 |
| `npm test`           | Run unit tests with Vitest           |
| `npm run test:e2e`   | Run end-to-end tests                 |

Type-check without emitting files: `npx tsc --noEmit` (`noEmit` is enabled in [tsconfig.json](tsconfig.json) and overridden in [tsconfig.build.json](tsconfig.build.json) so that `nest build` still outputs files).

## Stack

NestJS 12, TypeORM, better-sqlite3, TypeScript (ESM), Vitest, oxlint, Prettier.
