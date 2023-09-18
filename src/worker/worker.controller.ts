import {
  Controller, Body, Param,
  Post, Get, Put, Delete,
  HttpCode, HttpException,
  UseGuards, Res, HttpStatus
} from '@nestjs/common';
import { Response } from "express";
import { LoginWorkerDto } from "./dto/login-worker.dto";
import { WorkerGuard } from "src/guards/worker.guard";
import { CookieGetter } from "src/decorators/cookieGetter.decorator";
import { WorkerService } from './worker.service';
import { CreateWorkerDto } from './dto/create-worker.dto';
import { UpdateWorkerDto } from './dto/update-worker.dto';
import { Worker } from './model/worker.model';
import { ApiTags, ApiOperation, ApiResponse } from "@nestjs/swagger";
import { Roles } from 'src/decorators/roles-auth.decorator';
import { RolesGuard } from 'src/guards/roles.guard';
import { AddRoleWorkerDto } from './dto/add-role.dto';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { UserSelfGuard } from '../guards/user-self.guard';

@ApiTags('Workers')
@Controller('workers')
export class WorkerController {
  constructor(private readonly workerService: WorkerService) {}

  @ApiOperation({summary:"Create worker"})
  @ApiResponse({status: 200, description: 'New worker', type: [Worker]})
  @UseGuards(RolesGuard)
  @Roles('ADMIN')
  @Post()
  async createWorker(
    @Body() createWorkerDto: CreateWorkerDto,
    @Res({ passthrough: true }) res: Response
  ) {
    const newWorkerTokens = await this.workerService.createWorker(createWorkerDto, res);
    return newWorkerTokens;
  }

  @ApiOperation({summary:"Get all workers"})
  @ApiResponse({status: 200, description: 'List of workers', type: [Worker]})
  @Get()
  async getAllWorkers():Promise<Worker[]>{
    const workers = await this.workerService.getAllWorkers();
    return workers;
  }

  @ApiOperation({summary:"Get worker by Id"})
  @ApiResponse({status: 200, description: 'Worker by Id', type: [Worker]})
  @Get(':id')
  async getWorkerById(@Param('id') id: string):Promise<Worker>{
    const worker = await this.workerService.getWorkerById(+id);
    return worker;
  }

  @ApiOperation({summary:"Get worker by email"})
  @ApiResponse({status: 200, description: 'Worker by email', type: [Worker]})
  @Post('email')
  async getWorkerByEmail(@Body('email') email:string ):Promise<Worker>{
    const worker = await this.workerService.getWorkerByEmail(email);
    return worker;
  }

  @ApiOperation({summary:"Update worker by Id"})
  @ApiResponse({status: 200, description: 'Updated worker', type: [Worker]})
  @UseGuards(UserSelfGuard)
  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async updateWorkerById(@Param('id') id:string, @Body() updateComanyDto: UpdateWorkerDto):Promise<Worker>{
    const worker = await this.workerService.updateWorkerById(+id, updateComanyDto);
    return worker;
  }

  @ApiOperation({summary:"Delete worker by Id"})
  @ApiResponse({status: 200, description: 'Deleted worker', type: [Worker]})
  @UseGuards(UserSelfGuard)
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async deleteWorkerById(@Param('id') id: string) {
    const worker = await this.workerService.deleteWorkerById(+id);
    return worker;
  }

  @ApiOperation({ summary: "Register worker" })
  @ApiResponse({ status: 200, type: Worker })
  @Post("signup")
  registration(
    @Body() createWorkerDto: CreateWorkerDto,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.workerService.registration(createWorkerDto, res);
  }

  @ApiOperation({ summary: "Login worker" })
  @ApiResponse({ status: 200, type: Worker })
  @UseGuards(WorkerGuard)
  @Post("signin")
  login(
    @Body() loginWorkerDto: LoginWorkerDto,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.workerService.login(loginWorkerDto, res);
  }

  @ApiOperation({ summary: "Logout worker" })
  @ApiResponse({ status: 200, type: Worker })
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard)
  @Post("logout")
  logout(
    @CookieGetter('refresh_token') refreshToken: string,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.workerService.logout(refreshToken, res);
  }

  @ApiOperation({ summary: "Activate worker" })
  @ApiResponse({ status: 200, type: [Worker] })
  @Get('activate/:link')
  activate(@Param('link') link:string) {
    return this.workerService.activate(link);
  }

  @UseGuards(WorkerGuard)
  @Post(':id/refresh')
  refresh(
    @Param('id') id:string,
    @CookieGetter('refresh_token') refreshToken: string,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.workerService.refreshToken(+id, refreshToken, res);
  }

  @ApiOperation({summary:"Add role to worker"})
  @ApiResponse({status: 200, description: 'Updated worker', type: [Worker]})
  @HttpCode(200)
  @UseGuards(RolesGuard)
  @Roles('ADMIN')
  @Post('add_role')
  addRole(@Body() addRoleWorkerDto: AddRoleWorkerDto) {
    return this.workerService.addRole(addRoleWorkerDto);
  }

  @ApiOperation({summary:"Remove role from worker"})
  @ApiResponse({status: 200, description: 'Updated worker', type: [Worker]})
  @HttpCode(200)
  @UseGuards(RolesGuard)
  @Roles('ADMIN')
  @Post('remove_role')
  removeRole(@Body() addRoleWorkerDto: AddRoleWorkerDto) {
    return this.workerService.removeRole(addRoleWorkerDto);
  }
}
