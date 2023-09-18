import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Worker } from './model/worker.model';
import { WorkerService } from './worker.service';
import { WorkerController } from './worker.controller';
import { Role } from 'src/roles/model/role.model';
import { RolesModule } from 'src/roles/roles.module';
import { WorkerRoles } from 'src/roles/model/worker-roles.model';
import { JwtModule } from '@nestjs/jwt';
import { MailModule } from 'src/mail/mail.module';

@Module({
  imports: [
    SequelizeModule.forFeature([Worker, Role, WorkerRoles]),
    JwtModule.register({}),
    MailModule,
    RolesModule
  ],
  controllers: [WorkerController],
  providers: [WorkerService],
  exports: [WorkerService]
})
export class WorkerModule {}




