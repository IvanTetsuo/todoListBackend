import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { ColumnBox } from 'src/entities/column.entity';

export class CreateTaskDto {
  @ApiProperty({ example: 'Задача1', description: 'Название задачи/плитки' })
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @ApiProperty({
    example: 'Моя первая задача',
    description: 'Поле для описания задачи/плитки',
  })
  @IsString()
  readonly description: string;

  @ApiProperty({ example: 'column1', description: 'Родительская сущность' })
  @IsNotEmpty()
  @IsString()
  column: ColumnBox;
}
