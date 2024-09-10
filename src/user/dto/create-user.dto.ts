export class CreateUserDto {
    readonly email: string;
    readonly login: string;
    readonly password: string;
    readonly name: string;
    readonly surname: string;
}

// почему class, а не type или interface?