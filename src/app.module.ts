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


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal:true,
      envFilePath: '.development.env',
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'admin',
      password: 'notasecret',
      database: 'todo_list',
      entities: [
        User,
        // __dirname + '/../**/*.entity{.ts,.js}',
      ],
      synchronize: true,
    }),
    UserModule,
    AuthModule,
    ProjectModule,
  ],
  controllers: [AppController, AuthController],
  providers: [AppService, AuthService],
})
export class AppModule {}
