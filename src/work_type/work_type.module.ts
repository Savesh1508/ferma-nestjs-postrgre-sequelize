import { Module } from '@nestjs/common';
import { WorkTypeService } from './work_type.service';
import { WorkTypeController } from './work_type.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { WorkType } from './model/work_type.model';

@Module({
  imports: [
    SequelizeModule.forFeature([WorkType]),
  ],
  controllers: [WorkTypeController],
  providers: [WorkTypeService]
})
export class WorkTypeModule {}
