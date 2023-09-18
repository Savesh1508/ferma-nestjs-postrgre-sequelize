import { BadRequestException, HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { CreateAnimalMealDto } from "./dto/create-animal_meal.dto";
import { UpdateAnimalMealDto } from "./dto/update-animal_meal.dto";
import { AnimalMeal } from "./model/animal_meal.model";

@Injectable()
export class AnimalMealService {
  constructor(
    @InjectModel(AnimalMeal) private animalMealRepo: typeof AnimalMeal,
  ){}

  async createAnimalMeal(createAnimalMealDto:CreateAnimalMealDto) {
    const animalMeal = await this.animalMealRepo.create(createAnimalMealDto);
    return animalMeal;
  }

  async getAllAnimalMeals():Promise<AnimalMeal[]> {
    const animalMeals = await this.animalMealRepo.findAll({include: {all: true}});
    return animalMeals;
  }

  async getAnimalMealById(id:number) {
    const animalMeal = await this.animalMealRepo.findOne({where: {id}, include: {all: true}});
    return animalMeal;
  }

  async updateAnimalMealById(id:number, updateAnimalMealDto:UpdateAnimalMealDto):Promise<AnimalMeal> {
    const animalMeal = await this.animalMealRepo.update(updateAnimalMealDto, {where: {id}, returning: true});
    return animalMeal[1][0].dataValues;
  }

  async deleteAnimalMealById(id:number) {
    const animalMeal = await this.animalMealRepo.destroy({where: {id}})
    if (!animalMeal) {
      throw new HttpException('Animal meal not found!', HttpStatus.NOT_FOUND);
    }
    return {message: "Animal meal has deleted!"};
  }
}