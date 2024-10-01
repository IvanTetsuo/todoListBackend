import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from 'src/entities/task.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TaskService {
    constructor(
        @InjectRepository(Task)
        private taskRepository: Repository<Task>,
    ) {}

    async createTask(taskData: Task): Promise<Task> {
        const newTask = this.taskRepository.create(taskData);
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
