import { IsNumber, IsString, IsNotEmpty } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class AddRoleWorkerDto {
  @ApiProperty({example:1, description:"Worker Id"})
  @IsNumber()
  readonly workerId:number;

  @ApiProperty({example:'ADMIN', description:"Added role"})
  @IsString()
  @IsNotEmpty()
  readonly value:string;
}