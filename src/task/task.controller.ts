import {
  Controller,
  HttpException,
  HttpStatus,
  Body,
  Post,
  Get,
  Delete,
  Param,
  Patch,
  UseGuards,
  Req,
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { TaskService } from './task.service';
import { Task } from 'src/entities/task.entity';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ReqUserID } from 'src/common/user/user.decorator';
import { TaskPositionDto } from './dto/task-position.dto';
import { CreateTaskDto } from './dto/create-task.dto';

@ApiTags('Таски')
@UseInterceptors(ClassSerializerInterceptor)
@UseGuards(JwtAuthGuard)
@Controller('task')
export class TaskController {
  constructor(private taskService: TaskService) {}

  @Post('create-new-task')
  async createTask(
    @Body() taskData: CreateTaskDto,
    @ReqUserID() userID: string,
  ) {
    return this.taskService.createTask(taskData, userID);
  }

  @Get('get-all-tasks')
  async getAllTasks(@ReqUserID() userID: string) {
    try {
      return await this.taskService.getAllTasks(userID);
    } catch (err) {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    }
  }

  @Delete('delete-task/:taskID')
  async deleteTask(
    @Param('taskID') taskID: string,
    @ReqUserID() userID: string,
  ) {
    if (!taskID) {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    }
    try {
      return await this.taskService.deleteTask(taskID, userID);
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.FORBIDDEN);
    }
  }

  //при ошибке, статус 200
  @Get('get-by/:taskID')
  async getTaskById(
    @Param('taskID') taskID: string,
    @ReqUserID() userID: string,
  ) {
    if (!taskID) {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    }
    try {
      return await this.taskService.getTaskById(taskID, userID);
    } catch (err) {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    }
  }

  @Patch('update-task/:taskID')
  async updateTaskById(
    @Param('taskID') taskID: string,
    @Body() taskData: CreateTaskDto,
    @ReqUserID() userID: string,
  ) {
    try {
      return await this.taskService.updateTaskById(taskID, taskData, userID);
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Patch('update-task-position')
  async updateTaskPosition(
    @Body() positions: TaskPositionDto,
    @ReqUserID() userID: string,
  ) {
    try {
      return await this.taskService.updateTaskPosition(positions, userID);
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    }
  }
}
