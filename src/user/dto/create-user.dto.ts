import { ApiProperty } from "@nestjs/swagger";

export class CreateUserDto {
    @ApiProperty({example: 'user@mail.ru', description: 'Почтовый адрес'})
    readonly email: string;

    @ApiProperty({example: 'login', description: 'Логин'})
    readonly login: string;

    @ApiProperty({example: 'not12345', description: 'Пароль'})
    readonly password: string;

    @ApiProperty({example: 'Ivan', description: 'Имя'})
    readonly name: string;
    
    @ApiProperty({example: 'Ivanov', description: 'Фамилия'})
    readonly surname: string;
}

// почему class, а не type или interface?