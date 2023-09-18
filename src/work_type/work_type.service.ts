import { BadRequestException, HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { CreateWorkTypeDto } from "./dto/create-work_type.dto";
import { UpdateWorkTypeDto } from "./dto/update-work_type.dto";
import { WorkType } from "./model/work_type.model";

@Injectable()
export class WorkTypeService {
  constructor(
    @InjectModel(WorkType) private workTypeRepo: typeof WorkType,
  ){}

  async createWorkType(createWorkTypeDto:CreateWorkTypeDto) {
    const workType = await this.workTypeRepo.create(createWorkTypeDto);
    return workType;
  }

  async getAllWorkTypes():Promise<WorkType[]> {
    const workTypes = await this.workTypeRepo.findAll({include: {all: true}});
    return workTypes;
  }

  async getWorkTypeById(id:number) {
    const workType = await this.workTypeRepo.findOne({where: {id}, include: {all: true}});
    return workType;
  }

  async updateWorkTypeById(id:number, updateWorkTypeDto:UpdateWorkTypeDto):Promise<WorkType> {
    const workType = await this.workTypeRepo.update(updateWorkTypeDto, {where: {id}, returning: true});
    return workType[1][0].dataValues;
  }

  async deleteWorkTypeById(id:number) {
    const workType = await this.workTypeRepo.destroy({where: {id}})
    if (!workType) {
      throw new HttpException('Work type not found!', HttpStatus.NOT_FOUND);
    }
    return {message: "Work type has deleted!"};
  }
}