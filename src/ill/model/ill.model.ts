import { BelongsTo, BelongsToMany, Column, DataType, HasMany, Model, Table } from "sequelize-typescript";
import { ApiProperty } from "@nestjs/swagger";

interface IllAttributes{
  name:string;
  description:string;
  ill_time:Date;
}

@Table({ tableName: 'Ill' })
export class Ill extends Model<Ill, IllAttributes> {
  @ApiProperty({ example: 1, description: 'Unique Id'})
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({example:"someIll", description:"Ill name"})
  @Column({
    type: DataType.STRING(100),
    allowNull: false
  })
  name: string;

  @ApiProperty({example:"somedescription", description:"Ill description"})
  @Column({
    type: DataType.TEXT,
    allowNull: false
  })
  description: string;

  @ApiProperty({example:'2023-12-05', description:"Ill date"})
  @Column({
    type: DataType.DATEONLY,
    allowNull: false
  })
  ill_time: Date;
}