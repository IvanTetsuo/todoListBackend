import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Desk } from 'src/entities/desk.entity';
import { Repository } from 'typeorm';

@Injectable()
export class DeskService {
    constructor(
        @InjectRepository(Desk)
        private deskRepository: Repository<Desk>,
    ) {}

    async createDesk(deskData: Desk): Promise<Desk> {
        const newDesk = this.deskRepository.create(deskData);
        await this.deskRepository.save(newDesk);
        return newDesk;
    }

    async getAllDesks(): Promise<Desk[]> {
        const desks = await this.deskRepository.find();
        return desks;
    }

    async deleteDesk(deskID: string): Promise<Desk> {
        const desk = await this.deskRepository.findOneBy({id: +deskID});
        if (!desk) {
            throw new Error('Такой доски не существует');
        }
        return await this.deskRepository.remove(desk);
    }

    async getDeskById(deskID: string) {
        const desk = this.deskRepository.findOneBy({id: +deskID});
        if (!desk) {
          throw new Error('Такой доски не существует');
        }
        return desk;
    }

    async updateDeskById(deskID: string, deskData: Desk) {
        const desk = await this.deskRepository.findOneBy({id: +deskID});
        if (!desk) {
          throw new Error('Такой доски не существует');
        }
        Object.assign(desk, deskData);
        return await this.deskRepository.save(desk);
    }
}
