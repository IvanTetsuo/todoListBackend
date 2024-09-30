import { ApiProperty } from '@nestjs/swagger';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany} from 'typeorm';
import { Desk } from './desk.entity';

@Entity()
export class Project {
  @PrimaryGeneratedColumn()
  @ApiProperty({example: '1', description: 'Уникальный идентификатор'})
  id!: number;

  @ApiProperty({example: 'Проект', description: 'Название проекта'})
  @Column({ type: 'varchar', length: 100})
  name!: string;

  @ApiProperty({example: 'Мой проект', description: 'Поле для описания проекта'})
  @Column({ type: 'varchar', length: 100})
  description!: string;

  @ApiProperty({example: '00.00.0000 / 00:00', description: 'Дата и время создания'})
  @Column({ type: 'timestamptz', length: 100 })
  dateOfCreation!: Date;

  @OneToMany(() => Desk, (desk) => desk.project, { cascade: true })
  desks: Desk[];

  // user_id
}

// сделать внешний ключ. мб массив чисел