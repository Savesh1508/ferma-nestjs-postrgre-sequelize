import { Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { Worker } from "src/worker/model/worker.model";
import { Role } from "./role.model";
import { ApiProperty } from "@nestjs/swagger";

@Table({ tableName: 'worker_roles', createdAt: false, updatedAt: false })
export class WorkerRoles extends Model<WorkerRoles> {
  @ApiProperty({ example: 1, description: 'Unique Id'})
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true
  })
  id: number;

  @ApiProperty({ example: 1, description: 'Worker Id'})
  @ForeignKey(() => Worker)
  @Column({ type: DataType.INTEGER })
  workerId: number;

  @ApiProperty({ example: 1, description: 'Role Id'})
  @ForeignKey(() => Role)
  @Column({ type: DataType.INTEGER })
  roleId: number;
}
