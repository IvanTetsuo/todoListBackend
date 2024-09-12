import { ApiProperty } from '@nestjs/swagger';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { Task } from './task.entity';

@Entity()
export class ColumnBox {
  @PrimaryGeneratedColumn()
  @ApiProperty({example: '1', description: 'Уникальный идентификатор'})
  id!: number;

  @ApiProperty({example: 'Название колонки', description: 'Название колонки'})
  @Column({ type: 'varchar', length: 100})
  name!: string;

  @ApiProperty({example: '00.00.0000 / 00:00', description: 'Дата и время создания'})
  @Column({ type: 'timestamptz', length: 100 })
  dateOfCreation!: Date;

  @ApiProperty({example: '0', description: 'Позиция, очередность колонки'})
  @Column({ type: 'int', length: 100 })
  horizontalPosition!: number;

  @ApiProperty({example: '[[...], [...]]', description: 'Массив сущностей Desk'})
  @Column({ type: 'array'})
  columns!: Array<Task>;
}