import { BadRequestException, HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { CreateBlockDto } from "./dto/create-block.dto";
import { UpdateBlockDto } from "./dto/update-block.dto";
import { Block } from "./model/block.model";

@Injectable()
export class BlockService {
  constructor(
    @InjectModel(Block) private blockRepo: typeof Block,
  ){}

  async createBlock(createBlockDto:CreateBlockDto) {
    const block = await this.blockRepo.create(createBlockDto);
    return block;
  }

  async getAllBlocks():Promise<Block[]> {
    const blocks = await this.blockRepo.findAll({include: {all: true}});
    return blocks;
  }

  async getBlockById(id:number) {
    const block = await this.blockRepo.findOne({where: {id}, include: {all: true}});
    return block;
  }

  async updateBlockById(id:number, updateBlockDto:UpdateBlockDto):Promise<Block> {
    const block = await this.blockRepo.update(updateBlockDto, {where: {id}, returning: true});
    return block[1][0].dataValues;
  }

  async deleteBlockById(id:number) {
    const block = await this.blockRepo.destroy({where: {id}})
    if (!block) {
      throw new HttpException('Block not found!', HttpStatus.NOT_FOUND);
    }
    return {message: "Block has deleted!"};
  }
}