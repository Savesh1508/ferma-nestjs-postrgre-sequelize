import {
  Controller, Body, Param,
  Post, Get, Put, Delete,
  HttpCode, HttpException,
  UseGuards, Res, HttpStatus
} from '@nestjs/common';
import { Response } from "express";
import { LoginAdminDto } from "./dto/login-admin.dto";
import { AdminGuard } from "src/guards/admin.guard";
import { CookieGetter } from "src/decorators/cookieGetter.decorator";
import { AdminService } from './admin.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { Admin } from './model/admin.model';
import { ApiTags, ApiOperation, ApiResponse } from "@nestjs/swagger";
import { Roles } from 'src/decorators/roles-auth.decorator';
import { RolesGuard } from 'src/guards/roles.guard';
import { AddRoleAdminDto } from './dto/add-role.dto';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { UserSelfGuard } from '../guards/user-self.guard';

@ApiTags('Admins')
@Controller('admins')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @ApiOperation({summary:"Create admin"})
  @ApiResponse({status: 200, description: 'New admin', type: [Admin]})
  @UseGuards(RolesGuard)
  @Roles('ADMIN')
  @Post()
  async createAdmin(
    @Body() createAdminDto: CreateAdminDto,
    @Res({ passthrough: true }) res: Response
  ) {
    const newAdminTokens = await this.adminService.createAdmin(createAdminDto, res);
    return newAdminTokens;
  }

  @ApiOperation({summary:"Get all admins"})
  @ApiResponse({status: 200, description: 'List of admins', type: [Admin]})
  @Get()
  async getAllAdmins():Promise<Admin[]>{
    const admins = await this.adminService.getAllAdmins();
    return admins;
  }

  @ApiOperation({summary:"Get admin by Id"})
  @ApiResponse({status: 200, description: 'Admin by Id', type: [Admin]})
  @Get(':id')
  async getAdminById(@Param('id') id: string):Promise<Admin>{
    const admin = await this.adminService.getAdminById(+id);
    return admin;
  }

  @ApiOperation({summary:"Get admin by email"})
  @ApiResponse({status: 200, description: 'Admin by email', type: [Admin]})
  @Post('email')
  async getAdminByEmail(@Body('email') email:string ):Promise<Admin>{
    const admin = await this.adminService.getAdminByEmail(email);
    return admin;
  }

  @ApiOperation({summary:"Update admin by Id"})
  @ApiResponse({status: 200, description: 'Updated admin', type: [Admin]})
  @UseGuards(UserSelfGuard)
  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async updateAdminById(@Param('id') id:string, @Body() updateComanyDto: UpdateAdminDto):Promise<Admin>{
    const admin = await this.adminService.updateAdminById(+id, updateComanyDto);
    return admin;
  }

  @ApiOperation({summary:"Delete admin by Id"})
  @ApiResponse({status: 200, description: 'Deleted admin', type: [Admin]})
  @UseGuards(UserSelfGuard)
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async deleteAdminById(@Param('id') id: string) {
    const admin = await this.adminService.deleteAdminById(+id);
    return admin;
  }

  @ApiOperation({ summary: "Register admin" })
  @ApiResponse({ status: 200, type: Admin })
  @Post("signup")
  registration(
    @Body() createAdminDto: CreateAdminDto,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.adminService.registration(createAdminDto, res);
  }

  @ApiOperation({ summary: "Login admin" })
  @ApiResponse({ status: 200, type: Admin })
  @UseGuards(AdminGuard)
  @Post("signin")
  login(
    @Body() loginAdminDto: LoginAdminDto,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.adminService.login(loginAdminDto, res);
  }

  @ApiOperation({ summary: "Logout admin" })
  @ApiResponse({ status: 200, type: Admin })
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard)
  @Post("logout")
  logout(
    @CookieGetter('refresh_token') refreshToken: string,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.adminService.logout(refreshToken, res);
  }

  @ApiOperation({ summary: "Activate admin" })
  @ApiResponse({ status: 200, type: [Admin] })
  @Get('activate/:link')
  activate(@Param('link') link:string) {
    return this.adminService.activate(link);
  }

  @UseGuards(AdminGuard)
  @Post(':id/refresh')
  refresh(
    @Param('id') id:string,
    @CookieGetter('refresh_token') refreshToken: string,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.adminService.refreshToken(+id, refreshToken, res);
  }

  @ApiOperation({summary:"Add role to admin"})
  @ApiResponse({status: 200, description: 'Updated admin', type: [Admin]})
  @HttpCode(200)
  @UseGuards(RolesGuard)
  @Roles('ADMIN')
  @Post('add_role')
  addRole(@Body() addRoleAdminDto: AddRoleAdminDto) {
    return this.adminService.addRole(addRoleAdminDto);
  }

  @ApiOperation({summary:"Remove role from admin"})
  @ApiResponse({status: 200, description: 'Updated admin', type: [Admin]})
  @HttpCode(200)
  @UseGuards(RolesGuard)
  @Roles('ADMIN')
  @Post('remove_role')
  removeRole(@Body() addRoleAdminDto: AddRoleAdminDto) {
    return this.adminService.removeRole(addRoleAdminDto);
  }
}
