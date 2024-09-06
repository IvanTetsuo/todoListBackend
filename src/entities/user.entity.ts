import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id!: number;
  
    @Column({ type: 'varchar', length: 100 })
    login!: string;
  
    @Column({ type: 'varchar', length: 100 })
    password!: string;
  
    @Column({ type: 'varchar', length: 100 })
    name!: string;
  
    @Column({ type: 'varchar', length: 100 })
    surname!: string;
  }