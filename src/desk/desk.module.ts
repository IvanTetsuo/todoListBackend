import { Module } from '@nestjs/common';
import { DeskService } from './desk.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DeskController } from './desk.controller';
import { Desk } from 'src/entities/desk.entity';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Desk]),
    UserModule,
  ],
  controllers: [DeskController],
  providers: [DeskService],
  exports: [DeskService],
})
export class DeskModule {}
