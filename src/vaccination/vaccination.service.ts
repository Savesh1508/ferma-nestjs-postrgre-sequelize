import { BadRequestException, HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { CreateVaccinationDto } from "./dto/create-vaccination.dto";
import { UpdateVaccinationDto } from "./dto/update-vaccination.dto";
import { Vaccination } from "./model/vaccination.model";

@Injectable()
export class VaccinationService {
  constructor(
    @InjectModel(Vaccination) private vaccinationRepo: typeof Vaccination,
  ){}

  async createVaccination(createVaccinationDto:CreateVaccinationDto) {
    const vaccination = await this.vaccinationRepo.create(createVaccinationDto);
    return vaccination;
  }

  async getAllVaccinations():Promise<Vaccination[]> {
    const vaccinations = await this.vaccinationRepo.findAll({include: {all: true}});
    return vaccinations;
  }

  async getVaccinationById(id:number) {
    const vaccination = await this.vaccinationRepo.findOne({where: {id}, include: {all: true}});
    return vaccination;
  }

  async updateVaccinationById(id:number, updateVaccinationDto:UpdateVaccinationDto):Promise<Vaccination> {
    const vaccination = await this.vaccinationRepo.update(updateVaccinationDto, {where: {id}, returning: true});
    return vaccination[1][0].dataValues;
  }

  async deleteVaccinationById(id:number) {
    const vaccination = await this.vaccinationRepo.destroy({where: {id}})
    if (!vaccination) {
      throw new HttpException('Vaccination not found!', HttpStatus.NOT_FOUND);
    }
    return {message: "Vaccination has deleted!"};
  }
}