import { Module } from '@nestjs/common';
import { IllService } from './ill.service';
import { IllController } from './ill.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Ill } from './model/ill.model';

@Module({
  imports: [
    SequelizeModule.forFeature([Ill]),
  ],
  controllers: [IllController],
  providers: [IllService]
})
export class IllModule {}
