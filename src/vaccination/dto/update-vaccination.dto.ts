import { IsString, IsNotEmpty, IsEmail, IsStrongPassword, IsBoolean, IsNumber } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class UpdateVaccinationDto {
  @ApiProperty({example:"someVaccination", description:"Vaccination name"})
  @IsNotEmpty()
  @IsString()
  name?: string;

  @ApiProperty({example:"somedescription", description:"vaccination description"})
  @IsNotEmpty()
  @IsString()
  description?: string;
}
