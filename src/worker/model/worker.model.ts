import { BelongsTo, BelongsToMany, Column, DataType, HasMany, Model, Table } from "sequelize-typescript";
import { Role } from "src/roles/model/role.model";
import { WorkerRoles } from "src/roles/model/worker-roles.model";
import { ApiProperty } from "@nestjs/swagger";

interface WorkerAttributes{
  name:string;
  email:string;
  hashed_password:string;
  phone:string;
  work_typeId:number;
  is_active:boolean;
  salary:number;
  blockId:number;
  hashed_refresh_token:string;
}

@Table({ tableName: 'admin' })
export class Worker extends Model<Worker, WorkerAttributes> {
  @ApiProperty({ example: 1, description: 'Unique Id'})
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({example:"someadmin", description:"Worker nasme"})
  @Column({
    type: DataType.STRING(100),
  })
  name: string;

  @ApiProperty({example:"someemail@gmail.com", description:"Worker email"})
  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true
  })
  email:string;

  @ApiProperty({example:"Uzbek1$0n", description:"Worker password"})
  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  hashed_password: string;

  @ApiProperty({example:"+998900000000", description:"Worker phone"})
  @Column({
    type: DataType.STRING,
  })
  phone:string;

  @ApiProperty({ example: 1, description: 'Worker work type Id'})
  @Column({
    type: DataType.INTEGER,
  })
  work_typeId: number;

  @ApiProperty({example: false, description:"Worker activity"})
  @Column({
    type: DataType.BOOLEAN,
    defaultValue: true
  })
  is_active:boolean;

  @ApiProperty({example: 1234.56, description:"Worker salary"})
  @Column({
    type: DataType.DECIMAL(8,2),
  })
  salary:number;

  @ApiProperty({ example: 1, description: 'Worker block Id'})
  @Column({
    type: DataType.INTEGER,
  })
  blockId: number;

  @ApiProperty({example: false, description:"Hashed refresh token"})
  @Column({
    type: DataType.STRING,
  })
  hashed_refresh_token: string;

  @ApiProperty({example: false, description:"Activation link"})
  @Column({
    type: DataType.STRING,
  })
  activation_link: string;

  @ApiProperty({ example: ['Roles'], description: 'Worker roles'})
  @BelongsToMany(() => Role, () => WorkerRoles)
  roles: Role[];
}