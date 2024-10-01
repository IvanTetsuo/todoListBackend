import { Module } from '@nestjs/common';
import { DeskService } from './desk.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DeskController } from './desk.controller';
import { Desk } from 'src/entities/desk.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Desk]),
  ],
  controllers: [DeskController],
  providers: [DeskService],
  exports: [DeskModule],
})
export class DeskModule {}
