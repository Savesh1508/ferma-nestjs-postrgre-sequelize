import { BelongsTo, BelongsToMany, Column, DataType, HasMany, Model, Table } from "sequelize-typescript";
import { Role } from "src/roles/model/role.model";
import { AdminRoles } from "src/roles/model/admin-roles.model";
import { ApiProperty } from "@nestjs/swagger";

interface AdminAttributes{
  name:string;
  email:string;
  hashed_password:string;
  is_active:boolean;
  hashed_refresh_token: string;
}

@Table({ tableName: 'admin' })
export class Admin extends Model<Admin, AdminAttributes> {
  @ApiProperty({ example: 1, description: 'Unique Id'})
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({example:"someadmin", description:"Admin name"})
  @Column({
    type: DataType.STRING(100),
  })
  name: string;

  @ApiProperty({example:"someemail@gmail.com", description:"Admin email"})
  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true
  })
  email:string;

  @ApiProperty({example:"Uzbek1$0n", description:"Admin password"})
  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  hashed_password: string;

  @ApiProperty({example: false, description:"Admin activity"})
  @Column({
    type: DataType.BOOLEAN,
    defaultValue: true
  })
  is_active:boolean;

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

  @ApiProperty({ example: ['Roles'], description: 'Admin roles'})
  @BelongsToMany(() => Role, () => AdminRoles)
  roles: Role[];
}