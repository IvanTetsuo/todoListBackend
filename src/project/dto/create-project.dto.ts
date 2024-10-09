import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateProjectDto {

    @ApiProperty({example: 'Проект', description: 'Название проекта'})
    @IsNotEmpty()
    @IsString()
    name: string;

    @ApiProperty({example: 'Мой проект', description: 'Поле для описания проекта'})
    @IsString()
    description: string;
}