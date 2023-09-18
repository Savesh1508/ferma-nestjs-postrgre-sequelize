import {
  Controller, Body, Param,
  Post, Get, Put, Delete,
  HttpCode, HttpException,
  UseGuards
} from '@nestjs/common';
import { VaccinationService } from './vaccination.service';
import { CreateVaccinationDto } from './dto/create-vaccination.dto';
import { UpdateVaccinationDto } from './dto/update-vaccination.dto';
import { Vaccination } from './model/vaccination.model';
import { ApiTags, ApiOperation, ApiResponse } from "@nestjs/swagger";
import { Roles } from '../decorators/roles-auth.decorator';
import { RolesGuard } from '../guards/roles.guard';

@ApiTags('Vaccinations')
@Controller('vaccination')
export class VaccinationController {
  constructor(private readonly vaccinationService: VaccinationService) {}
  @ApiOperation({summary:"Create vaccination"})
  @ApiResponse({status: 200, description: 'New vaccination', type: [Vaccination]})
  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @Post()
  async createVaccination(@Body() createVaccinationDto: CreateVaccinationDto):Promise<Vaccination>{
    const vaccination = await this.vaccinationService.createVaccination(createVaccinationDto);
    return vaccination;
  }

  @ApiOperation({summary:"Get all vaccinations"})
  @ApiResponse({status: 200, description: 'List of vaccinations', type: [Vaccination]})
  @Get()
  async getAllVaccinations():Promise<Vaccination[]>{
    const vaccinations = await this.vaccinationService.getAllVaccinations();
    return vaccinations;
  }

  @ApiOperation({summary:"Get vaccination by Id"})
  @ApiResponse({status: 200, description: 'Vaccination by Id', type: [Vaccination]})
  @Get(':id')
  async getVaccinationById(@Param('id') id: string):Promise<Vaccination>{
    const vaccination = await this.vaccinationService.getVaccinationById(+id);
    return vaccination;
  }

  @ApiOperation({summary:"Update vaccination by Id"})
  @ApiResponse({status: 200, description: 'Updated vaccination', type: [Vaccination]})
  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @Put(':id')
  async updateVaccinationById(@Param('id') id:string, @Body() updateComanyDto: UpdateVaccinationDto):Promise<Vaccination>{
    const vaccination = await this.vaccinationService.updateVaccinationById(+id, updateComanyDto);
    return vaccination;
  }

  @ApiOperation({summary:"Delete vaccination by Id"})
  @ApiResponse({status: 200, description: 'Deleted vaccination', type: [Vaccination]})
  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @Delete(':id')
  async deleteVaccinationById(@Param('id') id: string) {
    const vaccination = await this.vaccinationService.deleteVaccinationById(+id);
    return vaccination;
  }
}
