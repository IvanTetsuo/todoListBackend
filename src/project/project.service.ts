import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Project } from 'src/entities/project.entity';
import { Repository } from 'typeorm';
import { User } from 'src/entities/user.entity';
import { UserService } from 'src/user/user.service';


@Injectable()
export class ProjectService {
    constructor(
        @InjectRepository(Project)
        private projectRepository: Repository<Project>,
        private readonly userService: UserService,
    ) {}

    async createProject(projectData: Project, userID: string): Promise<Project> {
        const user = await this.userService.getUserById(userID);
        const newProject = this.projectRepository.create(projectData);
        newProject.user = user;
        await this.projectRepository.save(newProject);
        return newProject;
    }

    async getAllProjects(): Promise<Project[]> {
        const projects = await this.projectRepository.find();
        return projects;
    }

    async deleteProject(projectID: string): Promise<Project> {
        const project = await this.projectRepository.findOneBy({id: +projectID});
        if (!project) {
            throw new Error('Такого проекта не существует');
        }
        return await this.projectRepository.remove(project);
    }

    async getProjectById(projectID: string) {
        const project = this.projectRepository.findOneBy({id: +projectID});
        if (!project) {
          throw new Error('Такого проекта не существует');
        }
        return project;
    }

    async updateProjectById(projectID: string, projectData: Project) {
        const project = await this.projectRepository.findOneBy({id: +projectID});
        if (!project) {
          throw new Error('Такого проекта не существует');
        }
        Object.assign(project, projectData);
        return await this.projectRepository.save(project);
    }
}
