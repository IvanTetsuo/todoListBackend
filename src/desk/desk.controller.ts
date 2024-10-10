import { Controller, HttpException, HttpStatus, Body, Post, Get, Delete, Param, Patch, UseGuards, Req, UseInterceptors, ClassSerializerInterceptor } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { DeskService } from './desk.service';
import { Desk } from 'src/entities/desk.entity';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ReqUserID } from 'src/common/user/user.decorator';
import { CreateDeskDto } from './dto/create-desk.dto';

@UseInterceptors(ClassSerializerInterceptor)
@UseGuards(JwtAuthGuard)
@Controller('desk')
export class DeskController {
    constructor(private deskService: DeskService) {}

    @Post('create-new-desk')
    async createDesk(@Body() deskData: CreateDeskDto, @ReqUserID() userID: string) {
        try {
            return await this.deskService.createDesk(deskData, userID);
        } catch(err) {
            throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
        }
    }

    @Get('get-all-desks')
    async getAllDesks(@ReqUserID() userID: string) {
        try {
            return await this.deskService.getAllDesks(userID);
        } catch(err) {
            throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
        }
    }

    @Delete('delete-desk/:deskID')
    async deleteDesk(@Param('deskID') deskID: string, @ReqUserID() userID: string) {
        if (!deskID) {
            throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
        }
        try {
            return await this.deskService.deleteDesk(deskID, userID);
        } catch(err) {
            throw new HttpException(err.message, HttpStatus.FORBIDDEN);
        }
    }

    //при ошибке, статус 200
    @Get('get-by/:deskID')
    async getDeskById(@Param('deskID') deskID: string, @ReqUserID() userID: string) {
        if (!deskID) {
            throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
        }
        try {
            return await this.deskService.getDeskById(deskID, userID);
        } catch(err) {
            throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
        }
    }

    @Patch('update-desk/:deskID')
    async updateDeskById(
        @Param('deskID') deskID: string,
        @Body() deskData: CreateDeskDto,
        @ReqUserID() userID: string
    ) {
        try {
            return await this.deskService.updateDeskById(deskID, deskData, userID);
        } catch(err) {
            throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
        }
    }
}
