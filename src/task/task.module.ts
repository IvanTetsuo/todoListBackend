import { Module } from '@nestjs/common';
import { TaskController } from './task.controller';
import { TaskService } from './task.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from 'src/entities/task.entity';
import { UserModule } from 'src/user/user.module';
import { ColumnBox } from 'src/entities/column.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Task]),
    UserModule,
    TypeOrmModule.forFeature([ColumnBox]),
  ],
  controllers: [TaskController],
  providers: [TaskService],
  exports: [TaskService],
})
export class TaskModule {}
