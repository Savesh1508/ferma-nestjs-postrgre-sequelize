import { BadRequestException, HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { CreateIllDto } from "./dto/create-ill.dto";
import { UpdateIllDto } from "./dto/update-ill.dto";
import { Ill } from "./model/ill.model";

@Injectable()
export class IllService {
  constructor(
    @InjectModel(Ill) private illRepo: typeof Ill,
  ){}

  async createIll(createIllDto:CreateIllDto) {
    const ill = await this.illRepo.create(createIllDto);
    return ill;
  }

  async getAllIlls():Promise<Ill[]> {
    const ills = await this.illRepo.findAll({include: {all: true}});
    return ills;
  }

  async getIllById(id:number) {
    const ill = await this.illRepo.findOne({where: {id}, include: {all: true}});
    return ill;
  }

  async updateIllById(id:number, updateIllDto:UpdateIllDto):Promise<Ill> {
    const ill = await this.illRepo.update(updateIllDto, {where: {id}, returning: true});
    return ill[1][0].dataValues;
  }

  async deleteIllById(id:number) {
    const ill = await this.illRepo.destroy({where: {id}})
    if (!ill) {
      throw new HttpException('Ill not found!', HttpStatus.NOT_FOUND);
    }
    return {message: "Ill has deleted!"};
  }
}