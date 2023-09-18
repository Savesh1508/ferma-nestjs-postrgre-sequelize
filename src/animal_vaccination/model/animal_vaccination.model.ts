import { BelongsTo, BelongsToMany, Column, DataType, HasMany, Model, Table } from "sequelize-typescript";
import { ApiProperty } from "@nestjs/swagger";

interface AnimalVaccinationAttributes{
  animalId:number;
  vaccinationId:number;
  dose:number;
  time:Date
}

@Table({ tableName: 'Animal_vaccination' })
export class AnimalVaccination extends Model<AnimalVaccination, AnimalVaccinationAttributes> {
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

  @ApiProperty({example:1, description:"Vaccination Id"})
  @Column({
    type: DataType.INTEGER,
  })
  vaccinationId: number;

  @ApiProperty({example:12.3, description:"Vaccnation dose"})
  @Column({
    type: DataType.DECIMAL(8,2),
  })
  dose: number;

  @ApiProperty({example:'2023-09-06', description:"Vaccination time"})
  @Column({
    type: DataType.DATE,
  })
  time: Date;
}