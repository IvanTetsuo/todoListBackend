import { Controller, HttpException, HttpStatus, Body, Post, Get, Delete, Param, Patch } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ProjectService } from './project.service';
import { Project } from 'src/entities/project.entity';

@ApiTags('Проект')
@Controller('project')
export class ProjectController {
    constructor(private projectService: ProjectService) {}

    @Post('create-new-project')
    async createProject(@Body() projectData: Project) {
        return this.projectService.createProject(projectData);
    }

    @Get('get-all-projects')
    async getAllProjects() {
        try {
            return await this.projectService.getAllProjects();
        } catch(err) {
            throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
        }
    }

    @Delete('delete-project/:projectID')
    async deleteProject(@Param('projectID') projectID: string) {
        if (!projectID) {
            throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
        }
        try {
            return await this.projectService.deleteProject(projectID);
        } catch(err) {
            throw new HttpException(err.message, HttpStatus.FORBIDDEN);
        }
    }

    //при ошибке, статус 200
    @Get('get-by/:projectID')
    async getProjectById(@Param('projectID') projectID: string) {
        if (!projectID) {
            throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
        }
        try {
            return await this.projectService.getProjectById(projectID);
        } catch(err) {
            throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
        }
    }

    @Patch('update-project/:projectID')
    async updateProjectById(@Param('projectID') projectID: string,
    @Body() projectData: Project) {
        try {
            return await this.projectService.updateProjectById(projectID, projectData);
        } catch(err) {
            throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
        }
    }
}
