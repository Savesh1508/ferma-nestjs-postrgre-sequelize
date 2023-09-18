import {
  Controller, Body, Param,
  Post, Get, Put, Delete,
  HttpCode, HttpException,
  UseGuards
} from '@nestjs/common';
import { AnimalService } from './animal.service';
import { CreateAnimalDto } from './dto/create-animal.dto';
import { UpdateAnimalDto } from './dto/update-animal.dto';
import { Animal } from './model/animal.model';
import { ApiTags, ApiOperation, ApiResponse } from "@nestjs/swagger";
import { Roles } from '../decorators/roles-auth.decorator';
import { RolesGuard } from '../guards/roles.guard';

@ApiTags('Animals')
@Controller('animal')
export class AnimalController {
  constructor(private readonly animalService: AnimalService) {}
  @ApiOperation({summary:"Create animal"})
  @ApiResponse({status: 200, description: 'New animal', type: [Animal]})
  @Post()
  async createAnimal(@Body() createAnimalDto: CreateAnimalDto):Promise<Animal>{
    const animal = await this.animalService.createAnimal(createAnimalDto);
    return animal;
  }

  @ApiOperation({summary:"Get all animals"})
  @ApiResponse({status: 200, description: 'List of animals', type: [Animal]})
  @Get()
  async getAllAnimals():Promise<Animal[]>{
    const animals = await this.animalService.getAllAnimals();
    return animals;
  }

  @ApiOperation({summary:"Get animal by Id"})
  @ApiResponse({status: 200, description: 'Animal by Id', type: [Animal]})
  @Get(':id')
  async getAnimalById(@Param('id') id: string):Promise<Animal>{
    const animal = await this.animalService.getAnimalById(+id);
    return animal;
  }

  @ApiOperation({summary:"Update animal by Id"})
  @ApiResponse({status: 200, description: 'Updated animal', type: [Animal]})
  @Put(':id')
  async updateAnimalById(@Param('id') id:string, @Body() updateComanyDto: UpdateAnimalDto):Promise<Animal>{
    const animal = await this.animalService.updateAnimalById(+id, updateComanyDto);
    return animal;
  }

  @ApiOperation({summary:"Delete animal by Id"})
  @ApiResponse({status: 200, description: 'Deleted animal', type: [Animal]})
  @Delete(':id')
  async deleteAnimalById(@Param('id') id: string) {
    const animal = await this.animalService.deleteAnimalById(+id);
    return animal;
  }
}
