import {
  Controller, Body, Param,
  Post, Get, Put, Delete,
  HttpCode, HttpException,
  UseGuards
} from '@nestjs/common';
import { AnimalMealService } from './animal_meal.service';
import { CreateAnimalMealDto } from './dto/create-animal_meal.dto';
import { UpdateAnimalMealDto } from './dto/update-animal_meal.dto';
import { AnimalMeal } from './model/animal_meal.model';
import { ApiTags, ApiOperation, ApiResponse } from "@nestjs/swagger";
import { Roles } from '../decorators/roles-auth.decorator';
import { RolesGuard } from '../guards/roles.guard';

@ApiTags('AnimalMeals')
@Controller('animal_meal')
export class AnimalMealController {
  constructor(private readonly animalMealService: AnimalMealService) {}
  @ApiOperation({summary:"Create animal meal"})
  @ApiResponse({status: 200, description: 'New animal meal', type: [AnimalMeal]})
  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @Post()
  async createAnimalMeal(@Body() createAnimalMealDto: CreateAnimalMealDto):Promise<AnimalMeal>{
    const animalMeal = await this.animalMealService.createAnimalMeal(createAnimalMealDto);
    return animalMeal;
  }

  @ApiOperation({summary:"Get all animal meals"})
  @ApiResponse({status: 200, description: 'List of animal meals', type: [AnimalMeal]})
  @Get()
  async getAllAnimalMeals():Promise<AnimalMeal[]>{
    const animalMeals = await this.animalMealService.getAllAnimalMeals();
    return animalMeals;
  }

  @ApiOperation({summary:"Get animal meal by Id"})
  @ApiResponse({status: 200, description: 'Animal meal by Id', type: [AnimalMeal]})
  @Get(':id')
  async getAnimalMealById(@Param('id') id: string):Promise<AnimalMeal>{
    const animalMeal = await this.animalMealService.getAnimalMealById(+id);
    return animalMeal;
  }

  @ApiOperation({summary:"Update animal meal by Id"})
  @ApiResponse({status: 200, description: 'Updated animal meal', type: [AnimalMeal]})
  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @Put(':id')
  async updateAnimalMealById(@Param('id') id:string, @Body() updateComanyDto: UpdateAnimalMealDto):Promise<AnimalMeal>{
    const animalMeal = await this.animalMealService.updateAnimalMealById(+id, updateComanyDto);
    return animalMeal;
  }

  @ApiOperation({summary:"Delete animal meal by Id"})
  @ApiResponse({status: 200, description: 'Deleted animalMeal', type: [AnimalMeal]})
  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @Delete(':id')
  async deleteAnimalMealById(@Param('id') id: string) {
    const animalMeal = await this.animalMealService.deleteAnimalMealById(+id);
    return animalMeal;
  }
}
