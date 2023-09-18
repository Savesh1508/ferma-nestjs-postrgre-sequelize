import {
  Controller, Body, Param,
  Post, Get, Put, Delete,
  HttpCode, HttpException,
  UseGuards
} from '@nestjs/common';
import { BlockService } from './block.service';
import { CreateBlockDto } from './dto/create-block.dto';
import { UpdateBlockDto } from './dto/update-block.dto';
import { Block } from './model/block.model';
import { ApiTags, ApiOperation, ApiResponse } from "@nestjs/swagger";
import { Roles } from '../decorators/roles-auth.decorator';
import { RolesGuard } from '../guards/roles.guard';

@ApiTags('Blocks')
@Controller('block')
export class BlockController {
  constructor(private readonly blockService: BlockService) {}
  @ApiOperation({summary:"Create block"})
  @ApiResponse({status: 200, description: 'New block', type: [Block]})
  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @Post()
  async createBlock(@Body() createBlockDto: CreateBlockDto):Promise<Block>{
    const block = await this.blockService.createBlock(createBlockDto);
    return block;
  }

  @ApiOperation({summary:"Get all blocks"})
  @ApiResponse({status: 200, description: 'List of blocks', type: [Block]})
  @Get()
  async getAllBlocks():Promise<Block[]>{
    const blocks = await this.blockService.getAllBlocks();
    return blocks;
  }

  @ApiOperation({summary:"Get block by Id"})
  @ApiResponse({status: 200, description: 'Block by Id', type: [Block]})
  @Get(':id')
  async getBlockById(@Param('id') id: string):Promise<Block>{
    const block = await this.blockService.getBlockById(+id);
    return block;
  }

  @ApiOperation({summary:"Update block by Id"})
  @ApiResponse({status: 200, description: 'Updated block', type: [Block]})
  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @Put(':id')
  async updateBlockById(@Param('id') id:string, @Body() updateComanyDto: UpdateBlockDto):Promise<Block>{
    const block = await this.blockService.updateBlockById(+id, updateComanyDto);
    return block;
  }

  @ApiOperation({summary:"Delete block by Id"})
  @ApiResponse({status: 200, description: 'Deleted block', type: [Block]})
  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @Delete(':id')
  async deleteBlockById(@Param('id') id: string) {
    const block = await this.blockService.deleteBlockById(+id);
    return block;
  }
}
