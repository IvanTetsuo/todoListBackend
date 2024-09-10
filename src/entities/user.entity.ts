import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'varchar', length: 100, unique: true })
  email!: string;

  @Column({ type: 'varchar', length: 100, unique: true })
  login!: string;

  @Column({ type: 'varchar', length: 30 })
  password!: string;

  @Column({ type: 'varchar', length: 20 })
  name!: string;

  @Column({ type: 'varchar', length: 20 })
  surname!: string;
}