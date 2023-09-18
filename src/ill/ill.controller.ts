import {
  Controller, Body, Param,
  Post, Get, Put, Delete,
  HttpCode, HttpException,
  UseGuards
} from '@nestjs/common';
import { IllService } from './ill.service';
import { CreateIllDto } from './dto/create-ill.dto';
import { UpdateIllDto } from './dto/update-ill.dto';
import { Ill } from './model/ill.model';
import { ApiTags, ApiOperation, ApiResponse } from "@nestjs/swagger";
import { Roles } from '../decorators/roles-auth.decorator';
import { RolesGuard } from '../guards/roles.guard';

@ApiTags('Ills')
@Controller('ill')
export class IllController {
  constructor(private readonly illService: IllService) {}
  @ApiOperation({summary:"Create ill"})
  @ApiResponse({status: 200, description: 'New ill', type: [Ill]})
  @Post()
  async createIll(@Body() createIllDto: CreateIllDto):Promise<Ill>{
    const ill = await this.illService.createIll(createIllDto);
    return ill;
  }

  @ApiOperation({summary:"Get all ills"})
  @ApiResponse({status: 200, description: 'List of ills', type: [Ill]})
  @Get()
  async getAllIlls():Promise<Ill[]>{
    const ills = await this.illService.getAllIlls();
    return ills;
  }

  @ApiOperation({summary:"Get ill by Id"})
  @ApiResponse({status: 200, description: 'Ill by Id', type: [Ill]})
  @Get(':id')
  async getIllById(@Param('id') id: string):Promise<Ill>{
    const ill = await this.illService.getIllById(+id);
    return ill;
  }

  @ApiOperation({summary:"Update ill by Id"})
  @ApiResponse({status: 200, description: 'Updated ill', type: [Ill]})
  @Put(':id')
  async updateIllById(@Param('id') id:string, @Body() updateComanyDto: UpdateIllDto):Promise<Ill>{
    const ill = await this.illService.updateIllById(+id, updateComanyDto);
    return ill;
  }

  @ApiOperation({summary:"Delete ill by Id"})
  @ApiResponse({status: 200, description: 'Deleted ill', type: [Ill]})
  @Delete(':id')
  async deleteIllById(@Param('id') id: string) {
    const ill = await this.illService.deleteIllById(+id);
    return ill;
  }
}
