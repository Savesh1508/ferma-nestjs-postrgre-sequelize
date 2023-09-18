import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { MealModule } from './meal/meal.module';
import { VaccinationModule } from './vaccination/vaccination.module';
import { WorkTypeModule } from './work_type/work_type.module';
import { BlockModule } from './block/block.module';
import { WorkerModule } from './worker/worker.module';
import { ConfigModule } from "@nestjs/config";
import { SequelizeModule } from "@nestjs/sequelize";
import { IllModule } from './ill/ill.module';
import { AnimalVaccinationModule } from './animal_vaccination/animal_vaccination.module';
import { AnimalModule } from './animal/animal.module';
import { Admin } from './admin/model/admin.model';
import { Animal } from './animal/model/animal.model';
import { AnimalMeal } from './animal_meal/model/animal_meal.model';
import { AnimalVaccination } from './animal_vaccination/model/animal_vaccination.model';
import { Block } from './block/model/block.model';
import { Ill } from './ill/model/ill.model';
import { AdminRoles } from './roles/model/admin-roles.model';
import { Meal } from './meal/model/meal.model';
import { Role } from './roles/model/role.model';
import { Vaccination } from './vaccination/model/vaccination.model';
import { WorkType } from './work_type/model/work_type.model';
import { Worker } from './worker/model/worker.model';
import { WorkerRoles } from './roles/model/worker-roles.model';
import { AdminModule } from './admin/admin.module';
import { AnimalMealModule } from './animal_meal/animal_meal.module';
import { RolesModule } from './roles/roles.module';
import { SharedModule } from './shared/shared.module';

@Module({
  imports: [
    ConfigModule.forRoot({envFilePath: '.env', isGlobal: true}),
    SequelizeModule.forRoot({
      dialect:"postgres",
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: String(process.env.POSTGRES_PASSWORD),
      database: process.env.POSTGRES_DB,
      models: [
        Admin,
        Animal,
        AnimalMeal,
        AnimalVaccination,
        Block,
        Ill,
        Meal,
        Vaccination,
        WorkType,
        Worker,
        Role,
        AdminRoles,
        WorkerRoles
      ],
      autoLoadModels: true,
      logging: true
    }),
    AdminModule,
    AnimalModule,
    AnimalMealModule,
    AnimalVaccinationModule,
    BlockModule,
    IllModule,
    MealModule,
    VaccinationModule,
    WorkTypeModule,
    WorkerModule,
    RolesModule,
    SharedModule
  ],
  controllers: [],
  providers: [AppService],
  exports: []
})
export class AppModule {}
