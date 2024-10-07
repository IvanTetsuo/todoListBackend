import { ApiProperty } from '@nestjs/swagger';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { ColumnBox } from './column.entity';
import { User } from './user.entity';

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  @ApiProperty({example: '1', description: 'Уникальный идентификатор'})
  id!: number;

  @ApiProperty({example: 'Задача1', description: 'Название задачи/плитки'})
  @Column({ type: 'varchar', length: 100})
  name!: string;

  @ApiProperty({example: 'Моя первая задача', description: 'Поле для описания задачи/плитки'})
  @Column({ type: 'varchar', length: 100})
  description!: string;

  @ApiProperty({example: '00.00.0000 / 00:00', description: 'Дата и время создания'})
  @Column({ type: 'timestamptz', default: 'NOW()'})
  dateOfCreation!: Date;

  @ApiProperty({example: '0', description: 'Позиция, очередность задачи внутри колонки'})
  @Column({ type: 'int', default: 0, unsigned: true})
  verticalPosition!: number;

  @ManyToOne(() => ColumnBox, (column) => column.tasks, { onDelete: 'CASCADE' })
  column: ColumnBox;

  @ManyToOne(() => User, (user) => user.tasks, { onDelete: 'CASCADE' })
  user: User;

  // user_id

}