import { ApiProperty } from '@nestjs/swagger';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  @ApiProperty({example: '1', description: 'Уникальный идентификатор'})
  id!: number;

  @ApiProperty({example: 'user@mail.ru', description: 'Почтовый адрес'})
  @Column({ type: 'varchar', length: 100, unique: true })
  email!: string;

  @ApiProperty({example: 'login', description: 'Логин'})
  @Column({ type: 'varchar', length: 100, unique: true })
  login!: string;

  @ApiProperty({example: 'not12345', description: 'Пароль'})
  @Column({ type: 'varchar', length: 30 })
  password!: string;

  @ApiProperty({example: 'Ivan', description: 'Имя'})
  @Column({ type: 'varchar', length: 20 })
  name!: string;

  @ApiProperty({example: 'Ivanov', description: 'Фамилия'})
  @Column({ type: 'varchar', length: 20 })
  surname!: string;
}