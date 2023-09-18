import { BelongsTo, BelongsToMany, Column, DataType, HasMany, Model, Table } from "sequelize-typescript";
import { ApiProperty } from "@nestjs/swagger";

interface MealAttributes{
  name:string;
}

@Table({ tableName: 'Meal' })
export class Meal extends Model<Meal, MealAttributes> {
  @ApiProperty({ example: 1, description: 'Unique Id'})
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({example:"someMeal", description:"Meal name"})
  @Column({
    type: DataType.STRING(100),
    allowNull: false
  })
  name: string;
}