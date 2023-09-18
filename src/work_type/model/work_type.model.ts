import { BelongsTo, BelongsToMany, Column, DataType, HasMany, Model, Table } from "sequelize-typescript";
import { ApiProperty } from "@nestjs/swagger";

interface WorkTypeAttributes{
  name:string;
  description:string;
}

@Table({ tableName: 'Work_type' })
export class WorkType extends Model<WorkType, WorkTypeAttributes> {
  @ApiProperty({ example: 1, description: 'Unique Id'})
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({example:"someWorkType", description:"WorkType name"})
  @Column({
    type: DataType.STRING(100),
    allowNull: false,
  })
  name: string;

  @ApiProperty({example:"somedescription", description:"Work type description"})
  @Column({
    type: DataType.TEXT,
  })
  description: string;
}