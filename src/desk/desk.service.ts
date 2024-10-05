import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Desk } from 'src/entities/desk.entity';
import { UserService } from 'src/user/user.service';
import { Repository } from 'typeorm';

@Injectable()
export class DeskService {
    constructor(
        @InjectRepository(Desk)
        private deskRepository: Repository<Desk>,
        private readonly userService: UserService,
    ) {}

    async createDesk(deskData: Desk, userID: string): Promise<Desk> {
        const user = await this.userService.getUserById(userID);
        const newDesk = this.deskRepository.create(deskData);
        newDesk.user = user;
        await this.deskRepository.save(newDesk);
        return newDesk;
    }

    async getAllDesks(userID: string): Promise<Desk[]> {
        const user = await this.userService.getUserById(userID);
        const desks = await this.deskRepository.find({where: {user}});
        return desks;
    }

    async deleteDesk(deskID: string, userID: string): Promise<Desk> {
        const user = await this.userService.getUserById(userID);
        const desk = await this.deskRepository.findOneBy({id: +deskID, user});
        if (!desk) {
            throw new Error('Такой доски не существует');
        }
        return await this.deskRepository.remove(desk);
    }

    async getDeskById(deskID: string, userID: string) {
        const user = await this.userService.getUserById(userID);
        const desk = this.deskRepository.findOneBy({id: +deskID, user});
        if (!desk) {
          throw new Error('Такой доски не существует');
        }
        return desk;
    }

    async updateDeskById(deskID: string, deskData: Desk, userID: string) {
        const user = await this.userService.getUserById(userID);
        const desk = await this.deskRepository.findOneBy({id: +deskID, user});
        if (!desk) {
          throw new Error('Такой доски не существует');
        }
        Object.assign(desk, deskData);
        return await this.deskRepository.save(desk);
    }
}
