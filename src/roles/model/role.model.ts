import { BelongsToMany, Column, DataType, Model, Table } from "sequelize-typescript";
import { Worker } from "src/worker/model/worker.model";
import { WorkerRoles } from "./worker-roles.model";
import { ApiProperty } from "@nestjs/swagger";
import { AdminRoles } from "./admin-roles.model";
import { Admin } from "../../admin/model/admin.model";

interface RoleCreationAttributes {
  value: string;
  description: string;
}

@Table({ tableName: 'roles' })
export class Role extends Model<Role, RoleCreationAttributes> {
  @ApiProperty({ example: 1, description: 'Unikal ID'})
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true
  })
  id: number;

  @ApiProperty({example:"WORKER", description:"User role"})
  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true
  })
  value: string;
z
  @ApiProperty({example:"WORKER role", description:"Info about role"})
  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  description: string;

  @BelongsToMany(() => Worker, () => WorkerRoles)
  workers: Worker[];

  // @BelongsToMany(() => Admin, () => AdminRoles)
  // admins: Admin[];
}
