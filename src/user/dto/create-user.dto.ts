import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";

export class CreateUserDto {
    @ApiProperty({example: 'user@mail.ru', description: 'Почтовый адрес'})
    @IsNotEmpty()
    @IsEmail()
    readonly email: string;

    @ApiProperty({example: 'login', description: 'Логин'})
    readonly login: string;

    @ApiProperty({example: 'not12345', description: 'Пароль'})
    @IsString()
    @MinLength(6)
    @MaxLength(20)
    readonly password: string;

    @ApiProperty({example: 'Ivan', description: 'Имя'})
    @IsNotEmpty()
    readonly name: string;
    
    @ApiProperty({example: 'Ivanov', description: 'Фамилия'})
    readonly surname: string;
}

// почему class, а не type или interface?