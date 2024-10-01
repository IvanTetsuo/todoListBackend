import { Module } from '@nestjs/common';
import { ColumnService } from './column.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ColumnBox } from 'src/entities/column.entity';
import { ColumnController } from './column.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([ColumnBox]),
  ],
  controllers: [ColumnController],
  providers: [ColumnService],
  exports: [ColumnService]
})
export class ColumnModule {}
