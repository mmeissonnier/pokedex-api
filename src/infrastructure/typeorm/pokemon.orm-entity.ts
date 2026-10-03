import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('pokemon')
export class PokemonOrmEntity {
  @PrimaryColumn()
  id: number;

  @Column()
  name: string;

  /** Decimetres. */
  @Column()
  height: number;

  /** Hectograms. */
  @Column()
  weight: number;

  @Column()
  hp: number;

  @Column()
  attack: number;

  @Column()
  defense: number;

  @Column()
  specialAttack: number;

  @Column()
  specialDefense: number;

  @Column()
  speed: number;
}
