import { Module } from '@nestjs/common';
import { AnimalVaccinationService } from './animal_vaccination.service';
import { AnimalVaccinationController } from './animal_vaccination.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { AnimalVaccination } from './model/animal_vaccination.model';

@Module({
  imports: [
    SequelizeModule.forFeature([AnimalVaccination]),
  ],
  controllers: [AnimalVaccinationController],
  providers: [AnimalVaccinationService]
})
export class AnimalVaccinationModule {}
