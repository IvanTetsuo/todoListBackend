import { ApiProperty } from '@nestjs/swagger';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Task } from './task.entity';
import { Desk } from './desk.entity';
import { User } from './user.entity';

@Entity()
export class ColumnBox {
  @PrimaryGeneratedColumn()
  @ApiProperty({ example: '1', description: 'Уникальный идентификатор' })
  id!: number;

  @ApiProperty({ example: 'Название колонки', description: 'Название колонки' })
  @Column({ type: 'varchar', length: 100 })
  name!: string;

  @ApiProperty({
    example: '00.00.0000 / 00:00',
    description: 'Дата и время создания',
  })
  @Column({ type: 'timestamptz', default: 'NOW()' }) // нужен ли length
  dateOfCreation!: Date;

  @ApiProperty({ example: '0', description: 'Позиция, очередность колонки' })
  @Column({ type: 'int', default: 0, unsigned: true /* unique: true */ })
  horizontalPosition!: number;
  // будут дополнительные две таблицы, которые хранят в себе инфу о позиции колонки и отдельная таблица для положения тасков

  // круд начинать с верхнего уровня (с проджекта т.е.)

  @ManyToOne(() => Desk, (desk) => desk.columns, { onDelete: 'CASCADE' })
  desk: Desk;

  @OneToMany(() => Task, (task) => task.column, { cascade: true })
  tasks: Task[];

  @ManyToOne(() => User, (user) => user.columns, { onDelete: 'CASCADE' })
  user: User;

  // user_id
}
