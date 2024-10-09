import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateDeskDto {
    @ApiProperty({example: 'Доска', description: 'Название доски'})
    @IsNotEmpty()
    @IsString()
    name: string;

    @ApiProperty({example: 'Работа', description: 'Поле для описания доски'})
    @IsString()
    description: string;
}