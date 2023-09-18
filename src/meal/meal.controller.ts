import {
  Controller, Body, Param,
  Post, Get, Put, Delete,
  HttpCode, HttpException,
  UseGuards
} from '@nestjs/common';
import { MealService } from './meal.service';
import { CreateMealDto } from './dto/create-meal.dto';
import { UpdateMealDto } from './dto/update-meal.dto';
import { Meal } from './model/meal.model';
import { ApiTags, ApiOperation, ApiResponse } from "@nestjs/swagger";
import { Roles } from '../decorators/roles-auth.decorator';
import { RolesGuard } from '../guards/roles.guard';

@ApiTags('Meals')
@Controller('meal')
export class MealController {
  constructor(private readonly mealService: MealService) {}
  @ApiOperation({summary:"Create meal"})
  @ApiResponse({status: 200, description: 'New meal', type: [Meal]})
  @Post()
  async createMeal(@Body() createMealDto: CreateMealDto):Promise<Meal>{
    const meal = await this.mealService.createMeal(createMealDto);
    return meal;
  }

  @ApiOperation({summary:"Get all meals"})
  @ApiResponse({status: 200, description: 'List of meals', type: [Meal]})
  @Get()
  async getAllMeals():Promise<Meal[]>{
    const meals = await this.mealService.getAllMeals();
    return meals;
  }

  @ApiOperation({summary:"Get meal by Id"})
  @ApiResponse({status: 200, description: 'Meal by Id', type: [Meal]})
  @Get(':id')
  async getMealById(@Param('id') id: string):Promise<Meal>{
    const meal = await this.mealService.getMealById(+id);
    return meal;
  }

  @ApiOperation({summary:"Update meal by Id"})
  @ApiResponse({status: 200, description: 'Updated meal', type: [Meal]})
  @Put(':id')
  async updateMealById(@Param('id') id:string, @Body() updateComanyDto: UpdateMealDto):Promise<Meal>{
    const meal = await this.mealService.updateMealById(+id, updateComanyDto);
    return meal;
  }

  @ApiOperation({summary:"Delete meal by Id"})
  @ApiResponse({status: 200, description: 'Deleted meal', type: [Meal]})
  @Delete(':id')
  async deleteMealById(@Param('id') id: string) {
    const meal = await this.mealService.deleteMealById(+id);
    return meal;
  }
}
