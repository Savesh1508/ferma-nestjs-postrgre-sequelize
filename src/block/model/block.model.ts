import { BelongsTo, BelongsToMany, Column, DataType, HasMany, Model, Table } from "sequelize-typescript";
import { ApiProperty } from "@nestjs/swagger";

interface BlockAttributes{
  block_number:number;
  name:string;
  description:string;
}

@Table({ tableName: 'Block' })
export class Block extends Model<Block, BlockAttributes> {
  @ApiProperty({ example: 1, description: 'Unique Id'})
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({example:"someBlock", description:"Block name"})
  @Column({
    type: DataType.INTEGER,
    allowNull: false
  })
  block_number: number;

  @ApiProperty({example:"someBlock", description:"Block name"})
  @Column({
    type: DataType.STRING(100),
  })
  name: string;

  @ApiProperty({example:"somedescription", description:"Block description"})
  @Column({
    type: DataType.TEXT,
  })
  description: string;
}