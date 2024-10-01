import { Controller, HttpException, HttpStatus, Body, Post, Get, Delete, Param, Patch } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { DeskService } from './desk.service';
import { Desk } from 'src/entities/desk.entity';

@Controller('desk')
export class DeskController {
    constructor(private deskService: DeskService) {}

    @Post('create-new-desk')
    async createDesk(@Body() deskData: Desk) {
        return this.deskService.createDesk(deskData);
    }

    @Get('get-all-desks')
    async getAllDesks() {
        try {
            return await this.deskService.getAllDesks();
        } catch(err) {
            throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
        }
    }

    @Delete('delete-desk/:deskID')
    async deleteProject(@Param('deskID') deskID: string) {
        if (!deskID) {
            throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
        }
        try {
            return await this.deskService.deleteDesk(deskID);
        } catch(err) {
            throw new HttpException(err.message, HttpStatus.FORBIDDEN);
        }
    }

    //при ошибке, статус 200
    @Get('get-by/:deskID')
    async getDeskById(@Param('deskID') deskID: string) {
        if (!deskID) {
            throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
        }
        try {
            return await this.deskService.getDeskById(deskID);
        } catch(err) {
            throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
        }
    }

    @Patch('update-desk/:deskID')
    async updateDeskById(@Param('deskID') deskID: string,
    @Body() deskData: Desk) {
        try {
            return await this.deskService.updateDeskById(deskID, deskData);
        } catch(err) {
            throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
        }
    }
}
