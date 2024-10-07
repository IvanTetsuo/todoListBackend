import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ColumnBox } from 'src/entities/column.entity';
import { UserService } from 'src/user/user.service';
import { Repository } from 'typeorm';

@Injectable()
export class ColumnService {
    constructor(
        @InjectRepository(ColumnBox)
        private columnRepository: Repository<ColumnBox>,
        private readonly userService: UserService,
    ) {}

    async createColumn(columnData: ColumnBox, userID: string): Promise<ColumnBox> {
        const user = await this.userService.getUserById(userID);
        const newColumn = this.columnRepository.create(columnData);
        newColumn.user = user;
        await this.columnRepository.save(newColumn);
        return newColumn;
    }

    async getAllColumns(userID: string): Promise<ColumnBox[]> {
        const user = await this.userService.getUserById(userID);
        const columns = await this.columnRepository.find({where: {user}});
        return columns;
    }

    async deleteColumn(columnID: string, userID: string): Promise<ColumnBox> {
        const user = await this.userService.getUserById(userID);
        const column = await this.columnRepository.findOneBy({id: +columnID, user});
        if (!column) {
            throw new Error('Такой колонки не существует');
        }
        return await this.columnRepository.remove(column);
    }

    async getColumnById(columnID: string, userID: string) {
        const user = await this.userService.getUserById(userID);
        const column = this.columnRepository.findOneBy({id: +columnID, user});
        if (!column) {
          throw new Error('Такой колонки не существует');
        }
        return column;
    }

    async updateColumnById(columnID: string, columnData: ColumnBox, userID: string) {
        const user = await this.userService.getUserById(userID);
        const column = await this.columnRepository.findOneBy({id: +columnID, user});
        if (!column) {
          throw new Error('Такой колонки не существует');
        }
        Object.assign(column, columnData);
        return await this.columnRepository.save(column);
    }
}
