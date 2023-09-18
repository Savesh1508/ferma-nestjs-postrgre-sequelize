import { BelongsTo, BelongsToMany, Column, DataType, HasMany, Model, Table } from "sequelize-typescript";
import { ApiProperty } from "@nestjs/swagger";

interface AnimalMealAttributes{
  animalId:number;
  mealId:number;
  ate:number;
  time:Date
}

@Table({ tableName: 'Animal_meal' })
export class AnimalMeal extends Model<AnimalMeal, AnimalMealAttributes> {
  @ApiProperty({ example: 1, description: 'Unique Id'})
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({example:1, description:"Animal Id"})
  @Column({
    type: DataType.INTEGER,
  })
  animalId: number;

  @ApiProperty({example:1, description:"Meal Id"})
  @Column({
    type: DataType.INTEGER,
  })
  mealId: number;

  @ApiProperty({example:12.3, description:"Animal ate"})
  @Column({
    type: DataType.DECIMAL(8,2),
  })
  ate: number;

  @ApiProperty({example:'2023-09-06', description:"Ate time"})
  @Column({
    type: DataType.DATE,
  })
  time: Date;
}