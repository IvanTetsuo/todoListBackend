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

    async getAllColumns(): Promise<ColumnBox[]> {
        const columns = await this.columnRepository.find();
        return columns;
    }

    async deleteColumn(columnID: string): Promise<ColumnBox> {
        const column = await this.columnRepository.findOneBy({id: +columnID});
        if (!column) {
            throw new Error('Такой колонки не существует');
        }
        return await this.columnRepository.remove(column);
    }

    async getColumnById(columnID: string) {
        const column = this.columnRepository.findOneBy({id: +columnID});
        if (!column) {
          throw new Error('Такой колонки не существует');
        }
        return column;
    }

    async updateColumnById(columnID: string, columntData: ColumnBox) {
        const column = await this.columnRepository.findOneBy({id: +columnID});
        if (!column) {
          throw new Error('Такой колонки не существует');
        }
        Object.assign(column, columntData);
        return await this.columnRepository.save(column);
    }
}
