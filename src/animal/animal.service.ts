import { BadRequestException, HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { CreateAnimalDto } from "./dto/create-animal.dto";
import { UpdateAnimalDto } from "./dto/update-animal.dto";
import { Animal } from "./model/animal.model";

@Injectable()
export class AnimalService {
  constructor(
    @InjectModel(Animal) private animalRepo: typeof Animal,
  ){}

  async createAnimal(createAnimalDto:CreateAnimalDto) {
    const animal = await this.animalRepo.create(createAnimalDto);
    return animal;
  }

  async getAllAnimals():Promise<Animal[]> {
    const animals = await this.animalRepo.findAll({include: {all: true}});
    return animals;
  }

  async getAnimalById(id:number) {
    const animal = await this.animalRepo.findOne({where: {id}, include: {all: true}});
    return animal;
  }

  async updateAnimalById(id:number, updateAnimalDto:UpdateAnimalDto):Promise<Animal> {
    const animal = await this.animalRepo.update(updateAnimalDto, {where: {id}, returning: true});
    return animal[1][0].dataValues;
  }

  async deleteAnimalById(id:number) {
    const animal = await this.animalRepo.destroy({where: {id}})
    if (!animal) {
      throw new HttpException('Animal not found!', HttpStatus.NOT_FOUND);
    }
    return {message: "Animal has deleted!"};
  }
}