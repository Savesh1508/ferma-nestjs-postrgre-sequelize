import { Module } from '@nestjs/common';
import { VaccinationService } from './vaccination.service';
import { VaccinationController } from './vaccination.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Vaccination } from './model/vaccination.model';

@Module({
  imports: [
    SequelizeModule.forFeature([Vaccination]),
  ],
  controllers: [VaccinationController],
  providers: [VaccinationService]
})
export class VaccinationModule {}
