import { ApiProperty } from '@nestjs/swagger';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne } from 'typeorm';
import { ColumnBox } from './column.entity';
import { Project } from './project.entity';
import { User } from './user.entity';

@Entity()
export class Desk {
  @PrimaryGeneratedColumn()
  @ApiProperty({example: '1', description: 'Уникальный идентификатор'})
  id!: number;

  @ApiProperty({example: 'Доска', description: 'Название доски'})
  @Column({ type: 'varchar', length: 100})
  name!: string;

  @ApiProperty({example: 'Работа', description: 'Поле для описания доски'})
  @Column({ type: 'varchar', length: 100})
  description!: string;

  @ApiProperty({example: '00.00.0000 / 00:00', description: 'Дата и время создания'})
  @Column({ type: 'timestamptz', default: 'NOW()'})
  dateOfCreation!: Date;

  @ManyToOne(() => Project, (project) => project.desks, { onDelete: 'CASCADE' })
  project: Project;

  @OneToMany(() => ColumnBox, (column) => column.desk, { cascade: true })
  columns: ColumnBox[];

  @ManyToOne(() => User, (user) => user.desks, { onDelete: 'CASCADE' })
  user: User;
}