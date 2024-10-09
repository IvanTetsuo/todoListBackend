import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ColumnBox } from 'src/entities/column.entity';
import { UserService } from 'src/user/user.service';
import { In, Repository } from 'typeorm';
import { ColumnPositionDto } from './dto/column-position.dto';
import { CreateColumnDto } from './dto/create-column.dto';

@Injectable()
export class ColumnService {
    constructor(
        @InjectRepository(ColumnBox)
        private columnRepository: Repository<ColumnBox>,
        private readonly userService: UserService,
    ) {}

    async createColumn(columnData: CreateColumnDto, userID: string): Promise<ColumnBox> {
        const user = await this.userService.getUserById(userID);
        const newColumn = this.columnRepository.create(columnData);
        newColumn.user = user;
        await this.columnRepository.save(newColumn);
        return newColumn;
    }

    async getAllColumns(userID: string): Promise<ColumnBox[]> {
        const user = await this.userService.getUserById(userID);
        const columns = await this.columnRepository.find({
            where: {user},
            relations: {
                user: true,
            },
        });
        return columns;
    }

    async deleteColumn(columnID: string, userID: string): Promise<ColumnBox> {
        const user = await this.userService.getUserById(userID);
        const [column] = await this.columnRepository.find({
            where: {id: +columnID, user},
            relations: {
                user: true,
            },
        });
        if (!column) {
            throw new Error('Такой колонки не существует');
        }
        return await this.columnRepository.remove(column);
    }

    async getColumnById(columnID: string, userID: string): Promise<ColumnBox> {
        const user = await this.userService.getUserById(userID);
        const [column] = await this.columnRepository.find({
            where: {id: +columnID, user},
            relations: {
                user: true,
            },
        });
        if (!column) {
          throw new Error('Такой колонки не существует');
        }
        return column;
    }

    async updateColumnById(columnID: string, columnData: CreateColumnDto, userID: string): Promise<ColumnBox> {
        const user = await this.userService.getUserById(userID);
        const [column] = await this.columnRepository.find({
            where: {id: +columnID, user},
            relations: {
                user: true,
            },
        });
        if (!column) {
          throw new Error('Такой колонки не существует');
        }
        Object.assign(column, columnData);
        return await this.columnRepository.save(column);
    }

    async updateColumnPosition(columnPositionDto: ColumnPositionDto, userID: string): Promise<ColumnBox[]> {
        const user = await this.userService.getUserById(userID);
        const columns = await this.columnRepository.find({where: {id: In(columnPositionDto.positions), user}});
        columnPositionDto.positions.map(async (id, index) => {
            const column = columns.find((item) => item.id === id );
            column.horizontalPosition = index;
        });
        await this.columnRepository.save(columns);
        return columns.sort((columnA, columnB) => columnA.horizontalPosition - columnB.horizontalPosition);
      }
}
