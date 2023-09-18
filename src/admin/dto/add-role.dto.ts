import { IsNumber, IsString, IsNotEmpty } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class AddRoleAdminDto {
  @ApiProperty({example:1, description:"Admin Id"})
  @IsNumber()
  readonly adminId:number;

  @ApiProperty({example:'ADMIN', description:"Added role"})
  @IsString()
  @IsNotEmpty()
  readonly value:string;
}