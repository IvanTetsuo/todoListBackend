import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";
import { Project } from "src/entities/project.entity";

export class CreateDeskDto {
    @ApiProperty({example: 'Доска', description: 'Название доски'})
    @IsNotEmpty()
    @IsString()
    name: string;

    @ApiProperty({example: 'Работа', description: 'Поле для описания доски'})
    @IsString()
    description: string;

    @ApiProperty({example: 'project1', description: 'Родительская сущность'})
    @IsNotEmpty()
    @IsString()
    project: Project;
}