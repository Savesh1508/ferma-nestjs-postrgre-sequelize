import { Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { Role } from "./role.model";
import { ApiProperty } from "@nestjs/swagger";
import { Admin } from "src/admin/model/admin.model";

@Table({ tableName: 'admin_roles', createdAt: false, updatedAt: false })
export class AdminRoles extends Model<AdminRoles> {
  @ApiProperty({ example: 1, description: 'Unique Id'})
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true
  })
  id: number;

  @ApiProperty({ example: 1, description: 'Admin Id'})
  @ForeignKey(() => Admin)
  @Column({ type: DataType.INTEGER })
  adminId: number;

  @ApiProperty({ example: 1, description: 'Role Id'})
  @ForeignKey(() => Role)
  @Column({ type: DataType.INTEGER })
  roleId: number;
}
