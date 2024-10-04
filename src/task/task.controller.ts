import { Controller, HttpException, HttpStatus, Body, Post, Get, Delete, Param, Patch, UseGuards, Req } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { TaskService } from './task.service';
import { Task } from 'src/entities/task.entity';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('task')
export class TaskController {
    constructor(private taskService: TaskService) {}

    @Post('create-new-task')
    async createTask(@Body() taskData: Task, @Req() request: Request & {user: {id:string}}) {
        const userID = request.user.id;
        return this.taskService.createTask(taskData, userID);
    }

    @Get('get-all-tasks')
    async getAllTasks() {
        try {
            return await this.taskService.getAllTasks();
        } catch(err) {
            throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
        }
    }

    @Delete('delete-task/:taskID')
    async deleteTask(@Param('taskID') taskID: string) {
        if (!taskID) {
            throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
        }
        try {
            return await this.taskService.deleteTask(taskID);
        } catch(err) {
            throw new HttpException(err.message, HttpStatus.FORBIDDEN);
        }
    }

    //при ошибке, статус 200
    @Get('get-by/:taskID')
    async getTaskById(@Param('taskID') taskID: string) {
        if (!taskID) {
            throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
        }
        try {
            return await this.taskService.getTaskById(taskID);
        } catch(err) {
            throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
        }
    }

    @Patch('update-task/:taskID')
    async updateTaskById(@Param('taskID') taskID: string,
    @Body() taskData: Task) {
        try {
            return await this.taskService.updateTaskById(taskID, taskData);
        } catch(err) {
            throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
        }
    }
}
