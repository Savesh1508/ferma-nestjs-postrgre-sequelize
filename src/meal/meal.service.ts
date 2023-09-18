import { BadRequestException, HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { CreateMealDto } from "./dto/create-meal.dto";
import { UpdateMealDto } from "./dto/update-meal.dto";
import { Meal } from "./model/meal.model";

@Injectable()
export class MealService {
  constructor(
    @InjectModel(Meal) private mealRepo: typeof Meal,
  ){}

  async createMeal(createMealDto:CreateMealDto) {
    const meal = await this.mealRepo.create(createMealDto);
    return meal;
  }

  async getAllMeals():Promise<Meal[]> {
    const meals = await this.mealRepo.findAll({include: {all: true}});
    return meals;
  }

  async getMealById(id:number) {
    const meal = await this.mealRepo.findOne({where: {id}, include: {all: true}});
    return meal;
  }

  async updateMealById(id:number, updateMealDto:UpdateMealDto):Promise<Meal> {
    const meal = await this.mealRepo.update(updateMealDto, {where: {id}, returning: true});
    return meal[1][0].dataValues;
  }

  async deleteMealById(id:number) {
    const meal = await this.mealRepo.destroy({where: {id}})
    if (!meal) {
      throw new HttpException('Meal not found!', HttpStatus.NOT_FOUND);
    }
    return {message: "Meal has deleted!"};
  }
}