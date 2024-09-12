import { ApiProperty } from '@nestjs/swagger';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { ColumnBox } from './column.entity';

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
  @Column({ type: 'timestamptz', length: 100 })
  dateOfCreation!: Date;

  @ApiProperty({example: '[[...], [...]]', description: 'Массив сущностей Desk'})
  @Column({ type: 'array'})
  columnsBoxes!: Array<ColumnBox>;
}