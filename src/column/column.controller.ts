import { Controller, HttpException, HttpStatus, Body, Post, Get, Delete, Param, Patch, UseGuards, Req, UseInterceptors, ClassSerializerInterceptor } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ColumnService } from './column.service';
import { ColumnBox } from 'src/entities/column.entity';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ReqUserID } from 'src/common/user/user.decorator';
import { ColumnPositionDto } from './dto/column-position.dto';
import { CreateColumnDto } from './dto/create-column.dto';

@UseInterceptors(ClassSerializerInterceptor)
@UseGuards(JwtAuthGuard)
@Controller('column')
export class ColumnController {
    constructor(private columnService: ColumnService) {}

    @Post('create-new-column')
    async createColumn(@Body() columnData: CreateColumnDto, @ReqUserID() userID: string) {
        return this.columnService.createColumn(columnData, userID);
    }

    @Get('get-all-columns')
    async getAllColumns(@ReqUserID() userID: string) {
        try {
            return await this.columnService.getAllColumns(userID);
        } catch(err) {
            throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
        }
    }

    @Delete('delete-column/:columnID')
    async deleteColumn(@Param('columnID') columnID: string, @ReqUserID() userID: string) {
        if (!columnID) {
            throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
        }
        try {
            return await this.columnService.deleteColumn(columnID, userID);
        } catch(err) {
            throw new HttpException(err.message, HttpStatus.FORBIDDEN);
        }
    }

    //при ошибке, статус 200
    @Get('get-by/:columnID')
    async getColumnById(@Param('columnID') columnID: string, @ReqUserID() userID: string) {
        if (!columnID) {
            throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
        }
        try {
            return await this.columnService.getColumnById(columnID, userID);
        } catch(err) {
            throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
        }
    }

    @Patch('update-column/:columnID')
    async updateColumnById(
        @Param('columnID') columnID: string,
        @Body() columnData: CreateColumnDto,
        @ReqUserID() userID: string
    ) {
        try {
            return await this.columnService.updateColumnById(columnID, columnData, userID);
        } catch(err) {
            throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
        }
    }

    @Patch('update-column-position')
    async updateColumnPosition(@Body() positions: ColumnPositionDto, @ReqUserID() userID: string) {
        try {
            return await this.columnService.updateColumnPosition(positions, userID);
        } catch(err) {
            throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
        }
    }
}
