import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from 'src/entities/task.entity';
import { UserService } from 'src/user/user.service';
import { Repository } from 'typeorm';

@Injectable()
export class TaskService {
    constructor(
        @InjectRepository(Task)
        private taskRepository: Repository<Task>,
        private readonly userService: UserService,
    ) {}

    async createTask(taskData: Task, userID: string): Promise<Task> {
        const user = await this.userService.getUserById(userID);
        const newTask = this.taskRepository.create(taskData);
        newTask.user = user;
        await this.taskRepository.save(newTask);
        return newTask;
    }

    async getAllTasks(): Promise<Task[]> {
        const tasks = await this.taskRepository.find();
        return tasks;
    }

    async deleteTask(taskID: string): Promise<Task> {
        const task = await this.taskRepository.findOneBy({id: +taskID});
        if (!task) {
            throw new Error('Такого задания не существует');
        }
        return await this.taskRepository.remove(task);
    }

    async getTaskById(taskID: string) {
        const task = this.taskRepository.findOneBy({id: +taskID});
        if (!task) {
          throw new Error('Такого задания не существует');
        }
        return task;
    }

    async updateTaskById(taskID: string, taskData: Task) {
        const task = await this.taskRepository.findOneBy({id: +taskID});
        if (!task) {
          throw new Error('Такого задания не существует');
        }
        Object.assign(task, taskData);
        return await this.taskRepository.save(task);
    }
}
