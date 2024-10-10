import { Controller, HttpException, HttpStatus, Body, Post, Get, Delete, Param, Patch, UseGuards, Req, UseInterceptors, ClassSerializerInterceptor } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ProjectService } from './project.service';
import { Project } from 'src/entities/project.entity';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ReqUserID } from 'src/common/user/user.decorator';
import { User } from 'src/entities/user.entity';
import { CreateProjectDto } from './dto/create-project.dto';

@ApiTags('Проект')
@UseInterceptors(ClassSerializerInterceptor)
@UseGuards(JwtAuthGuard)
@Controller('project')
export class ProjectController {
    constructor(private projectService: ProjectService) {}

    @Post('create-new-project')
    async createProject(@Body() projectData: CreateProjectDto, @ReqUserID() userID: string) {
        return this.projectService.createProject(projectData, userID);
    }

    @Get('get-all-projects')
    async getAllProjects(@ReqUserID() userID: string) {
        try {
            return await this.projectService.getAllProjects(userID);
        } catch(err) {
            throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
        }
    }

    @Delete('delete-project/:projectID')
    async deleteProject(@Param('projectID') projectID: string, @ReqUserID() userID: string) {
        if (!projectID) {
            throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
        }
        try {
            return await this.projectService.deleteProject(projectID, userID);
        } catch(err) {
            throw new HttpException(err.message, HttpStatus.FORBIDDEN);
        }
    }

    //при ошибке, статус 200
    @Get('get-by/:projectID')
    async getProjectById(@Param('projectID') projectID: string, @ReqUserID() userID: string) {
        if (!projectID) {
            throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
        }
        try {
            return await this.projectService.getProjectById(projectID, userID);
        } catch(err) {
            throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
        }
    }

    @Patch('update-project/:projectID')
    async updateProjectById(
        @Param('projectID') projectID: string,
        @Body() projectData: CreateProjectDto,
        @ReqUserID() userID: string
    ) {
        try {
            return await this.projectService.updateProjectById(projectID, projectData, userID);
        } catch(err) {
            throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
        }
    }
}
