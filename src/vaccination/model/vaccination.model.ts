import { BelongsTo, BelongsToMany, Column, DataType, HasMany, Model, Table } from "sequelize-typescript";
import { ApiProperty } from "@nestjs/swagger";

interface VaccinationAttributes{
  name:string;
}

@Table({ tableName: 'Vaccination' })
export class Vaccination extends Model<Vaccination, VaccinationAttributes> {
  @ApiProperty({ example: 1, description: 'Unique Id'})
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({example:"someVaccination", description:"Vaccination name"})
  @Column({
    type: DataType.STRING(100),
    allowNull: false
  })
  name: string;

  @ApiProperty({example:"somedescription", description:"Vaccination description"})
  @Column({
    type: DataType.TEXT,
  })
  description: string;
}