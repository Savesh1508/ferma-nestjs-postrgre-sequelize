import { IsString, IsNotEmpty, IsEmail, IsStrongPassword, IsBoolean, IsNumber } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
export class CreateWorkTypeDto {
  @ApiProperty({example:"someWorkType", description:"Work type name"})
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({example:"somedescription", description:"Work type description"})
  @IsNotEmpty()
  @IsString()
  description: string;
}
