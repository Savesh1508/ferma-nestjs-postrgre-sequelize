import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Admin } from './model/admin.model';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { Role } from 'src/roles/model/role.model';
import { RolesModule } from 'src/roles/roles.module';
import { AdminRoles } from 'src/roles/model/admin-roles.model';
import { JwtModule } from '@nestjs/jwt';
import { MailModule } from 'src/mail/mail.module';

@Module({
  imports: [
    SequelizeModule.forFeature([Admin, Role, AdminRoles]),
    JwtModule.register({}),
    MailModule,
    RolesModule
  ],
  controllers: [AdminController],
  providers: [AdminService],
  exports: [AdminService]
})
export class AdminModule {}




