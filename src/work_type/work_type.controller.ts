import {
  Controller, Body, Param,
  Post, Get, Put, Delete,
  HttpCode, HttpException,
  UseGuards
} from '@nestjs/common';
import { WorkTypeService } from './work_type.service';
import { CreateWorkTypeDto } from './dto/create-work_type.dto';
import { UpdateWorkTypeDto } from './dto/update-work_type.dto';
import { WorkType } from './model/work_type.model';
import { ApiTags, ApiOperation, ApiResponse } from "@nestjs/swagger";
import { Roles } from '../decorators/roles-auth.decorator';
import { RolesGuard } from '../guards/roles.guard';

@ApiTags('WorkTypes')
@Controller('work_type')
export class WorkTypeController {
  constructor(private readonly workTypeService: WorkTypeService) {}
  @ApiOperation({summary:"Create work type"})
  @ApiResponse({status: 200, description: 'New work type', type: [WorkType]})
  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @Post()
  async createWorkType(@Body() createWorkTypeDto: CreateWorkTypeDto):Promise<WorkType>{
    const workType = await this.workTypeService.createWorkType(createWorkTypeDto);
    return workType;
  }

  @ApiOperation({summary:"Get all work types"})
  @ApiResponse({status: 200, description: 'List of work types', type: [WorkType]})
  @Get()
  async getAllWorkTypes():Promise<WorkType[]>{
    const workTypes = await this.workTypeService.getAllWorkTypes();
    return workTypes;
  }

  @ApiOperation({summary:"Get work type by Id"})
  @ApiResponse({status: 200, description: 'Work type by Id', type: [WorkType]})
  @Get(':id')
  async getWorkTypeById(@Param('id') id: string):Promise<WorkType>{
    const workType = await this.workTypeService.getWorkTypeById(+id);
    return workType;
  }

  @ApiOperation({summary:"Update work type by Id"})
  @ApiResponse({status: 200, description: 'Updated work type', type: [WorkType]})
  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @Put(':id')
  async updateWorkTypeById(@Param('id') id:string, @Body() updateComanyDto: UpdateWorkTypeDto):Promise<WorkType>{
    const workType = await this.workTypeService.updateWorkTypeById(+id, updateComanyDto);
    return workType;
  }

  @ApiOperation({summary:"Delete work type by Id"})
  @ApiResponse({status: 200, description: 'Deleted workType', type: [WorkType]})
  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @Delete(':id')
  async deleteWorkTypeById(@Param('id') id: string) {
    const workType = await this.workTypeService.deleteWorkTypeById(+id);
    return workType;
  }
}
