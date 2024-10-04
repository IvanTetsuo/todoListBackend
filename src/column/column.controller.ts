import { Controller, HttpException, HttpStatus, Body, Post, Get, Delete, Param, Patch, UseGuards, Req } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ColumnService } from './column.service';
import { ColumnBox } from 'src/entities/column.entity';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('column')
export class ColumnController {
    constructor(private columnService: ColumnService) {}

    @Post('create-new-column')
    async createColumn(@Body() columnData: ColumnBox, @Req() request: Request & {user: {id: string}}) {
        const userID = request.user.id;
        return this.columnService.createColumn(columnData, userID);
    }

    @Get('get-all-columns')
    async getAllColumns() {
        try {
            return await this.columnService.getAllColumns();
        } catch(err) {
            throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
        }
    }

    @Delete('delete-column/:columnID')
    async deleteColumn(@Param('columnID') columnID: string) {
        if (!columnID) {
            throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
        }
        try {
            return await this.columnService.deleteColumn(columnID);
        } catch(err) {
            throw new HttpException(err.message, HttpStatus.FORBIDDEN);
        }
    }

    //при ошибке, статус 200
    @Get('get-by/:columnID')
    async getColumnById(@Param('columnID') columnID: string) {
        if (!columnID) {
            throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
        }
        try {
            return await this.columnService.getColumnById(columnID);
        } catch(err) {
            throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
        }
    }

    @Patch('update-column/:columnID')
    async updateColumnById(@Param('columnID') columnID: string,
    @Body() columnData: ColumnBox) {
        try {
            return await this.columnService.updateColumnById(columnID, columnData);
        } catch(err) {
            throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
        }
    }
}
