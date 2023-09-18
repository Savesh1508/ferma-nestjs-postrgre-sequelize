import { BadRequestException, HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { CreateAnimalVaccinationDto } from "./dto/create-animal_vaccination.dto";
import { UpdateAnimalVaccinationDto } from "./dto/update-animal_vaccination.dto";
import { AnimalVaccination } from "./model/animal_vaccination.model";

@Injectable()
export class AnimalVaccinationService {
  constructor(
    @InjectModel(AnimalVaccination) private animalVaccinationRepo: typeof AnimalVaccination,
  ){}

  async createAnimalVaccination(createAnimalVaccinationDto:CreateAnimalVaccinationDto) {
    const animalVaccination = await this.animalVaccinationRepo.create(createAnimalVaccinationDto);
    return animalVaccination;
  }

  async getAllAnimalVaccinations():Promise<AnimalVaccination[]> {
    const animalVaccinations = await this.animalVaccinationRepo.findAll({include: {all: true}});
    return animalVaccinations;
  }

  async getAnimalVaccinationById(id:number) {
    const animalVaccination = await this.animalVaccinationRepo.findOne({where: {id}, include: {all: true}});
    return animalVaccination;
  }

  async updateAnimalVaccinationById(id:number, updateAnimalVaccinationDto:UpdateAnimalVaccinationDto):Promise<AnimalVaccination> {
    const animalVaccination = await this.animalVaccinationRepo.update(updateAnimalVaccinationDto, {where: {id}, returning: true});
    return animalVaccination[1][0].dataValues;
  }

  async deleteAnimalVaccinationById(id:number) {
    const animalVaccination = await this.animalVaccinationRepo.destroy({where: {id}})
    if (!animalVaccination) {
      throw new HttpException('Animal vaccination not found!', HttpStatus.NOT_FOUND);
    }
    return {message: "Animal vaccination has deleted!"};
  }
}