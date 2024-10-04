import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcryptjs';
import { User } from 'src/entities/user.entity';

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private jwtService: JwtService
    ) {}

    async login(userData: User) {
        const user = await this.validateToken(userData);
        return this.generateToken(user);
    }

    async registration(userData: User) {
        const candidate = await this.userService.getUserByEmail(userData.email);
        if (candidate) {
            //ОБРАБОТКА ОШИБКИ (такой тип ошибки со статусом и т.д. выписать в контроллер)
            throw new HttpException('Пользователь с таким email существует', HttpStatus.BAD_REQUEST);
        }
        const hashPassword = await bcrypt.hash(userData.password, 5);
        const user = await this.userService.createUser({...userData, password: hashPassword});
        return this.generateToken(user);
    }

    //сделать потом срок жизни токену
    private async generateToken(userData: User) {
        const payload = {email: userData.email, id: userData.id};
        return {
            token: this.jwtService.sign(payload, /* {expiresIn: '2 days'} */)
        };
    }

    private async validateToken(userData: User) {
        const user = await this.userService.getUserByEmail(userData.email);
        const passwordEquals = await bcrypt.compare(userData.password, user.password);
        if (user && passwordEquals) {
            return user;
        }
        throw new Error('Некорректный email или пароль');
    }
}
