import { IsString, IsNotEmpty, IsEmail, IsStrongPassword, IsBoolean, IsNumber } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateBlockDto {
  @ApiProperty({example:1, description:"Block number"})
  @IsNumber()
  block_number: number;

  @ApiProperty({example:"someBlock", description:"Block name"})
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({example:"somedescription", description:"Block description"})
  @IsNotEmpty()
  @IsString()
  description: string;
}
