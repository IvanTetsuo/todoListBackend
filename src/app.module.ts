import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { User } from './entities/user.entity';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { ProjectModule } from './project/project.module';
import { DeskController } from './desk/desk.controller';
import { DeskModule } from './desk/desk.module';
import { ColumnController } from './column/column.controller';
import { ColumnModule } from './column/column.module';
import { TaskModule } from './task/task.module';
import { Project } from './entities/project.entity';
import { Desk } from './entities/desk.entity';
import { ColumnBox } from './entities/column.entity';
import { Task } from './entities/task.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.development.env',
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [
        User,
        Project,
        Desk,
        ColumnBox,
        Task,
        // __dirname + '/../**/*.entity{.ts,.js}',
      ],
      synchronize: true,
    }),
    UserModule,
    AuthModule,
    ProjectModule,
    DeskModule,
    ColumnModule,
    TaskModule,
  ],
  controllers: [
    AppController,
    AuthController,
    DeskController,
    ColumnController,
  ],
  providers: [AppService, AuthService],
})
export class AppModule {}
