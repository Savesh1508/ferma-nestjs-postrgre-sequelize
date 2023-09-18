import { IsString, IsNotEmpty, IsDate, IsEmail, IsStrongPassword, IsBoolean, IsNumber } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateIllDto {
  @ApiProperty({example:"someIll", description:"Ill name"})
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({example:"somedescription", description:"Ill description"})
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiProperty({example:'2023-12-05', description:"Ill date"})
  @IsDate()
  ill_time: Date;
}
