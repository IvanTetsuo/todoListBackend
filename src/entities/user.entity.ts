import { ApiProperty } from '@nestjs/swagger';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Project } from './project.entity';
import { Desk } from './desk.entity';
import { ColumnBox } from './column.entity';
import { Task } from './task.entity';
import { Exclude } from 'class-transformer';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  @ApiProperty({ example: '1', description: 'Уникальный идентификатор' })
  id!: number;

  @ApiProperty({ example: 'user@mail.ru', description: 'Почтовый адрес' })
  @Column({ type: 'varchar', length: 100, unique: true })
  @Exclude()
  email!: string;

  @ApiProperty({ example: 'login', description: 'Логин' })
  @Column({ type: 'varchar', length: 100, unique: true })
  login!: string;

  @ApiProperty({ example: 'not12345', description: 'Пароль' })
  @Column({ type: 'varchar', length: 100 })
  @Exclude()
  password!: string;

  @ApiProperty({ example: 'Ivan', description: 'Имя' })
  @Column({ type: 'varchar', length: 20 })
  name!: string;

  @ApiProperty({ example: 'Ivanov', description: 'Фамилия' })
  @Column({ type: 'varchar', length: 20 })
  surname!: string;

  @OneToMany(() => Project, (project) => project.user, { onDelete: 'CASCADE' })
  projects: Project[];

  @OneToMany(() => Desk, (desk) => desk.user, { onDelete: 'CASCADE' })
  desks: Desk[];

  @OneToMany(() => ColumnBox, (column) => column.user, { onDelete: 'CASCADE' })
  columns: ColumnBox[];

  @OneToMany(() => Task, (task) => task.user, { onDelete: 'CASCADE' })
  tasks: Task[];
}
