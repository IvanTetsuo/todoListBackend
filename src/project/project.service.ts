import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Project } from 'src/entities/project.entity';
import { Repository } from 'typeorm';


@Injectable()
export class ProjectService {
    constructor(
        @InjectRepository(Project)
        private projectRepository: Repository<Project>,
    ) {}

    async createProject(projectData: Project): Promise<Project> {
        const newProject = this.projectRepository.create(projectData);
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
