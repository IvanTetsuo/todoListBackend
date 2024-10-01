import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ColumnBox } from 'src/entities/column.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ColumnService {
    constructor(
        @InjectRepository(ColumnBox)
        private columnRepository: Repository<ColumnBox>,
    ) {}

    async createColumn(columnData: ColumnBox): Promise<ColumnBox> {
        const newColumn = this.columnRepository.create(columnData);
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
