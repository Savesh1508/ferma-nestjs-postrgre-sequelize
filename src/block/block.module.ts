import { Module } from '@nestjs/common';
import { BlockService } from './block.service';
import { BlockController } from './block.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Block } from './model/block.model';

@Module({
  imports: [
    SequelizeModule.forFeature([Block]),
  ],
  controllers: [BlockController],
  providers: [BlockService]
})
export class BlockModule {}
