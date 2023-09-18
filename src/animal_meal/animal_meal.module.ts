import { Module } from '@nestjs/common';
import { AnimalMealService } from './animal_meal.service';
import { AnimalMealController } from './animal_meal.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { AnimalMeal } from './model/animal_meal.model';

@Module({
  imports: [
    SequelizeModule.forFeature([AnimalMeal]),
  ],
  controllers: [AnimalMealController],
  providers: [AnimalMealService]
})
export class AnimalMealModule {}
