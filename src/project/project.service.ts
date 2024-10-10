import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Project } from 'src/entities/project.entity';
import { Repository } from 'typeorm';
import { UserService } from 'src/user/user.service';
import { CreateProjectDto } from './dto/create-project.dto';

@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(Project)
    private projectRepository: Repository<Project>,
    private readonly userService: UserService,
  ) {}

  async createProject(
    projectData: CreateProjectDto,
    userID: string,
  ): Promise<Project> {
    const user = await this.userService.getUserById(userID);
    const newProject = this.projectRepository.create(projectData);
    newProject.user = user;
    await this.projectRepository.save(newProject);
    return newProject;
  }

  async getAllProjects(userID: string): Promise<Project[]> {
    const user = await this.userService.getUserById(userID);
    const projects = await this.projectRepository.find({
      where: { user },
      relations: {
        user: true,
        desks: true,
      },
    });
    return projects;
  }

  async deleteProject(projectID: string, userID: string): Promise<Project> {
    const user = await this.userService.getUserById(userID);
    const [project] = await this.projectRepository.find({
      where: { id: +projectID, user },
      relations: {
        user: true,
        desks: true,
      },
    });
    if (!project) {
      throw new Error('Такого проекта не существует');
    }
    return await this.projectRepository.remove(project);
  }

  async getProjectById(projectID: string, userID: string): Promise<Project> {
    const user = await this.userService.getUserById(userID);
    const [project] = await this.projectRepository.find({
      where: { id: +projectID, user },
      relations: {
        user: true,
        desks: true,
      },
    });
    if (!project) {
      throw new Error('Такого проекта не существует');
    }
    return project;
  }

  async updateProjectById(
    projectID: string,
    projectData: CreateProjectDto,
    userID: string,
  ): Promise<Project> {
    const user = await this.userService.getUserById(userID);
    const [project] = await this.projectRepository.find({
      where: { id: +projectID, user },
      relations: {
        user: true,
        desks: true,
      },
    });
    if (!project) {
      throw new Error('Такого проекта не существует');
    }
    Object.assign(project, projectData);
    return await this.projectRepository.save(project);
  }
}
