import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ColumnBox } from 'src/entities/column.entity';
import { UserService } from 'src/user/user.service';
import { In, Repository } from 'typeorm';
import { ColumnPositionDto } from './dto/column-position.dto';

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

    async updateColumnPosition(columnPositionDto: ColumnPositionDto, userID: string): Promise<ColumnBox[]> {
        const user = await this.userService.getUserById(userID);
        console.log(columnPositionDto);
        const columns = await this.columnRepository.find({where: {id: In(columnPositionDto.positions), user}});
        columnPositionDto.positions.map(async (id, index) => {
            const column = columns.find((item) => item.id === id );
            column.horizontalPosition = index;
        });
        await this.columnRepository.save(columns);
        return columns.sort((taskA, taskB) => taskA.horizontalPosition - taskB.horizontalPosition);
      }
}
