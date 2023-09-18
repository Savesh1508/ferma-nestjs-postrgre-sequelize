import { BelongsTo, BelongsToMany, Column, DataType, HasMany, Model, Table } from "sequelize-typescript";
import { ApiProperty } from "@nestjs/swagger";

interface AnimalAttributes{
  name:string;
  age:number;
  weight:number;
  description:string;
  cared_byId:number;
  ill_historyId:number;
  blockId:number;
}

@Table({ tableName: 'Animal' })
export class Animal extends Model<Animal, AnimalAttributes> {
  @ApiProperty({ example: 1, description: 'Unique Id'})
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({example:"someAnimal", description:"Animal name"})
  @Column({
    type: DataType.STRING(100),
    allowNull: false
  })
  name: string;

  @ApiProperty({example:1, description:"Animal age"})
  @Column({
    type: DataType.INTEGER,
  })
  age: number;

  @ApiProperty({example:12.34, description:"Animal weight"})
  @Column({
    type: DataType.DECIMAL(8,2),
  })
  weight: number;

  @ApiProperty({example:"somedescription", description:"Animal description"})
  @Column({
    type: DataType.TEXT,
    allowNull: false
  })
  description: string;

  @ApiProperty({example:1, description:"Worker Id"})
  @Column({
    type: DataType.INTEGER,
  })
  cared_byId: number;

  @ApiProperty({example:1, description:"Illness history Id"})
  @Column({
    type: DataType.INTEGER,
  })
  ill_historyId: number;

  @ApiProperty({example:1, description:"Animal block Id"})
  @Column({
    type: DataType.INTEGER,
  })
  blockId: number;
}