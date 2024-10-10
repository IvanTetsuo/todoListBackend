import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ColumnBox } from 'src/entities/column.entity';
import { Task } from 'src/entities/task.entity';
import { UserService } from 'src/user/user.service';
import { In, Repository } from 'typeorm';
import { TaskPositionDto } from './dto/task-position.dto';
import { CreateTaskDto } from './dto/create-task.dto';

@Injectable()
export class TaskService {
    constructor(
        @InjectRepository(Task)
        private taskRepository: Repository<Task>,

        @InjectRepository(ColumnBox)
        private columnRepository: Repository<ColumnBox>,

        private readonly userService: UserService,
    ) {}

    async createTask(taskData: CreateTaskDto, userID: string): Promise<Task> {
        const user = await this.userService.getUserById(userID);
        const newTask = this.taskRepository.create(taskData);
        newTask.user = user;
        await this.taskRepository.save(newTask);
        return newTask;
    }

    async getAllTasks(userID: string): Promise<Task[]> {
        const user = await this.userService.getUserById(userID);
        const tasks = await this.taskRepository.find({
          where: {user},
          relations: {
            user: true,
            column: true,
          },
      });
        return tasks;
    }

    async deleteTask(taskID: string, userID: string): Promise<Task> {
        const user = await this.userService.getUserById(userID);
        const [task] = await this.taskRepository.find({
          where: {id: +taskID, user},
          relations: {
            user: true,
            column: true,
          },
      });
        if (!task) {
            throw new Error('Такого задания не существует');
        }
        return await this.taskRepository.remove(task);
    }

    async getTaskById(taskID: string, userID: string): Promise<Task> {
        const user = await this.userService.getUserById(userID);
        const [task] = await this.taskRepository.find({
          where: {id: +taskID, user},
          relations: {
            user: true,
            column: true,
          },
      });
        if (!task) {
          throw new Error('Такого задания не существует');
        }
        return task;
    }

    async updateTaskById(taskID: string, taskData: CreateTaskDto, userID: string): Promise<Task> {
        const user = await this.userService.getUserById(userID);
        const [task] = await this.taskRepository.find({
          where: {id: +taskID, user},
          relations: {
            user: true,
            column: true,
          },
      });
        if (!task) {
          throw new Error('Такого задания не существует');
        }
        Object.assign(task, taskData);
        return await this.taskRepository.save(task);
    }

    async updateTaskPosition(taskPositionDto: TaskPositionDto, userID: string): Promise<Task[]> {
      const user = await this.userService.getUserById(userID);
      const tasks = await this.taskRepository.find({where: {id: In(taskPositionDto.positions), user}});
      taskPositionDto.positions.map((id, index) => {
        const task = tasks.find((item) => item.id === id );
        task.verticalPosition = index;
      });
      await this.taskRepository.save(tasks);
      return tasks.sort((taskA, taskB) => taskA.verticalPosition - taskB.verticalPosition);
    }
}