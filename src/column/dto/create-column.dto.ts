import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";
import { Desk } from "src/entities/desk.entity";

export class CreateColumnDto {
    @ApiProperty({example: 'Название колонки', description: 'Название колонки'})
    @IsNotEmpty()
    @IsString()
    name: string;

    @ApiProperty({example: 'desk1', description: 'Родительская сущность'})
    @IsNotEmpty()
    @IsString()
    desk: Desk;
}