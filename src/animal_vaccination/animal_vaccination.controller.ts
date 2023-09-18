import {
  Controller, Body, Param,
  Post, Get, Put, Delete,
  HttpCode, HttpException,
  UseGuards
} from '@nestjs/common';
import { AnimalVaccinationService } from './animal_vaccination.service';
import { CreateAnimalVaccinationDto } from './dto/create-animal_vaccination.dto';
import { UpdateAnimalVaccinationDto } from './dto/update-animal_vaccination.dto';
import { AnimalVaccination } from './model/animal_vaccination.model';
import { ApiTags, ApiOperation, ApiResponse } from "@nestjs/swagger";
import { Roles } from '../decorators/roles-auth.decorator';
import { RolesGuard } from '../guards/roles.guard';

@ApiTags('AnimalVaccinations')
@Controller('animal_vaccination')
export class AnimalVaccinationController {
  constructor(private readonly animalVaccinationService: AnimalVaccinationService) {}
  @ApiOperation({summary:"Create animal vaccination"})
  @ApiResponse({status: 200, description: 'New animal vaccination', type: [AnimalVaccination]})
  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @Post()
  async createAnimalVaccination(@Body() createAnimalVaccinationDto: CreateAnimalVaccinationDto):Promise<AnimalVaccination>{
    const animalVaccination = await this.animalVaccinationService.createAnimalVaccination(createAnimalVaccinationDto);
    return animalVaccination;
  }

  @ApiOperation({summary:"Get all animal vaccinations"})
  @ApiResponse({status: 200, description: 'List of animal vaccinations', type: [AnimalVaccination]})
  @Get()
  async getAllAnimalVaccinations():Promise<AnimalVaccination[]>{
    const animalVaccinations = await this.animalVaccinationService.getAllAnimalVaccinations();
    return animalVaccinations;
  }

  @ApiOperation({summary:"Get animal vaccination by Id"})
  @ApiResponse({status: 200, description: 'Animal vaccination by Id', type: [AnimalVaccination]})
  @Get(':id')
  async getAnimalVaccinationById(@Param('id') id: string):Promise<AnimalVaccination>{
    const animalVaccination = await this.animalVaccinationService.getAnimalVaccinationById(+id);
    return animalVaccination;
  }

  @ApiOperation({summary:"Update animal vaccination by Id"})
  @ApiResponse({status: 200, description: 'Updated animal vaccination', type: [AnimalVaccination]})
  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @Put(':id')
  async updateAnimalVaccinationById(@Param('id') id:string, @Body() updateComanyDto: UpdateAnimalVaccinationDto):Promise<AnimalVaccination>{
    const animalVaccination = await this.animalVaccinationService.updateAnimalVaccinationById(+id, updateComanyDto);
    return animalVaccination;
  }

  @ApiOperation({summary:"Delete animal vaccination by Id"})
  @ApiResponse({status: 200, description: 'Deleted animalVaccination', type: [AnimalVaccination]})
  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @Delete(':id')
  async deleteAnimalVaccinationById(@Param('id') id: string) {
    const animalVaccination = await this.animalVaccinationService.deleteAnimalVaccinationById(+id);
    return animalVaccination;
  }
}
