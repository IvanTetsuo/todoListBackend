import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateColumnDto {
    @ApiProperty({example: 'Название колонки', description: 'Название колонки'})
    @IsNotEmpty()
    @IsString()
    name!: string;
}