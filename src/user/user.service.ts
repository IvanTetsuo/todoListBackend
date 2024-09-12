import { Injectable } from '@nestjs/common';
import { User } from 'src/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async createUser(dto: CreateUserDto): Promise<User> {
    const newUser = this.userRepository.create(dto); // не нужен await? в видосе был нужен
    await this.userRepository.save(newUser);
    return newUser;
  }

  async getAllUsers(): Promise<User[]> {
    const users = await this.userRepository.find();
    return users;
  }

  async deleteUser(userID: string): Promise<User> {
    // await this.userRepository
    // .createQueryBuilder()
    // .delete()
    // .from(User)
    // .where("id = :id", { id: userID })
    // .execute();
    const user = await this.userRepository.findOneBy({id: +userID});
    if (!user) {
      throw new Error('Такого пользователя не существует');
    }
    return await this.userRepository.remove(user);

  }

  async getUserById(userID: string) {
    const user = this.userRepository.findOneBy({id: +userID});
    if (!user) {
      throw new Error('Такого пользователя не существует');
    }
    return user;
  }

  async updateUserById(userID: string, userDto: CreateUserDto) {
    const user = await this.userRepository.findOneBy({id: +userID});
    if (!user) {
      throw new Error('Такого пользователя не существует');
    }
    Object.assign(user, userDto);
    return await this.userRepository.save(user);
    
    // const user = this.userRepository.update(userID, dto);
    // await this.userRepository.save({
    //   id: userID,

    // });
  }

  async getUserByEmail(email: string) {
    const user = await this.userRepository.findOneBy({email});
    return user;
  }
}
